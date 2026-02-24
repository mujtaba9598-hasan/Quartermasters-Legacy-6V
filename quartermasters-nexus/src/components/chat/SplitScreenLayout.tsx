'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface SplitScreenLayoutProps {
    children: React.ReactNode; // The chat panel content
    canvasSlot: React.ReactNode; // The canvas/mirror content
    onClose: () => void;
    isOpen: boolean;
}

export function SplitScreenLayout({ children, canvasSlot, onClose, isOpen }: SplitScreenLayoutProps) {
    const [leftWidth, setLeftWidth] = useState(35); // Initial percentage for chat (35%)
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint = 1024px
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
        // Only allow dragging on desktop
        if (isMobile) return;
        isDragging.current = true;
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging.current || !containerRef.current || isMobile) return;

            let clientX: number;
            if ('touches' in e) {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }

            const containerRect = containerRef.current.getBoundingClientRect();
            // Calculate new percentage, bounded between 20% and 50% for chat panel
            let newPercent = ((clientX - containerRect.left) / containerRect.width) * 100;
            newPercent = Math.max(20, Math.min(newPercent, 50));
            setLeftWidth(newPercent);
        };

        const onMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = 'default';
        };

        if (isOpen) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onMouseMove);
            document.addEventListener('touchend', onMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        };
    }, [isOpen, isMobile]);

    if (!isOpen) {
        return <>{children}</>;
    }

    if (isMobile) {
        // Mobile layout: Canvas on top, Chat below (stacked) or hide one
        // Per directive: "on mobile (< lg), do NOT enter split mode — keep inline Mirror rendering"
        // If it somehow renders on mobile, just show children
        return <>{children}</>;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-50 flex w-full h-full bg-slate-950/90 backdrop-blur-2xl"
                ref={containerRef}
            >
                {/* Chat Panel Area (Left) */}
                <div
                    className="h-full relative shadow-2xl z-10 bg-slate-950"
                    style={{ width: `${leftWidth}%` }}
                >
                    {children}
                </div>

                {/* Resizable Divider */}
                <div
                    className="w-1.5 h-full bg-white/10 hover:bg-[#C15A2C]/80 cursor-col-resize z-20 transition-colors flex items-center justify-center group"
                    onMouseDown={startDragging}
                    onTouchStart={startDragging}
                >
                    {/* Small visual indicator handle */}
                    <div className="h-10 w-0.5 bg-white/30 group-hover:bg-white rounded-full pointer-events-none" />
                </div>

                {/* Canvas Area (Right) */}
                <div
                    className="h-full relative overflow-y-auto bg-[#0a0f1a] shadow-inner"
                    style={{ width: `calc(${100 - leftWidth}% - 6px)` }}
                >
                    {/* Header bar and Close Button overlay */}
                    <div className="sticky top-0 right-0 z-30 p-4 flex justify-end pointer-events-none">
                        <button
                            onClick={onClose}
                            className="p-3 bg-white/10 hover:bg-[#C15A2C] border border-white/20 hover:border-transparent rounded-xl text-white backdrop-blur-md transition-all pointer-events-auto shadow-xl"
                            aria-label="Close Canvas"
                            title="Return focus to standard chat (Ctrl+Shift+S)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-8 lg:p-12 xl:p-16 h-full w-full">
                        {canvasSlot}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
