import Stripe from 'stripe';

// Lazy init: avoids crash during static export build when env vars are absent
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
        appInfo: {
            name: 'Quartermasters Nexus',
            version: '0.1.0'
        }
    })
    : (null as unknown as Stripe);

interface CheckoutParams {
    clientId: string;
    clientEmail?: string;
    packageService: string;
    packageTier: string;
    priceAmountCent: number;
    currency?: string;
    successUrl: string;
    cancelUrl: string;
}

export async function createCheckoutSession(params: CheckoutParams) {
    const {
        clientId,
        clientEmail,
        packageService,
        packageTier,
        priceAmountCent,
        currency = 'usd',
        successUrl,
        cancelUrl
    } = params;

    // Search for existing Stripe customer by email to avoid duplicates
    let customerId: string | undefined;

    if (clientEmail) {
        const existingCustomers = await stripe.customers.list({ email: clientEmail, limit: 1 });
        if (existingCustomers.data.length > 0) {
            customerId = existingCustomers.data[0].id;
        } else {
            // Create new customer
            const newCustomer = await stripe.customers.create({
                email: clientEmail,
                metadata: { client_id: clientId }
            });
            customerId = newCustomer.id;
        }
    }

    // Define line items
    const title = `${packageService} - ${packageTier}`;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customerId,
        client_reference_id: clientId,
        line_items: [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: title,
                        description: `Quartermasters Retainer Service: ${packageService}`,
                    },
                    unit_amount: priceAmountCent,
                },
                quantity: 1,
            },
        ],
        metadata: {
            client_id: clientId,
            service: packageService,
            tier: packageTier,
        },
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return session;
}

export async function getPaymentStatus(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
        status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
    };
}

export async function createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
    const customer = await stripe.customers.create({
        email,
        name,
        metadata
    });
    return customer;
}

export async function listPayments(clientId: string, limit: number = 10) {
    // Try to find customer ID from client ID metadata
    const customers = await stripe.customers.search({
        query: `metadata['client_id']:'${clientId}'`,
        limit: 1
    });

    if (customers.data.length === 0) {
        return [];
    }

    const customerId = customers.data[0].id;

    const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId,
        limit
    });

    return paymentIntents.data;
}
