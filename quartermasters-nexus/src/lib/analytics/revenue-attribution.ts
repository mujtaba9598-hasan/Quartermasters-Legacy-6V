import { supabase } from '@/lib/supabase';
import { trackEvent } from './posthog';

/**
 * S9-06: Revenue Attribution
 *
 * Tracks which service, channel, and Q flow generated each dollar of revenue.
 * Attributes revenue to:
 * - Service vertical (HR, Management, Financial, etc.)
 * - Acquisition channel (Q chat, direct checkout, booking → checkout)
 * - Q conversation flow (express vs executive track)
 * - First-touch vs last-touch attribution
 */

// ─── Types ────────────────────────────────────────────────────────

export type AttributionChannel =
    | 'q_chat_express'      // Q qualified → express self-checkout
    | 'q_chat_executive'    // Q qualified → booking → manual close
    | 'direct_checkout'     // Went straight to checkout page
    | 'booking_only'        // Booked a call (no checkout yet)
    | 'unknown';

export interface RevenueRecord {
    paymentId: string;
    invoiceId: string | null;
    clientId: string;
    service: string;
    tier: string;
    amount: number;
    currency: string;
    channel: AttributionChannel;
    conversationId: string | null;
    createdAt: string;
}

export interface RevenueByService {
    service: string;
    totalRevenue: number;
    transactionCount: number;
    averageTransaction: number;
    currency: string;
}

export interface RevenueByChannel {
    channel: AttributionChannel;
    totalRevenue: number;
    transactionCount: number;
    percentage: number;
}

export interface RevenueByTier {
    tier: string;
    totalRevenue: number;
    transactionCount: number;
}

export interface RevenueSummary {
    totalRevenue: number;
    totalTransactions: number;
    averageTransactionValue: number;
    currency: string;
    byService: RevenueByService[];
    byChannel: RevenueByChannel[];
    byTier: RevenueByTier[];
    period: { from: string; to: string };
}

// ─── Channel Attribution Logic ────────────────────────────────────

/**
 * Determine the attribution channel for a payment.
 * Walks backward from payment → invoice → conversation to find the source.
 */
async function attributeChannel(
    payment: { client_id: string; metadata: Record<string, unknown> | null },
    conversationId: string | null
): Promise<AttributionChannel> {
    if (!supabase) return 'unknown';

    // If there's a linked conversation, check its flow type
    if (conversationId) {
        const { data: conv } = await supabase
            .from('conversations')
            .select('flow_type')
            .eq('id', conversationId)
            .single();

        if (conv?.flow_type === 'express') return 'q_chat_express';
        if (conv?.flow_type === 'executive') return 'q_chat_executive';
        return 'q_chat_express'; // default Q flow
    }

    // Check if there's a booking linked to this client
    const { data: bookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('attendee_email', payment.metadata?.customer_email || '')
        .limit(1);

    if (bookings && bookings.length > 0) return 'booking_only';

    return 'direct_checkout';
}

// ─── Track Revenue Event ──────────────────────────────────────────

/**
 * Called after a successful payment to track revenue attribution.
 */
export function trackRevenueEvent(record: RevenueRecord) {
    trackEvent('revenue_attributed', {
        payment_id: record.paymentId,
        service: record.service,
        tier: record.tier,
        amount: record.amount,
        currency: record.currency,
        channel: record.channel,
        conversation_id: record.conversationId,
    });
}

// ─── Revenue Summary API ──────────────────────────────────────────

/**
 * Build a full revenue attribution summary for a date range.
 * Queries the payments table and enriches with channel attribution.
 */
export async function getRevenueSummary(
    dateFrom: string,
    dateTo: string,
    currency: string = 'USD'
): Promise<RevenueSummary | null> {
    if (!supabase) return null;

    const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('status', 'completed')
        .eq('currency', currency.toLowerCase())
        .gte('created_at', dateFrom)
        .lte('created_at', dateTo)
        .order('created_at', { ascending: true });

    if (error || !payments) return null;

    // Build revenue records with attribution
    const records: RevenueRecord[] = [];
    for (const p of payments) {
        // Find linked conversation via invoice or metadata
        let conversationId: string | null = null;
        if (p.metadata?.conversation_id) {
            conversationId = p.metadata.conversation_id as string;
        }

        const channel = await attributeChannel(p, conversationId);

        records.push({
            paymentId: p.id,
            invoiceId: p.invoice_id,
            clientId: p.client_id,
            service: p.service || 'unknown',
            tier: p.tier || 'unknown',
            amount: p.amount / 100, // cents to dollars
            currency: currency.toUpperCase(),
            channel,
            conversationId,
            createdAt: p.created_at,
        });
    }

    // Aggregate by service
    const serviceMap = new Map<string, { total: number; count: number }>();
    for (const r of records) {
        const existing = serviceMap.get(r.service) || { total: 0, count: 0 };
        existing.total += r.amount;
        existing.count += 1;
        serviceMap.set(r.service, existing);
    }
    const byService: RevenueByService[] = Array.from(serviceMap.entries())
        .map(([service, data]) => ({
            service,
            totalRevenue: Math.round(data.total * 100) / 100,
            transactionCount: data.count,
            averageTransaction: Math.round((data.total / data.count) * 100) / 100,
            currency: currency.toUpperCase(),
        }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Aggregate by channel
    const channelMap = new Map<AttributionChannel, { total: number; count: number }>();
    for (const r of records) {
        const existing = channelMap.get(r.channel) || { total: 0, count: 0 };
        existing.total += r.amount;
        existing.count += 1;
        channelMap.set(r.channel, existing);
    }
    const totalRevenue = records.reduce((sum, r) => sum + r.amount, 0);
    const byChannel: RevenueByChannel[] = Array.from(channelMap.entries())
        .map(([channel, data]) => ({
            channel,
            totalRevenue: Math.round(data.total * 100) / 100,
            transactionCount: data.count,
            percentage: totalRevenue > 0 ? Math.round((data.total / totalRevenue) * 100) : 0,
        }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Aggregate by tier
    const tierMap = new Map<string, { total: number; count: number }>();
    for (const r of records) {
        const existing = tierMap.get(r.tier) || { total: 0, count: 0 };
        existing.total += r.amount;
        existing.count += 1;
        tierMap.set(r.tier, existing);
    }
    const byTier: RevenueByTier[] = Array.from(tierMap.entries())
        .map(([tier, data]) => ({
            tier,
            totalRevenue: Math.round(data.total * 100) / 100,
            transactionCount: data.count,
        }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue);

    return {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalTransactions: records.length,
        averageTransactionValue: records.length > 0
            ? Math.round((totalRevenue / records.length) * 100) / 100
            : 0,
        currency: currency.toUpperCase(),
        byService,
        byChannel,
        byTier,
        period: { from: dateFrom, to: dateTo },
    };
}

// ─── Admin API Route Helper ───────────────────────────────────────

/**
 * Get a quick revenue dashboard snapshot (last 30 days).
 */
export async function getRevenueDashboard(): Promise<RevenueSummary | null> {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return getRevenueSummary(
        thirtyDaysAgo.toISOString(),
        now.toISOString()
    );
}
