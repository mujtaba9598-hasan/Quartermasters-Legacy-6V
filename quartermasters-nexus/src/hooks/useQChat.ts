import { useState, useEffect, useCallback, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';

export type ChatState = 'idle' | 'thinking' | 'speaking';

export type UseQChatReturn = {
    messages: any[];
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: any, options?: any) => void;
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

    // 4. Custom Input State Management
    const [input, setInput] = useState<string>('');

    // 5. useChat Configuration
    const chatConfig: any = {
        chatId: conversationId || undefined,
        fetch: async (url: any, options: any) => {
            const parsedBody = options?.body ? JSON.parse(options.body as string) : {};
            const response = await fetch('/api/chat', {
                ...options,
                body: JSON.stringify({ ...parsedBody, visitorId, conversationId })
            });
            const returnedConvId = response.headers.get('X-Conversation-Id');
            if (returnedConvId && !conversationId) {
                setConversationId(returnedConvId);
            }
            return response;
        },
        onError: (err: Error) => {
            console.error('Chat error:', err);
        }
    };

    const {
        messages,
        status,
        error,
        handleSubmit: originalHandleSubmit
    } = useChat(chatConfig) as any;

    const isLoading = status === 'submitted' || status === 'streaming';

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

    // 7. Hook into input changes and form submission to reset hesitation
    const handleSetInput: React.Dispatch<React.SetStateAction<string>> = useCallback((value) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        setInput(value);
    }, []);

    const handleFormSubmit: (e: any, options?: any) => void = useCallback((e: any, options?: any) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        if (typeof originalHandleSubmit === 'function') {
            originalHandleSubmit(e, options);
        }
    }, [originalHandleSubmit]);

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


