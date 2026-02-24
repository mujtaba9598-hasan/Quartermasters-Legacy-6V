'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMorphingBackground } from '@/lib/contexts/MorphingBackgroundContext';
import { ThemeRenderer, GlobalThemeStyles } from './BackgroundThemes';

export function MorphingBackground() {
    const { activeTheme } = useMorphingBackground();

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <GlobalThemeStyles />
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTheme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <ThemeRenderer theme={activeTheme} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
