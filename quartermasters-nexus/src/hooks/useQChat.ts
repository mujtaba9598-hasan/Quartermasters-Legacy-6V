'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useChat } from 'ai/react';

export type ChatState = 'idle' | 'thinking' | 'speaking';

export type UseQChatReturn = {
    messages: ReturnType<typeof useChat>['messages'];
    input: string;
    setInput: ReturnType<typeof useChat>['setInput'];
    handleSubmit: ReturnType<typeof useChat>['handleSubmit'];
    isLoading: boolean;
    error: Error | undefined;
    conversationId: string | null;
    chatState: ChatState;
    hesitating: boolean;
};

export function useQChat(): UseQChatReturn {
    // 1. Visitor ID Management
    const [visitorId, setVisitorId] = useState<string>('');

    useEffect(() => {
        let vId = localStorage.getItem('qm_visitor_id');
        if (!vId) {
            vId = crypto.randomUUID();
            localStorage.setItem('qm_visitor_id', vId);
        }
        setVisitorId(vId);
    }, []);

    // 2. Conversation State
    const [conversationId, setConversationId] = useState<string | null>(null);

    // 3. Hesitation Tracking
    const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
    const [hesitating, setHesitating] = useState<boolean>(false);

    // Update time whenever client finishes mounting
    useEffect(() => {
        setLastInteractionTime(Date.now());
    }, []);

    // 4. useChat Configuration
    const {
        messages,
        input,
        setInput,
        handleSubmit,
        isLoading,
        error
    } = useChat({
        api: '/api/chat',
        body: {
            visitorId,
            conversationId
        },
        onError: (err: any) => {
            console.error('Chat error:', err);
        },
        onResponse: (response: Response) => {
            const returnedConvId = response.headers.get('X-Conversation-Id');
            if (returnedConvId && !conversationId) {
                setConversationId(returnedConvId);
            }
        }
    });

    // 5. Derived Chat State
    const chatState = useMemo<ChatState>(() => {
        if (messages.length === 0 && !isLoading) return 'idle';
        if (isLoading) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.role === 'user') return 'thinking'; // Waiting for Q to respond
            if (lastMessage?.role === 'assistant') return 'speaking'; // Q is streaming
        }
        return 'idle';
    }, [messages, isLoading]);

    // 6. Hook into input changes and form submission to reset hesitation
    const handleSetInput: ReturnType<typeof useChat>['setInput'] = useCallback((value) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        setInput(value);
    }, [setInput]);

    const handleFormSubmit: ReturnType<typeof useChat>['handleSubmit'] = useCallback((e, options) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        handleSubmit(e, options);
    }, [handleSubmit]);

    // 7. Hesitation Timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (chatState === 'idle') {
                const now = Date.now();
                if (now - lastInteractionTime > 30000) {
                    setHesitating(true);
                } else {
                    setHesitating(false);
                }
            } else {
                setHesitating(false);
                setLastInteractionTime(Date.now());
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [chatState, lastInteractionTime]);

    // Reset interaction time when new messages arrive from Q
    useEffect(() => {
        if (!isLoading) {
            setLastInteractionTime(Date.now());
        }
    }, [messages, isLoading]);

    return {
        messages,
        input,
        setInput: handleSetInput,
        handleSubmit: handleFormSubmit,
        isLoading,
        error,
        conversationId,
        chatState,
        hesitating
    };
}


