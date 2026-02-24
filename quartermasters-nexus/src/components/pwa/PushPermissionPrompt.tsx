'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function PushPermissionPrompt() {
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>('unsupported');
    const [isVisible, setIsVisible] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function init() {
            // Check browser support
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                setPermissionStatus('unsupported');
                return;
            }

            setPermissionStatus(Notification.permission);

            // Try to resolve the current user context
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
                setUserId(session.user.id);
            }

            // Delay visibility slightly so it doesn't pop up instantly on page load
            if (Notification.permission === 'default') {
                const timer = setTimeout(() => setIsVisible(true), 3000);
                return () => clearTimeout(timer);
            }
        }

        init();
    }, []);

    const subscribeUser = async () => {
        setIsVisible(false); // Hide immediately for UX feeling
        try {
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission !== 'granted') return;

            const registration = await navigator.serviceWorker.ready;

            // Note: In a real app, you should fetch the VAPID key dynamically or use env
            const applicationServerKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

            if (!applicationServerKey) {
                console.error('VAPID Configuration missing for push subscriptions.');
                return;
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(applicationServerKey)
            });

            // Dispatch subscription to our REST API
            const response = await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscription,
                    userId // Will be null if anonymous, API handles it or rejects based on rules
                })
            });

            if (!response.ok) {
                console.error('Failed to store push subscription remotely.');
            } else {
                console.log('Push subscription activated successfully.');
            }

        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    };

    if (!isVisible || permissionStatus !== 'default') {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
            >
                <div className="bg-[#002147]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-start gap-4">
                    <div className="bg-[#C15A2C]/20 p-2 rounded-full shrink-0 mt-1">
                        <Bell className="w-5 h-5 text-[#C15A2C]" />
                    </div>

                    <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm mb-1">Enable Intelligence Alerts</h4>
                        <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                            Receive secure, silent device notifications regarding project milestones, scheduled advisories, and urgent directives.
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={subscribeUser}
                                className="bg-[#C15A2C] hover:bg-[#a64a21] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                            >
                                Allow
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-slate-500 hover:text-white text-xs font-medium px-2 py-2 transition-colors"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-slate-500 hover:text-white shrink-0 p-1"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// Utility function to convert VAPID string to Uint8Array safely
function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
