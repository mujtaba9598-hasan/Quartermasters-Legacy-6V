"use client";

import { motion } from "framer-motion";
import { PRICING_TABLE, type PackageDetails } from "@/lib/pricing/packages";

const SERVICE_LABELS: Record<string, string> = {
    "financial-advisory": "Financial Advisory",
    "human-capital": "Human Capital",
    "management": "Management Consultancy",
    "tech-rnd": "Technology R&D",
    "event-logistics": "Event Management",
    "it-services": "IT Services",
};

const SERVICE_COLORS: Record<string, string> = {
    "financial-advisory": "#C8872E",
    "human-capital": "#2A9D8F",
    "management": "#1B3A4B",
    "tech-rnd": "#3B82C4",
    "event-logistics": "#D4763C",
    "it-services": "#6366F1",
};

interface ServiceComparisonProps {
    services: string[];
}

export function ServiceComparison({ services }: ServiceComparisonProps) {
    const validServices = services
        .filter((s) => PRICING_TABLE[s])
        .slice(0, 3); // max 3 for readability

    if (validServices.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-4 rounded-xl overflow-hidden border border-white/10"
        >
            {/* Header */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Service Comparison
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-4 py-3 text-left text-xs text-white/40 font-medium uppercase tracking-wider">
                                Tier
                            </th>
                            {validServices.map((s) => (
                                <th
                                    key={s}
                                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: SERVICE_COLORS[s] || "#C15A2C" }}
                                >
                                    {SERVICE_LABELS[s] || s}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {["express", "standard", "premium", "enterprise"].map((tier) => (
                            <tr key={tier} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="px-4 py-3 text-white/70 font-medium capitalize">
                                    {tier}
                                </td>
                                {validServices.map((s) => {
                                    const pkg: PackageDetails | undefined = PRICING_TABLE[s]?.[tier];
                                    return (
                                        <td key={s} className="px-4 py-3 text-center">
                                            {pkg ? (
                                                <span className="text-white font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                                                    ${pkg.basePrice.toLocaleString()}
                                                </span>
                                            ) : (
                                                <span className="text-white/20">—</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Timeline Row */}
            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 flex gap-4">
                {validServices.map((s) => {
                    const expressTimeline = PRICING_TABLE[s]?.express?.timeline || "TBD";
                    return (
                        <div key={s} className="flex-1 text-center">
                            <p className="text-[10px] text-white/30 uppercase tracking-wider">Express Timeline</p>
                            <p className="text-xs text-white/60 mt-0.5">{expressTimeline}</p>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
