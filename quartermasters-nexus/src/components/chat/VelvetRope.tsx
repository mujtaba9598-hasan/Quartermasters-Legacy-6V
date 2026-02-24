'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import ClickSpark from '@/components/ui/ClickSpark';

export interface VelvetRopeProps {
    service: string;
    standardPrice: number;
    premiumPrice: number;
    discount?: number; // 0-10, percentage applied
    hesitating?: boolean;
    onSelectTier: (tier: 'standard' | 'premium') => void;
    onBookCall: () => void;
}

const features = {
    standard: [
        "Core Implementation",
        "Standard SLA (48hr)",
        "Email Support",
        "Quarterly Review"
    ],
    premium: [
        "Priority Implementation",
        "Priority SLA (12hr)",
        "Direct Slack Channel",
        "Monthly Strategy Review",
        "Dedicated Account Manager"
    ]
};

export function VelvetRope({
    service,
    standardPrice,
    premiumPrice,
    discount = 0,
    hesitating = false,
    onSelectTier,
    onBookCall
}: VelvetRopeProps) {
    const [showNudge, setShowNudge] = useState(false);

    useEffect(() => {
        if (hesitating && discount > 0) {
            // Slight delay before showing the nudge badge for dramatic effect
            const timer = setTimeout(() => setShowNudge(true), 600);
            return () => clearTimeout(timer);
        } else {
            setShowNudge(false);
        }
    }, [hesitating, discount]);

    const calculatePrice = (base: number) => {
        if (!showNudge || discount === 0) return { current: base, original: null };
        const discounted = base * (1 - discount / 100);
        return {
            current: Math.round(discounted),
            original: base
        };
    };

    const standardPrices = calculatePrice(standardPrice);
    const premiumPrices = calculatePrice(premiumPrice);

    return (
        <div className="w-full flex flex-col gap-4 my-2">
            <div className="flex flex-col sm:flex-row gap-4 w-full">

                {/* Standard Tier */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 rounded-2xl p-5 flex flex-col relative overflow-hidden glass"
                    style={{ border: "1px solid var(--glass-border)", background: "var(--glass-bg)" }}
                >
                    <AnimatePresence>
                        {showNudge && (
                            <motion.div
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-0 left-0 right-0 bg-blue-500/20 text-blue-200 text-xs font-bold font-mono text-center py-1"
                            >
                                -{discount}% INCENTIVE APPLIED
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <h4 className="text-lg font-semibold text-white mb-1 tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Standard</h4>
                    <p className="text-sm text-slate-400 mb-4 h-8">{service} — Core Value</p>

                    <div className="mb-6">
                        {standardPrices.original && (
                            <span className="text-sm text-slate-500 line-through block font-mono">
                                ${standardPrices.original.toLocaleString()}
                            </span>
                        )}
                        <span className="text-2xl font-bold text-white font-mono tracking-tighter">
                            ${standardPrices.current.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">/mo</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 mb-6">
                        {features.standard.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                            </div>
                        ))}
                    </div>

                    <ClickSpark sparkColor="#3B82F6">
                        <button
                            onClick={() => onSelectTier('standard')}
                            className="w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 text-white hover:bg-white/10"
                            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            Select Standard
                        </button>
                    </ClickSpark>
                </motion.div>

                {/* Premium Tier */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex-1 rounded-2xl p-5 flex flex-col relative overflow-hidden glass shadow-2xl"
                    style={{
                        border: "1px solid var(--color-gold)",
                        background: "rgba(200, 135, 46, 0.05)",
                        boxShadow: "0 0 40px -10px rgba(200, 135, 46, 0.15)"
                    }}
                >
                    <AnimatePresence>
                        {showNudge && (
                            <motion.div
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-0 left-0 right-0 bg-[#C8872E]/20 text-[#C8872E] text-xs font-bold font-mono text-center py-1"
                            >
                                -{discount}% INCENTIVE APPLIED
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8872E] opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Premium</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#C8872E] bg-[#C8872E]/10 px-2 py-0.5 rounded-full border border-[#C8872E]/20">
                            Recommended
                        </span>
                    </div>
                    <p className="text-sm text-[#C8872E]/70 mb-4 h-8">Full VIP Lifecycle & Priority Routing</p>

                    <div className="mb-6 relative z-10">
                        {premiumPrices.original && (
                            <span className="text-sm text-[#C8872E]/50 line-through block font-mono">
                                ${premiumPrices.original.toLocaleString()}
                            </span>
                        )}
                        <span className="text-2xl font-bold text-white font-mono tracking-tighter">
                            ${premiumPrices.current.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#C8872E]/70 ml-1">/mo</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 mb-6 relative z-10">
                        {features.premium.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-200">
                                <Check className="w-4 h-4 text-[#C8872E] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 mt-auto">
                        <ClickSpark sparkColor="#C8872E">
                            <button
                                onClick={() => onSelectTier('premium')}
                                className="btn-glow-line w-full py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(200,135,46,0.3)] hover:shadow-[0_0_25px_rgba(200,135,46,0.5)]"
                                style={{
                                    background: "var(--color-gold)",
                                    color: "var(--color-white)"
                                }}
                            >
                                Select Premium
                            </button>
                        </ClickSpark>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Book Call CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full flex justify-center mt-2"
            >
                <button
                    onClick={onBookCall}
                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                >
                    Not ready? Book a strategy call with Mujtaba
                </button>
            </motion.div>
        </div>
    );
}
