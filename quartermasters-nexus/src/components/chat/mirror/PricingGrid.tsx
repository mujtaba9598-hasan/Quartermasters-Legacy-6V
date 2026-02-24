"use client";

import { motion } from "framer-motion";
import { PRICING_TABLE } from "@/lib/pricing/packages";
import { Check } from "lucide-react";

const TIER_ACCENTS: Record<string, string> = {
    express: "#3B82C4",
    standard: "#C15A2C",
    premium: "#C8872E",
    enterprise: "#A78BFA",
};

interface PricingGridProps {
    service: string;
}

export function PricingGrid({ service }: PricingGridProps) {
    const packages = PRICING_TABLE[service];
    if (!packages) return null;

    const tiers = Object.entries(packages);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-4"
        >
            {/* Header */}
            <div className="mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C15A2C]" />
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Pricing Tiers — {service.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2">
                {tiers.map(([tier, pkg], idx) => {
                    const accent = TIER_ACCENTS[tier] || "#C15A2C";
                    const isPopular = tier === "standard";

                    return (
                        <motion.div
                            key={tier}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.08 }}
                            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors"
                            style={isPopular ? { borderColor: `${accent}40` } : undefined}
                        >
                            {isPopular && (
                                <div
                                    className="absolute -top-2 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                    style={{ backgroundColor: accent, color: "#fff" }}
                                >
                                    Popular
                                </div>
                            )}

                            <p className="text-[10px] uppercase tracking-wider font-semibold mt-1" style={{ color: accent }}>
                                {tier}
                            </p>

                            <p className="text-lg font-bold text-white mt-1" style={{ fontFamily: "var(--font-heading)" }}>
                                ${pkg.basePrice.toLocaleString()}
                            </p>

                            <p className="text-[10px] text-white/40 mt-1">{pkg.timeline}</p>

                            <div className="mt-2 space-y-1">
                                {pkg.deliverables.slice(0, 3).map((d, i) => (
                                    <div key={i} className="flex items-start gap-1.5">
                                        <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: accent }} />
                                        <span className="text-[10px] text-white/60 leading-tight">{d}</span>
                                    </div>
                                ))}
                                {pkg.deliverables.length > 3 && (
                                    <p className="text-[9px] text-white/30 pl-4">+{pkg.deliverables.length - 3} more</p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
