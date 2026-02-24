'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QAvatar3D } from '../avatar/QAvatar3D';
import ClickSpark from '../ui/ClickSpark';

const GREETING = "Welcome to Quartermasters. I'm Q, your senior strategy consultant. How can I help you today?";
const CHAR_DELAY = 25; // ms per character
const TYPING_START = 400; // ms after mount
const CHIP_STAGGER = 120; // ms between each chip

const CHIPS = [
    { label: 'I need a new website', variant: 'it', sparkColor: '#6366F1' },
    { label: 'Website redesign', variant: 'it', sparkColor: '#6366F1' },
    { label: 'Business strategy', variant: 'mgmt', sparkColor: '#1B3A4B' },
    { label: 'Financial advisory', variant: 'financial', sparkColor: '#C8872E' },
    { label: 'Explore pricing', variant: 'copper', sparkColor: '#C15A2C' },
    { label: 'Book a call', variant: 'copper', sparkColor: '#C15A2C' },
] as const;

interface WelcomeScreenProps {
    onSend: (text: string) => void;
}

export function WelcomeScreen({ onSend }: WelcomeScreenProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [typingDone, setTypingDone] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const startTimer = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setDisplayedText(GREETING.slice(0, i));
                if (i >= GREETING.length) {
                    clearInterval(interval);
                    setTypingDone(true);
                }
            }, CHAR_DELAY);
            return () => clearInterval(interval);
        }, TYPING_START);

        return () => clearTimeout(startTimer);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center px-4">
            {/* Avatar scale-in */}
            <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-24 mb-6"
            >
                <QAvatar3D chatState="idle" className="w-full h-full" />
            </motion.div>

            {/* Typewriter greeting */}
            <p className="text-slate-300 text-sm max-w-[280px] min-h-[3.5rem] leading-relaxed">
                {displayedText}
                {!typingDone && (
                    <span className="inline-block w-[2px] h-[14px] bg-[#C15A2C] ml-0.5 align-middle animate-pulse" />
                )}
            </p>

            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-[320px]">
                {CHIPS.map((chip, index) => (
                    <motion.div
                        key={chip.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={typingDone ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: index * (CHIP_STAGGER / 1000),
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <ClickSpark sparkColor={chip.sparkColor} sparkRadius={20} sparkCount={6} duration={350}>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => onSend(chip.label)}
                                className={`pill-tag pill-tag--${chip.variant} cursor-pointer select-none`}
                            >
                                {chip.label}
                            </motion.button>
                        </ClickSpark>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
