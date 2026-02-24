import { NextResponse } from 'next/server';
import { getRevenueSummary, getRevenueDashboard } from '@/lib/analytics/revenue-attribution';

/**
 * GET /api/analytics/revenue — Revenue attribution dashboard.
 *
 * Query params:
 *   ?from=2026-01-01&to=2026-02-28&currency=USD  (custom range)
 *   (no params)                                     (last 30 days, USD)
 *
 * Admin-only: requires ANALYTICS_ADMIN_KEY header.
 */
export async function GET(req: Request) {
    const adminKey = req.headers.get('x-admin-key');
    if (!adminKey || adminKey !== process.env.ANALYTICS_ADMIN_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');
    const currency = searchParams.get('currency') || 'USD';

    let result;

    if (dateFrom && dateTo) {
        result = await getRevenueSummary(dateFrom, dateTo, currency);
    } else {
        result = await getRevenueDashboard();
    }

    if (!result) {
        return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 });
    }

    return NextResponse.json(result);
}
