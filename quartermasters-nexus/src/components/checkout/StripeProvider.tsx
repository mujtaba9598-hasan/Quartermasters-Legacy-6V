'use strict';
'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ReactNode, useState, useEffect } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<Stripe | null>;

export function StripeProvider({ children, clientSecret }: { children: ReactNode, clientSecret?: string }) {
    const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null);

    useEffect(() => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        }
        setStripe(stripePromise);
    }, []);

    if (!stripe) return null;

    if (clientSecret) {
        const options = {
            clientSecret,
            appearance: {
                theme: 'night' as const,
                variables: {
                    colorPrimary: '#C15A2C',
                    colorBackground: '#111827',
                    colorText: '#f8fafc',
                    colorDanger: '#ef4444',
                    fontFamily: 'Inter, system-ui, sans-serif',
                }
            }
        };
        return <Elements stripe={stripe} options={options}>{children}</Elements>;
    }

    return <Elements stripe={stripe}>{children}</Elements>;
}
