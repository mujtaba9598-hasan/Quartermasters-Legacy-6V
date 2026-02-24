import { NextResponse } from 'next/server';
import { getAggregateAnalytics, analyzeConversation } from '@/lib/analytics/conversation-analytics';

/**
 * GET /api/analytics/conversations — Q conversation analytics.
 *
 * Query params:
 *   ?from=2026-01-01&to=2026-02-28  (date range)
 *   ?id=<conversation_id>           (single conversation analysis)
 *
 * Admin-only: requires ANALYTICS_ADMIN_KEY header.
 */
export async function GET(req: Request) {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.ANALYTICS_ADMIN_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('id');

    // Single conversation analysis
    if (conversationId) {
        const result = await analyzeConversation(conversationId);
        if (!result) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }
        return NextResponse.json(result);
    }

    // Aggregate analytics
    const dateFrom = searchParams.get('from') || undefined;
    const dateTo = searchParams.get('to') || undefined;

    const result = await getAggregateAnalytics(dateFrom, dateTo);
    if (!result) {
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }

    return NextResponse.json(result);
}
