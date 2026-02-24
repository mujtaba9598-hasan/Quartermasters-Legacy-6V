import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe-service';
import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    if (!STRIPE_WEBHOOK_SECRET) {
        console.error("Missing STRIPE_WEBHOOK_SECRET");
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const payload = await req.text();
    const signature = req.headers.get('Stripe-Signature');

    if (!signature) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleSuccessfulCheckout(session);
                break;
            }
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentSuccess(paymentIntent);
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentFailure(paymentIntent);
                break;
            }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        // Always return 200 to acknowledge receipt of webhook from Stripe
        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error: any) {
        console.error(`Webhook handler failed: ${error.message}`);
        // Still return 200 so Stripe doesn't infinitely retry unless it's a critical DB outage
        return NextResponse.json({ error: "Handler failed internally, logged." }, { status: 200 });
    }
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
    const metadata = session.metadata || {};
    const clientId = metadata.client_id;
    const service = metadata.service;
    const tier = metadata.tier;
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0; // Convert cents to dollars
    const currency = session.currency?.toUpperCase() || 'USD';

    if (!clientId) {
        console.error("Completed checkout session missing client_id metadata", session.id);
        return;
    }

    // 1. Record the Payment
    const { error: paymentError } = await supabase.from('payments').insert({
        client_id: clientId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        amount: amountTotal,
        currency,
        status: 'succeeded',
        service,
        tier,
        metadata: {
            customer_email: session.customer_details?.email,
            customer_name: session.customer_details?.name,
        }
    });

    if (paymentError) {
        console.error("Failed to insert payment record", paymentError);
        throw paymentError;
    }

    // 2. Also log as a CRM Interaction
    await supabase.from('interactions').insert({
        contact_id: clientId, // By convention contact mapping
        type: 'payment',
        summary: `Completed payment of ${amountTotal} ${currency} for ${service} (${tier}) package via portal.`,
        metadata: {
            stripe_session_id: session.id,
            amount: amountTotal,
            currency,
            service,
            tier
        }
    });
}

async function handlePaymentIntentSuccess(intent: Stripe.PaymentIntent) {
    // Update status if it exists, but checkout.session.completed typically handles the primary logic
    console.log(`Payment intent ${intent.id} succeeded`);
}

async function handlePaymentIntentFailure(intent: Stripe.PaymentIntent) {
    console.log(`Payment intent ${intent.id} failed`);

    // Try to find the associated client via customer or metadata
    // We'll log it if possible
    const metadata = intent.metadata || {};
    const clientId = metadata.client_id;

    if (clientId) {
        await supabase.from('payments').insert({
            client_id: clientId,
            stripe_session_id: 'unknown_session_from_intent_failure',
            stripe_payment_intent_id: intent.id,
            amount: intent.amount / 100,
            currency: intent.currency.toUpperCase(),
            status: 'failed',
            metadata: { error: intent.last_payment_error }
        });
    }
}
