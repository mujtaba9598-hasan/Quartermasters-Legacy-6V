import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// In-memory rate limiting map (IP/Visitor ID -> request timestamps)
// This is a naive implementation for the Edge/Serverless context.
// For true distributed rate limiting, consider relying on Upstash Redis or Vercel KV.
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;
const rateLimitCache = new Map<string, number[]>();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { experimentId, variantId, visitorId, metric, metadata } = body;

        if (!experimentId || !variantId || !visitorId || !metric) {
            return NextResponse.json({ error: 'Missing required A/B event fields' }, { status: 400 });
        }

        // Apply basic rate limiting per visitor to prevent database spam
        const now = Date.now();
        let requests = rateLimitCache.get(visitorId) || [];
        requests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);

        if (requests.length >= MAX_REQUESTS) {
            return NextResponse.json({ error: 'Rate limit exceeded for analytics events' }, { status: 429 });
        }

        requests.push(now);
        rateLimitCache.set(visitorId, requests);

        // Periodically clear massive map caches (garbage collection hedge)
        if (rateLimitCache.size > 10000) rateLimitCache.clear();

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        const { error } = await supabase
            .from('ab_events')
            .insert({
                experiment_id: experimentId,
                variant_id: variantId,
                visitor_id: visitorId,
                metric: metric,
                metadata: metadata || {}
            });

        if (error) {
            console.error('Supabase AB Insert Error:', error);
            // We return 202 Accepted because analytics shouldn't break client paths
            return NextResponse.json({ success: false, note: 'Failed to record event' }, { status: 202 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('A/B API Event error:', error);
        return NextResponse.json({ error: 'Internal server error during analytics ingress' }, { status: 500 });
    }
}

/**
 * Admin utility or authenticated dashboard request to aggregate results.
 */
export async function GET(req: Request) {
    // Only allow secure context (e.g., matching a service secret or verified token)
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET || 'dev_secret'}`) {
        return NextResponse.json({ error: 'Unauthorized to view analytics aggregates' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const experimentId = searchParams.get('experimentId');

        if (!experimentId) {
            return NextResponse.json({ error: 'Experiment ID filter required' }, { status: 400 });
        }

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }
        // Doing a multi-step builder for standard reporting: Total Impressions vs Clicks/Conversions

        const { data: impressions } = await supabase
            .from('ab_events')
            .select('variant_id, visitor_id')
            .eq('experiment_id', experimentId)
            .eq('metric', 'impression');

        const { data: conversions } = await supabase
            .from('ab_events')
            .select('variant_id, visitor_id')
            .eq('experiment_id', experimentId)
            .in('metric', ['click', 'conversion']);

        // Quick Node-side Map/Reduce
        const stats: Record<string, { impressions: number, conversions: number, cvr: number }> = {};

        impressions?.forEach(imp => {
            if (!stats[imp.variant_id]) stats[imp.variant_id] = { impressions: 0, conversions: 0, cvr: 0 };
            stats[imp.variant_id].impressions++;
        });

        conversions?.forEach(conv => {
            if (!stats[conv.variant_id]) stats[conv.variant_id] = { impressions: 0, conversions: 0, cvr: 0 };
            stats[conv.variant_id].conversions++;
        });

        // Calculate Conversion Rates (CVR)
        for (const variant in stats) {
            const v = stats[variant];
            v.cvr = v.impressions > 0 ? (v.conversions / v.impressions) * 100 : 0;
        }

        return NextResponse.json({
            experiment: experimentId,
            stats
        });

    } catch (e: any) {
        return NextResponse.json({ error: 'Failed to aggregate analytics' }, { status: 500 });
    }
}
