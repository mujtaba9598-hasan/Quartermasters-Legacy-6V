'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useQChat } from '@/hooks/useQChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { VelvetRope } from './VelvetRope';
import { QAvatar2D } from '../avatar/QAvatar2D';
import { QAvatar3D } from '../avatar/QAvatar3D';
import { parseMirrorBlocks, MirrorBlock } from './mirror/MirrorRegistry';
import { MirrorRenderer } from './mirror/MirrorRenderer';
import { SplitScreenLayout } from './SplitScreenLayout';
import { CanvasPanel } from './CanvasPanel';

type PanelState = 'collapsed' | 'expanded' | 'fullscreen';

export function ChatPanel() {
    const [panelState, setPanelState] = useState<PanelState>('collapsed');
    const [splitScreen, setSplitScreen] = useState(false);
    const [latestBlocks, setLatestBlocks] = useState<MirrorBlock[]>([]);
    const { messages, input, setInput, handleSubmit, isLoading, chatState } = useQChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-enter split screen for new Mirror blocks
    useEffect(() => {
        if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.role === 'assistant') {
                const rawContent = lastMsg.parts?.[0]?.text || '';
                const afterVelvet = rawContent.replace('[RENDER_VELVET_ROPE]', '');
                const { blocks } = parseMirrorBlocks(afterVelvet);

                if (blocks.length > 0) {
                    setLatestBlocks(blocks);
                    if (window.innerWidth >= 1024) {
                        setSplitScreen(true);
                        setPanelState('expanded'); // Ensure chat is open
                    }
                }
            }
        }
    }, [messages]);

    // Auto-scroll logic
    const scrollToBottom = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

        if (isNearBottom || messages.length <= 2) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, chatState]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (splitScreen) {
                    setSplitScreen(false);
                } else if (panelState !== 'collapsed') {
                    setPanelState('collapsed');
                }
            }
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                setSplitScreen(prev => !prev);
                if (panelState === 'collapsed') setPanelState('expanded');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [panelState]);

    // Handle body scroll locking
    useEffect(() => {
        if (panelState === 'fullscreen') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [panelState]);

    const toggleFullscreen = () => {
        setPanelState(prev => prev === 'fullscreen' ? 'expanded' : 'fullscreen');
    };

    const isExpanded = panelState === 'expanded';
    const isFullscreen = panelState === 'fullscreen';

    return (
        <>
            {/* Collapsed State: Floating Button */}
            <AnimatePresence>
                {panelState === 'collapsed' && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: [1, 1.05, 1],
                            boxShadow: ['0 0 0px rgba(193,90,44,0)', '0 0 20px rgba(193,90,44,0.3)', '0 0 0px rgba(193,90,44,0)']
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 0.2 }
                        }}
                        onClick={() => setPanelState('expanded')}
                        className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-105 transition-transform"
                        style={{ background: 'transparent' }}
                        aria-label="Open Quartermasters Chat"
                    >
                        <QAvatar2D chatState={chatState} className="w-full h-full" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Expanded / Fullscreen State: Chat Panel */}
            <AnimatePresence>
                {(isExpanded || isFullscreen) && (
                    <SplitScreenLayout
                        isOpen={splitScreen}
                        onClose={() => setSplitScreen(false)}
                        canvasSlot={<CanvasPanel blocks={latestBlocks} />}
                    >
                        <motion.div
                            initial={isFullscreen
                                ? { opacity: 0, scale: 0.95 }
                                : { x: '100%', opacity: 0.5 }
                            }
                            animate={isFullscreen
                                ? { opacity: 1, scale: 1, x: 0 }
                                : { x: 0, opacity: 1, scale: 1 }
                            }
                            exit={isFullscreen
                                ? { opacity: 0, scale: 0.95 }
                                : { x: '100%', opacity: 0.5 }
                            }
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed z-50 flex flex-col bg-slate-950 backdrop-blur-2xl ${isFullscreen && !splitScreen
                                ? 'inset-0 w-full h-full'
                                : splitScreen
                                    ? 'relative w-full h-full border-r border-white/10'
                                    : 'top-0 right-0 h-full w-full sm:w-[400px] border-l border-white/10 shadow-2xl'
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <QAvatar3D chatState={chatState} className="w-12 h-12" />
                                    <div className="flex flex-col">
                                        <h2 className="text-slate-100 font-semibold text-base leading-tight">Q</h2>
                                        <span className="text-[#C15A2C] text-xs font-medium tracking-wide">Senior Strategy Consultant</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
                                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                    >
                                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setPanelState('collapsed')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        aria-label="Close chat"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div
                                ref={scrollContainerRef}
                                className="flex-1 overflow-y-auto p-5 scroll-smooth"
                            >
                                {messages.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-70">
                                        <QAvatar3D chatState="idle" className="w-24 h-24 mb-4" />
                                        <p className="text-slate-300 text-sm max-w-[250px]">
                                            Engage Quartermasters intelligence. Ask about our 6 service verticals, pricing, or methodology.
                                        </p>
                                    </div>
                                )}

                                {messages.map((m: any, index: number) => {
                                    const isLastMessage = index === messages.length - 1;
                                    const isStreaming = isLoading && m.role === 'assistant' && isLastMessage;

                                    const rawContent = m.parts?.[0]?.text || '';

                                    // Parse VelvetRope trigger
                                    const hasPricingTrigger = rawContent.includes('[RENDER_VELVET_ROPE]');
                                    const afterVelvet = rawContent.replace('[RENDER_VELVET_ROPE]', '');

                                    // Parse Magic Mirror blocks
                                    const { cleanedText: displayContent, blocks: mirrorBlocks } =
                                        m.role === 'assistant' ? parseMirrorBlocks(afterVelvet) : { cleanedText: afterVelvet.trim(), blocks: [] };

                                    return (
                                        <React.Fragment key={m.id || index}>
                                            {displayContent && (
                                                <ChatMessage
                                                    role={m.role as 'user' | 'assistant'}
                                                    content={displayContent}
                                                    isStreaming={isStreaming}
                                                />
                                            )}

                                            {/* Magic Mirror — live component previews */}
                                            {mirrorBlocks.length > 0 && m.role === 'assistant' && (
                                                <div className={splitScreen && isLastMessage ? "lg:hidden" : "block"}>
                                                    <MirrorRenderer blocks={mirrorBlocks} />
                                                </div>
                                            )}

                                            {/* VelvetRope — pricing UI */}
                                            {hasPricingTrigger && m.role === 'assistant' && (
                                                <VelvetRope
                                                    service="Quartermasters Retainer"
                                                    standardPrice={5000}
                                                    premiumPrice={12000}
                                                    discount={0}
                                                    hesitating={chatState === 'thinking'}
                                                    onSelectTier={(tier) => {
                                                        setInput(`I want to proceed with the ${tier} tier.`);
                                                        handleSubmit(new Event('submit') as any);
                                                    }}
                                                    onBookCall={() => {
                                                        window.location.href = '/contact';
                                                    }}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}

                                {/* Typing Indicator */}
                                <TypingIndicator visible={chatState === 'thinking'} />

                                <div ref={messagesEndRef} className="h-4" />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-white/10 bg-slate-950 shrink-0">
                                <ChatInput
                                    input={input}
                                    setInput={setInput}
                                    onSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                            </div>
                        </motion.div>
                    </SplitScreenLayout>
                )}
            </AnimatePresence>
        </>
    );
}
