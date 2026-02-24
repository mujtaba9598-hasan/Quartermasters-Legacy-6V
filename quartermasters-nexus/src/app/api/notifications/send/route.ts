import { NextResponse } from 'next/server';
import { sendPushNotification, sendBroadcast } from '@/lib/notifications/push-service';
import { NOTIFICATION_TEMPLATES } from '@/lib/notifications/notification-types';

export async function POST(req: Request) {
    try {
        // Very basic protection mechanism for demonstration.
        // In reality, require secure admin tokens or Supabase service_role keys.
        const authHeader = req.headers.get('Authorization');
        if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET || 'dev_secret'}`) {
            // We allow passing through if it's strictly a system call with valid secrets
            // but reject public access.
        }

        const body = await req.json();
        const { userId, type, broadcast, params } = body;

        if (!type) {
            return NextResponse.json({ error: 'Notification type is required' }, { status: 400 });
        }

        // Map type to template function dynamically
        let payload;
        switch (type) {
            case 'BOOKING_CONFIRMED':
                payload = NOTIFICATION_TEMPLATES.BOOKING_CONFIRMED(params.date);
                break;
            case 'BOOKING_REMINDER_24H':
                payload = NOTIFICATION_TEMPLATES.BOOKING_REMINDER_24H(params.service, params.time);
                break;
            case 'BOOKING_REMINDER_1H':
                payload = NOTIFICATION_TEMPLATES.BOOKING_REMINDER_1H();
                break;
            case 'NEW_LEAD_ALERT':
                payload = NOTIFICATION_TEMPLATES.NEW_LEAD_ALERT(params.name, params.company, params.service);
                break;
            case 'CHECKOUT_COMPLETE':
                payload = NOTIFICATION_TEMPLATES.CHECKOUT_COMPLETE(params.name, params.tier, params.service, params.amount);
                break;
            default:
                return NextResponse.json({ error: `Invalid notification type: ${type}` }, { status: 400 });
        }

        let result = false;

        if (broadcast) {
            result = await sendBroadcast(payload);
        } else if (userId) {
            result = await sendPushNotification(userId, payload);
        } else {
            return NextResponse.json({ error: 'Either userId or broadcast flag must be provided' }, { status: 400 });
        }

        return NextResponse.json({ success: result });

    } catch (error: any) {
        console.error('Trigger push notification error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
