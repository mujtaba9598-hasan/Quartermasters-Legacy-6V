import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createCheckoutSession } from '@/lib/payments/stripe-service';
import { PRICING_TABLE } from '@/lib/pricing/packages';

export async function POST(req: Request) {
    try {
        // 1. Verify Authentication
        const authHeader = req.headers.get('Authorization') || req.headers.get('cookie');

        // We get the session from the client request (since we're hitting this from a client component)
        const { data: { session }, error: authError } = await supabase.auth.getSession();

        // If we're strictly checking Server Context, we map via getSession
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (!user || userError) {
            return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
        }

        const clientId = user.id;
        const clientEmail = user.email;

        // 2. Parse request body
        const body = await req.json();
        const { service, tier, currency = 'usd' } = body;

        if (!service || !tier) {
            return NextResponse.json({ error: 'Missing package service or tier.' }, { status: 400 });
        }

        // 3. Lookup Pricing
        const packageConfig = PRICING_TABLE[service]?.[tier];
        if (!packageConfig) {
            return NextResponse.json({ error: 'Invalid package selection.' }, { status: 400 });
        }

        // Amount needs to be in cents
        const priceAmountCent = packageConfig.basePrice * 100;

        // 4. Setup Redirect URLs
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quartermasters.me';
        const successUrl = `${siteUrl}/portal/projects?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${siteUrl}/portal?checkout=cancelled`;

        // 5. Create Stripe Checkout Session
        const checkoutSession = await createCheckoutSession({
            clientId,
            clientEmail,
            packageService: service,
            packageTier: tier,
            priceAmountCent,
            currency,
            successUrl,
            cancelUrl
        });

        return NextResponse.json({
            sessionId: checkoutSession.id,
            url: checkoutSession.url
        });

    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
