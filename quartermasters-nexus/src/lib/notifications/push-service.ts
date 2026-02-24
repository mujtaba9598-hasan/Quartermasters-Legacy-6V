import webpush from 'web-push';
import { supabase } from '@/lib/supabase';
import type { NotificationPayload } from './notification-types';

// Initialize web-push with VAPID keys
// These keys should be set in .env:
// NEXT_PUBLIC_VAPID_PUBLIC_KEY
// VAPID_PRIVATE_KEY
// VAPID_SUBJECT (mailto:ceocli@quartermasters.me)

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:hello@quartermasters.me';

if (vapidPublicKey && vapidPrivateKey) {
    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
} else {
    console.warn('VAPID keys missing. Web push notifications will fail.');
}

export type PushSubscriptionType = {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
};

/**
 * Saves a browser PushSubscription to the Supabase database.
 */
export async function saveSubscription(userId: string, subscription: PushSubscriptionType) {
    const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
            user_id: userId,
            endpoint: subscription.endpoint,
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'endpoint' // Prevents duplicate identical subscriptions
        });

    if (error) {
        console.error('Error saving push subscription:', error);
        throw error;
    }
    return true;
}

/**
 * Sends a push notification to a specific user by looking up their active subscriptions.
 */
export async function sendPushNotification(userId: string, payload: NotificationPayload) {
    if (!vapidPublicKey || !vapidPrivateKey) return false;

    // 1. Fetch user subscriptions from DB
    const { data: subs, error } = await supabase
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', userId);

    if (error || !subs || subs.length === 0) {
        return false;
    }

    const stringPayload = JSON.stringify(payload);

    // 2. Dispatch to all devices for this user
    const sendPromises = subs.map(async (sub) => {
        const pushConfig = {
            endpoint: sub.endpoint,
            keys: {
                auth: sub.auth,
                p256dh: sub.p256dh
            }
        };

        try {
            await webpush.sendNotification(pushConfig, stringPayload);
        } catch (err: any) {
            // Unsubscribed or expired endpoints return 404 or 410 -> Delete from DB
            if (err.statusCode === 404 || err.statusCode === 410) {
                console.log(`Push subscription expired for user ${userId}. Cleaning up.`);
                await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
            } else {
                console.error(`Error sending push notification to user ${userId}:`, err);
            }
        }
    });

    await Promise.all(sendPromises);
    return true;
}

/**
 * Sends a push notification to ALL stored subscriptions. Used primarily for Admin alerts.
 */
export async function sendBroadcast(payload: NotificationPayload) {
    if (!vapidPublicKey || !vapidPrivateKey) return false;

    // Retrieve ALL subscriptions (In production, filter by admin user IDs only)
    // For Quartermasters, since the CRM is limited to specific clients, we'll
    // assume broadcasts are targeted to the founder/CEO admin account. We map that here.

    const { data: admins } = await supabase
        .from('profiles') // Assuming a profiles view/table tracks roles
        .select('id')
        .eq('role', 'admin');

    if (!admins || admins.length === 0) return false;

    const adminIds = admins.map(a => a.id);

    const { data: subs } = await supabase
        .from('push_subscriptions')
        .select('*')
        .in('user_id', adminIds);

    if (!subs || subs.length === 0) return false;

    const stringPayload = JSON.stringify(payload);

    const sendPromises = subs.map(async (sub) => {
        const pushConfig = {
            endpoint: sub.endpoint,
            keys: { auth: sub.auth, p256dh: sub.p256dh }
        };
        try {
            await webpush.sendNotification(pushConfig, stringPayload);
        } catch (err: any) {
            if (err.statusCode === 404 || err.statusCode === 410) {
                await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
            }
        }
    });

    await Promise.all(sendPromises);
    return true;
}
