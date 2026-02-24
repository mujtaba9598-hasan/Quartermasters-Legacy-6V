import { NextResponse } from 'next/server';
import { saveSubscription } from '@/lib/notifications/push-service';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { subscription, userId } = body;

        if (!subscription || !subscription.endpoint || !subscription.keys) {
            return NextResponse.json({ error: 'Invalid subscription object' }, { status: 400 });
        }

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        let targetUserId = userId;

        // If no strict userId passed, try to infer from session
        if (!targetUserId) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                targetUserId = user.id;
            } else {
                return NextResponse.json({ error: 'Unauthorized or missing userId' }, { status: 401 });
            }
        }

        await saveSubscription(targetUserId, subscription);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Push subscription error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
