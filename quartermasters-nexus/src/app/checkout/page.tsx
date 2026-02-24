import { redirect } from 'next/navigation';
import { PRICING_TABLE } from '@/lib/pricing/packages';
import { CheckoutClient } from '@/components/checkout/CheckoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Express Checkout | Quartermasters',
    description: 'Secure, self-service package checkout for Quartermasters consulting services.',
};

interface SearchParams {
    service?: string;
    tier?: string;
}

export default function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
    const { service, tier } = searchParams;

    // Validate parameters
    if (!service || !tier) {
        redirect('/services');
    }

    const pkg = PRICING_TABLE[service]?.[tier];
    if (!pkg) {
        redirect('/services');
    }

    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#0a0f1a] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C15A2C]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <CheckoutClient service={service} tier={tier} />
            </div>
        </main>
    );
}
