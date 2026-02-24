import React from 'react';
import { getPackageDetails } from '@/lib/pricing/packages';
import { getPriceInCurrency, SupportedCurrency } from '@/lib/pricing/currency';

interface PackageCardProps {
    service: string;
    tier: string;
    currency: SupportedCurrency;
}

export function PackageCard({ service, tier, currency }: PackageCardProps) {
    const pkg = getPackageDetails(service, tier);

    if (!pkg) {
        return (
            <div className="p-6 rounded-2xl bg-white/5 border border-red-500/20 backdrop-blur-xl">
                <p className="text-red-400">Package details not found.</p>
            </div>
        );
    }

    const price = getPriceInCurrency(pkg.basePrice, currency);
    const serviceTitle = service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const tierTitle = tier.charAt(0).toUpperCase() + tier.slice(1);

    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col h-full shadow-2xl relative overflow-hidden">
            {/* Subtle Copper Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C15A2C]/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

            <div className="mb-8 relative z-10">
                <span className="inline-block px-3 py-1 bg-[#C15A2C]/20 text-[#C15A2C] text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                    {serviceTitle}
                </span>
                <h3 className="text-3xl font-light text-white font-heading">{tierTitle} Package</h3>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">{pkg.description}</p>
            </div>

            <div className="mb-8 relative z-10">
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-heading text-white">{price.formatted.total}</span>
                    <span className="text-slate-500 font-medium">{currency}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide">Billed once &bull; {pkg.timeline}</p>
            </div>

            <div className="flex-1 relative z-10">
                <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Included Deliverables</h4>
                <ul className="space-y-3">
                    {pkg.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#C15A2C] mt-1 shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
