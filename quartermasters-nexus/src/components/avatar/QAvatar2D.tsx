'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QAvatar2DProps {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    className?: string;
}

export function QAvatar2D({ chatState, className = '' }: QAvatar2DProps) {
    const animationVariants: any = useMemo(() => {
        return {
            idle: {
                scale: [1.0, 1.03, 1.0],
                boxShadow: [
                    '0 0 10px rgba(193,90,44,0.1)',
                    '0 0 20px rgba(193,90,44,0.4)',
                    '0 0 10px rgba(193,90,44,0.1)'
                ],
                transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            },
            thinking: {
                scale: [1.0, 1.05, 1.0],
                boxShadow: [
                    '0 0 15px rgba(193,90,44,0.2)',
                    '0 0 30px rgba(193,90,44,0.6)',
                    '0 0 15px rgba(193,90,44,0.2)'
                ],
                transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            },
            speaking: {
                scale: [1.0, 1.06, 1.0],
                boxShadow: [
                    '0 0 10px rgba(193,90,44,0.3)',
                    '0 0 35px rgba(193,90,44,0.8)',
                    '0 0 10px rgba(193,90,44,0.3)'
                ],
                transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
            },
            presenting: {
                scale: 1.1,
                boxShadow: '0 0 40px rgba(193,90,44,0.5)',
                transition: { duration: 0.8, ease: 'easeOut' }
            }
        };
    }, []);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative w-24 h-24">
                {/* Rotating Border for Thinking State */}
                <AnimatePresence>
                    {chatState === 'thinking' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
                            className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 border-[#C15A2C] opacity-80"
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    animate={chatState}
                    variants={animationVariants}
                    className="w-full h-full rounded-full bg-slate-900/50 backdrop-blur-xl border-2 border-[rgba(193,90,44,0.3)] flex items-center justify-center"
                >
                    <span className="font-bold text-4xl text-[#C15A2C]">
                        Q
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
