'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

interface ChatInputProps {
    input: string;
    setInput: (v: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isLoading }: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Auto-grow textarea up to 4 lines
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset to auto to shrink if needed
            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = 24 * 4; // Approx 4 lines (assuming 24px line height)
            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow newline
                return;
            } else {
                // Submit form
                e.preventDefault();
                if (input.trim() && !isLoading) {
                    processSubmit(e as any);
                }
            }
        }
    };

    const processSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        onSubmit(e);

        // Trigger peak-end UX
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 800);

        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <form
            onSubmit={processSubmit}
            className="relative flex items-end w-full bg-white/5 border border-white/10 rounded-2xl p-2 transition-all focus-within:border-white/20 focus-within:bg-white/10"
        >
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Quartermasters anything..."
                disabled={isLoading}
                rows={1}
                enterKeyHint="send"
                autoComplete="off"
                className="w-full max-h-[96px] bg-transparent border-none text-slate-200 placeholder:text-slate-500 focus:ring-0 focus:outline-none resize-none px-3 py-2.5 text-base sm:text-base text-[16px] overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`flex-shrink-0 ml-2 h-[48px] w-[48px] sm:h-[44px] sm:w-[44px] flex items-center justify-center rounded-xl transition-all duration-300 ${showSuccess
                        ? 'bg-green-500 text-white'
                        : input.trim() && !isLoading
                            ? 'bg-[#C15A2C] text-white hover:bg-[#A04A24] active:scale-95'
                            : 'bg-white/10 text-slate-400 cursor-not-allowed'
                    }`}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : showSuccess ? (
                    <Check className="w-5 h-5 animate-out zoom-out" strokeWidth={2.5} />
                ) : (
                    <Send className="w-5 h-5 ml-0.5" strokeWidth={2} />
                )}
            </button>
        </form>
    );
}
