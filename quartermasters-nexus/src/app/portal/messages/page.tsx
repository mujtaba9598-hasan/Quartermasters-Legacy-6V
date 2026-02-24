"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Message {
    id: string;
    client_id: string;
    project_id: string | null;
    sender_role: "client" | "team";
    sender_name: string;
    content: string;
    read_at: string | null;
    created_at: string;
}

function MessagesContent() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        if (!user) return;
        const res = await fetch(`/api/messages?clientId=${user.id}`);
        const data = await res.json();
        setMessages(data.messages || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, [user]);

    // Supabase Realtime subscription
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel(`messages:${user.id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "client_messages",
                    filter: `client_id=eq.${user.id}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user || sending) return;

        setSending(true);
        const userName = user.user_metadata?.full_name || user.email || "Client";

        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: user.id,
                senderRole: "client",
                senderName: userName,
                content: input.trim(),
            }),
        });

        setInput("");
        setSending(false);
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        const now = new Date();
        const isToday = d.toDateString() === now.toDateString();

        if (isToday) {
            return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        }
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Header */}
            <div className="pb-4 border-b border-white/10">
                <h1 className="text-2xl font-bold text-white">Messages</h1>
                <p className="text-white/50 text-sm mt-1">Chat with the Quartermasters team</p>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-thin">
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-white/40 text-lg">No messages yet</p>
                        <p className="text-white/25 text-sm mt-2">Send a message to start the conversation</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isClient = msg.sender_role === "client";
                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                        isClient
                                            ? "bg-[#C15A2C] text-white rounded-br-md"
                                            : "backdrop-blur-xl bg-white/5 border border-white/10 text-white rounded-bl-md"
                                    }`}
                                >
                                    {!isClient && (
                                        <p className="text-[#C15A2C] text-xs font-semibold mb-1">{msg.sender_name}</p>
                                    )}
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                    <p
                                        className={`text-xs mt-1.5 ${
                                            isClient ? "text-white/60" : "text-white/30"
                                        }`}
                                    >
                                        {formatTime(msg.created_at)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="pt-4 border-t border-white/10">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#C15A2C] transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || sending}
                        className="px-6 py-3 bg-[#C15A2C] hover:bg-[#C15A2C]/90 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? "..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <ProtectedRoute>
            <MessagesContent />
        </ProtectedRoute>
    );
}
