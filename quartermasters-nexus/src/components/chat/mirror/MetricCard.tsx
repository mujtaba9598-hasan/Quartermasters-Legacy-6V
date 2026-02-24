"use client";

import { motion } from "framer-motion";

interface Metric {
    label: string;
    value: string;
    suffix?: string;
}

interface MetricCardProps {
    metrics: Metric[];
}

export function MetricCard({ metrics }: MetricCardProps) {
    if (!metrics || metrics.length === 0) return null;

    const displayed = metrics.slice(0, 4); // max 4

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-4 grid gap-2"
            style={{
                gridTemplateColumns: `repeat(${Math.min(displayed.length, 2)}, 1fr)`,
            }}
        >
            {displayed.map((m, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-3 text-center"
                >
                    <p
                        className="text-xl font-bold text-[#C15A2C]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {m.value}
                        {m.suffix && <span className="text-sm text-white/40 ml-1">{m.suffix}</span>}
                    </p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
                        {m.label}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
}
