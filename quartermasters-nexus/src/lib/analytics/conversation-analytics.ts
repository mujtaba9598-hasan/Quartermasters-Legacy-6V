import { supabase } from '@/lib/supabase';
import { trackEvent } from './posthog';

/**
 * S9-05: Q Conversation Analytics
 *
 * Analyzes Q chat conversations to identify:
 * - Drop-off points (where users stop engaging)
 * - Common objections (pricing, timing, scope)
 * - Close rate (conversations that lead to booking/checkout)
 * - Service interest distribution
 * - Average conversation depth
 */

// ─── Types ────────────────────────────────────────────────────────

export type ConversationOutcome =
    | 'checkout_completed'
    | 'booking_made'
    | 'lead_captured'
    | 'pricing_shown'
    | 'dropped_off'
    | 'still_active';

export type ObjectionCategory =
    | 'price_too_high'
    | 'need_more_time'
    | 'need_approval'
    | 'scope_unclear'
    | 'competitor_comparison'
    | 'no_budget'
    | 'not_right_fit'
    | 'none_detected';

export interface ConversationAnalytics {
    conversationId: string;
    visitorId: string;
    messageCount: number;
    userMessageCount: number;
    assistantMessageCount: number;
    durationSeconds: number;
    serviceIdentified: string | null;
    outcome: ConversationOutcome;
    objections: ObjectionCategory[];
    reachedPricing: boolean;
    reachedVelvetRope: boolean;
    dropoffAfterMessage: number | null;
    qualificationScore: number;
}

export interface AggregateAnalytics {
    totalConversations: number;
    averageMessageCount: number;
    averageDurationSeconds: number;
    closeRate: number;
    bookingRate: number;
    pricingReachRate: number;
    topServices: { service: string; count: number }[];
    topObjections: { objection: string; count: number }[];
    dropoffDistribution: { messageNumber: number; count: number }[];
}

// ─── Objection Detection ──────────────────────────────────────────

const OBJECTION_PATTERNS: Record<ObjectionCategory, RegExp[]> = {
    price_too_high: [
        /too expensive/i, /too much/i, /can't afford/i, /out of.*budget/i,
        /lower price/i, /cheaper/i, /discount/i, /too costly/i,
    ],
    need_more_time: [
        /think about it/i, /need.*time/i, /not ready/i, /come back later/i,
        /get back to you/i, /next quarter/i, /maybe later/i,
    ],
    need_approval: [
        /need.*approval/i, /check with.*boss/i, /team.*decide/i, /board.*approve/i,
        /run it by/i, /stakeholder/i, /decision.*maker/i,
    ],
    scope_unclear: [
        /what.*included/i, /more detail/i, /not sure what/i, /clarify/i,
        /what exactly/i, /scope/i, /deliverables/i,
    ],
    competitor_comparison: [
        /competitor/i, /alternative/i, /other.*firm/i, /compared to/i,
        /mckinsey/i, /deloitte/i, /accenture/i, /how.*different/i,
    ],
    no_budget: [
        /no budget/i, /zero budget/i, /can't spend/i, /funding/i,
        /budget.*approved/i, /financial constraint/i,
    ],
    not_right_fit: [
        /not what.*looking/i, /wrong.*service/i, /don't need/i, /not relevant/i,
        /not a fit/i, /doesn't apply/i,
    ],
    none_detected: [],
};

/**
 * Detect objections from user messages in a conversation.
 */
export function detectObjections(userMessages: string[]): ObjectionCategory[] {
    const detected = new Set<ObjectionCategory>();

    for (const msg of userMessages) {
        for (const [category, patterns] of Object.entries(OBJECTION_PATTERNS)) {
            if (category === 'none_detected') continue;
            for (const pattern of patterns) {
                if (pattern.test(msg)) {
                    detected.add(category as ObjectionCategory);
                    break;
                }
            }
        }
    }

    return detected.size > 0 ? Array.from(detected) : ['none_detected'];
}

// ─── Service Detection ────────────────────────────────────────────

const SERVICE_KEYWORDS: Record<string, RegExp[]> = {
    'financial-advisory': [/financ/i, /banking/i, /invest/i, /regulatory/i, /compliance/i, /audit/i],
    'human-capital': [/hr\b/i, /human.*resource/i, /recruit/i, /hiring/i, /talent/i, /workforce/i],
    'management': [/management/i, /strategy/i, /operational/i, /business.*plan/i, /growth/i],
    'tech-rnd': [/tech/i, /r&d/i, /research/i, /innovation/i, /education/i, /edtech/i],
    'event-logistics': [/event/i, /conference/i, /logistics/i, /venue/i, /planning/i],
    'it-services': [/software/i, /web.*app/i, /develop/i, /coding/i, /website/i, /saas/i],
};

export function detectServiceInterest(messages: string[]): string | null {
    const scores: Record<string, number> = {};

    for (const msg of messages) {
        for (const [service, patterns] of Object.entries(SERVICE_KEYWORDS)) {
            for (const pattern of patterns) {
                if (pattern.test(msg)) {
                    scores[service] = (scores[service] || 0) + 1;
                }
            }
        }
    }

    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return entries.length > 0 ? entries[0][0] : null;
}

// ─── Analyze a Single Conversation ────────────────────────────────

export async function analyzeConversation(conversationId: string): Promise<ConversationAnalytics | null> {
    if (!supabase) return null;

    // Fetch conversation
    const { data: conv, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

    if (convError || !conv) return null;

    // Fetch messages
    const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('role, content, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (msgError || !messages) return null;

    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
    const assistantMessages = messages.filter(m => m.role === 'assistant').map(m => m.content);
    const allContent = assistantMessages.join(' ');

    // Duration
    const firstMsg = messages[0]?.created_at;
    const lastMsg = messages[messages.length - 1]?.created_at;
    const durationSeconds = firstMsg && lastMsg
        ? Math.round((new Date(lastMsg).getTime() - new Date(firstMsg).getTime()) / 1000)
        : 0;

    // Check for pricing / velvet rope in assistant messages
    const reachedPricing = assistantMessages.some(m => /\$[\d,]+/i.test(m));
    const reachedVelvetRope = allContent.includes('[RENDER_VELVET_ROPE]');

    // Check outcome
    const { data: booking } = await supabase
        .from('bookings')
        .select('id')
        .eq('conversation_id', conversationId)
        .limit(1);

    const { data: lead } = await supabase
        .from('leads')
        .select('id')
        .eq('conversation_id', conversationId)
        .limit(1);

    let outcome: ConversationOutcome = 'dropped_off';
    if (booking && booking.length > 0) outcome = 'booking_made';
    else if (lead && lead.length > 0) outcome = 'lead_captured';
    else if (reachedVelvetRope) outcome = 'pricing_shown';
    else if (conv.status === 'active') outcome = 'still_active';

    // Objections
    const objections = detectObjections(userMessages);

    // Service
    const serviceIdentified = detectServiceInterest(userMessages.concat(assistantMessages));

    // Drop-off: last user message number if outcome is dropped_off
    const dropoffAfterMessage = outcome === 'dropped_off' ? userMessages.length : null;

    // Qualification score (simple heuristic)
    let qualificationScore = 0;
    if (messages.length >= 4) qualificationScore += 20;
    if (messages.length >= 8) qualificationScore += 15;
    if (serviceIdentified) qualificationScore += 20;
    if (reachedPricing) qualificationScore += 25;
    if (reachedVelvetRope) qualificationScore += 10;
    if (objections.includes('none_detected')) qualificationScore += 10;

    return {
        conversationId,
        visitorId: conv.visitor_id,
        messageCount: messages.length,
        userMessageCount: userMessages.length,
        assistantMessageCount: assistantMessages.length,
        durationSeconds,
        serviceIdentified,
        outcome,
        objections,
        reachedPricing,
        reachedVelvetRope,
        dropoffAfterMessage,
        qualificationScore: Math.min(qualificationScore, 100),
    };
}

// ─── Track Conversation End (Called from Chat API or on Timeout) ──

export function trackConversationEnd(analytics: ConversationAnalytics) {
    trackEvent('q_conversation_ended', {
        conversation_id: analytics.conversationId,
        message_count: analytics.messageCount,
        duration_seconds: analytics.durationSeconds,
        service_identified: analytics.serviceIdentified,
        outcome: analytics.outcome,
        objections: analytics.objections,
        reached_pricing: analytics.reachedPricing,
        reached_velvet_rope: analytics.reachedVelvetRope,
        dropoff_after_message: analytics.dropoffAfterMessage,
        qualification_score: analytics.qualificationScore,
    });
}

// ─── API: Aggregate Analytics ─────────────────────────────────────

export async function getAggregateAnalytics(
    dateFrom?: string,
    dateTo?: string
): Promise<AggregateAnalytics | null> {
    if (!supabase) return null;

    let query = supabase
        .from('conversations')
        .select('id, visitor_id, status, flow_type, started_at, metadata');

    if (dateFrom) query = query.gte('started_at', dateFrom);
    if (dateTo) query = query.lte('started_at', dateTo);

    const { data: conversations, error } = await query;
    if (error || !conversations) return null;

    // Analyze each conversation
    const analyses: ConversationAnalytics[] = [];
    for (const conv of conversations) {
        const result = await analyzeConversation(conv.id);
        if (result) analyses.push(result);
    }

    if (analyses.length === 0) {
        return {
            totalConversations: 0,
            averageMessageCount: 0,
            averageDurationSeconds: 0,
            closeRate: 0,
            bookingRate: 0,
            pricingReachRate: 0,
            topServices: [],
            topObjections: [],
            dropoffDistribution: [],
        };
    }

    // Aggregate
    const totalConversations = analyses.length;
    const averageMessageCount = Math.round(
        analyses.reduce((sum, a) => sum + a.messageCount, 0) / totalConversations
    );
    const averageDurationSeconds = Math.round(
        analyses.reduce((sum, a) => sum + a.durationSeconds, 0) / totalConversations
    );

    const closes = analyses.filter(a => a.outcome === 'checkout_completed' || a.outcome === 'booking_made').length;
    const bookings = analyses.filter(a => a.outcome === 'booking_made').length;
    const pricingReached = analyses.filter(a => a.reachedPricing).length;

    // Service distribution
    const serviceCounts: Record<string, number> = {};
    for (const a of analyses) {
        if (a.serviceIdentified) {
            serviceCounts[a.serviceIdentified] = (serviceCounts[a.serviceIdentified] || 0) + 1;
        }
    }
    const topServices = Object.entries(serviceCounts)
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count);

    // Objection distribution
    const objectionCounts: Record<string, number> = {};
    for (const a of analyses) {
        for (const obj of a.objections) {
            if (obj !== 'none_detected') {
                objectionCounts[obj] = (objectionCounts[obj] || 0) + 1;
            }
        }
    }
    const topObjections = Object.entries(objectionCounts)
        .map(([objection, count]) => ({ objection, count }))
        .sort((a, b) => b.count - a.count);

    // Drop-off distribution
    const dropoffCounts: Record<number, number> = {};
    for (const a of analyses) {
        if (a.dropoffAfterMessage !== null) {
            dropoffCounts[a.dropoffAfterMessage] = (dropoffCounts[a.dropoffAfterMessage] || 0) + 1;
        }
    }
    const dropoffDistribution = Object.entries(dropoffCounts)
        .map(([messageNumber, count]) => ({ messageNumber: Number(messageNumber), count }))
        .sort((a, b) => a.messageNumber - b.messageNumber);

    return {
        totalConversations,
        averageMessageCount,
        averageDurationSeconds,
        closeRate: totalConversations > 0 ? Math.round((closes / totalConversations) * 100) : 0,
        bookingRate: totalConversations > 0 ? Math.round((bookings / totalConversations) * 100) : 0,
        pricingReachRate: totalConversations > 0 ? Math.round((pricingReached / totalConversations) * 100) : 0,
        topServices,
        topObjections,
        dropoffDistribution,
    };
}
