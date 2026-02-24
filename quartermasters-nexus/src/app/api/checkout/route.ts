import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe-service';
import { supabase } from '@/lib/supabase';
import { PRICING_TABLE } from '@/lib/pricing/packages';
import { createInvoice } from '@/lib/invoices/invoice-service';
import { getPriceInCurrency, SupportedCurrency } from '@/lib/pricing/currency';
import { calculateSalesTax, isValidUSState } from '@/lib/tax/us-sales-tax';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { service, tier, currency, name, email, company, phone, stateCode } = body;

        if (!service || !tier || !email || !name) {
            return NextResponse.json({ error: 'Missing required configuration or contact fields.' }, { status: 400 });
        }

        const pkg = PRICING_TABLE[service]?.[tier];
        if (!pkg) {
            return NextResponse.json({ error: 'Invalid package selection.' }, { status: 400 });
        }

        // Check if user exists, or create one seamlessly
        let clientId: string | undefined;

        // 1. Check existing Auth User by email
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;

        let targetUser = users.find(u => u.email === email);

        if (targetUser) {
            clientId = targetUser.id;
        } else {
            // Unregistered user -> Auto-provision via Admin API
            const tempPassword = Math.random().toString(36).slice(-12) + "A1!";
            const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
                email,
                password: tempPassword,
                email_confirm: true,
                user_metadata: { full_name: name, company, phone }
            });

            if (createError) throw createError;
            if (!newUser.user) throw new Error("Failed to auto-provision user");

            clientId = newUser.user.id;
        }

        // 2. Resolve tax + final pricing
        let taxRate = 0;
        if (stateCode && isValidUSState(stateCode)) {
            const taxCalc = calculateSalesTax(pkg.basePrice, stateCode);
            taxRate = taxCalc.taxRate;
        }

        const priceConfig = getPriceInCurrency(pkg.basePrice, currency as SupportedCurrency, taxRate);
        const amountCents = Math.round(priceConfig.total * 100);

        // 3. Create Stripe PaymentIntent directly
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountCents,
            currency: currency.toLowerCase(),
            metadata: {
                client_id: clientId,
                service,
                tier,
                customer_email: email,
                customer_name: name,
                tax_rate: String(taxRate),
                state_code: stateCode || '',
            },
            automatic_payment_methods: {
                enabled: true,
            },
            receipt_email: email
        });

        if (!paymentIntent.client_secret) {
            throw new Error("Failed to generate Stripe client secret");
        }

        // 4. Create Draft Invoice
        const { invoice, error: invoiceError } = await createInvoice({
            clientId,
            service,
            tier,
            currency: currency.toUpperCase(),
            taxRate,
            notes: `Self-service checkout for ${name} (${email})${stateCode ? ` — ${stateCode}` : ''}`
        });

        if (invoiceError) {
            console.error("Failed to generate draft invoice:", invoiceError);
            // Non-fatal, proceed with payment intent
        }

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            invoiceId: invoice?.id,
            clientId,
            pricing: {
                subtotal: priceConfig.subtotal,
                taxRate,
                taxAmount: priceConfig.taxAmount,
                total: priceConfig.total,
                currency: currency.toUpperCase(),
                formatted: priceConfig.formatted,
            },
        });

    } catch (error: any) {
        console.error('Checkout API error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
