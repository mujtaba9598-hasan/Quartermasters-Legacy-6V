'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
}

// Simple regex-based markdown parser
function parseMarkdown(text: string) {
    let parsed = text;
    // Bold
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#C15A2C] hover:underline">$1</a>');
    // Lists (simple bullet points)
    parsed = parsed.replace(/^- (.*)$/gm, '<li>$1</li>');

    // Wrap adjacent list items in <ul>
    parsed = parsed.replace(/(<li>.*<\/li>\s*)+/g, '<ul class="list-disc pl-5 my-2">$&</ul>');

    // Line breaks
    parsed = parsed.replace(/\n/g, '<br />');

    // Clean up empty breaks inside lists
    parsed = parsed.replace(/<\/ul><br \/>/g, '</ul>');

    return parsed;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
    const isUser = role === 'user';

    const parsedContent = useMemo(() => {
        if (isUser) return content; // Don't parse user markdown
        return parseMarkdown(content);
    }, [content, isUser]);

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 text-[0.95rem] leading-relaxed shadow-sm ${isUser
                        ? 'bg-[#C15A2C]/90 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white/5 backdrop-blur-xl border border-white/5 text-slate-200 rounded-2xl rounded-tl-sm'
                    }`}
            >
                {isUser ? (
                    <div className="whitespace-pre-wrap">{content}</div>
                ) : (
                    <div className="relative">
                        <span
                            className="prose prose-invert prose-p:my-1 prose-ul:my-1 max-w-none break-words"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                        {isStreaming && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-1.5 h-4 bg-[#C15A2C] ml-1 align-middle rounded-sm"
                            />
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
