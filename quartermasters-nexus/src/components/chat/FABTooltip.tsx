'use client';

import { motion } from 'framer-motion';

interface FABTooltipProps {
    visible: boolean;
}

export function FABTooltip({ visible }: FABTooltipProps) {
    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-8 right-24 z-50 pointer-events-none"
        >
            <div
                className="px-4 py-2.5 rounded-xl text-sm backdrop-blur-xl border border-white/15 shadow-lg"
                style={{
                    background: 'rgba(10, 22, 40, 0.75)',
                }}
            >
                <span className="font-semibold text-[#C15A2C]">Q</span>
                <span className="text-slate-300 ml-1.5">Need help with a project?</span>
            </div>
            {/* Arrow pointing right toward FAB */}
            <div
                className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 border-r border-b border-white/15"
                style={{ background: 'rgba(10, 22, 40, 0.75)' }}
            />
        </motion.div>
    );
}
