'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingIndicatorProps {
    visible: boolean;
}

const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 }
    }
};

const dotVariants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
        scale: [1, 1.4, 1],
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    }
};

export function TypingIndicator({ visible }: TypingIndicatorProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex justify-start mb-4"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 w-fit flex items-center gap-1.5 shadow-sm">
                        <motion.div
                            variants={dotVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0 }}
                            className="w-2 h-2 rounded-full bg-slate-400"
                        />
                        <motion.div
                            variants={dotVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.15 }} // 0.15s stagger
                            className="w-2 h-2 rounded-full bg-slate-400"
                        />
                        <motion.div
                            variants={dotVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.3 }} // 0.3s stagger
                            className="w-2 h-2 rounded-full bg-slate-400"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
