import { trackEvent } from './posthog';

/**
 * Conversion Funnel Definitions for Quartermasters.
 *
 * Primary Funnel: Landing → Q Chat → Qualification → Pricing → Close
 * Express Funnel: Landing → Service Page → Checkout → Payment → Success
 * Booking Funnel: Landing → Q Chat → Book Call → Confirmation
 */

// ─── Funnel Stage Definitions ─────────────────────────────────────

export type PrimaryFunnelStage =
    | 'page_landed'
    | 'chat_opened'
    | 'chat_first_message'
    | 'service_identified'
    | 'qualification_started'
    | 'pricing_shown'
    | 'tier_selected'
    | 'checkout_started'
    | 'payment_completed';

export type ExpressFunnelStage =
    | 'page_landed'
    | 'service_page_viewed'
    | 'express_cta_clicked'
    | 'checkout_page_loaded'
    | 'payment_form_started'
    | 'payment_completed';

export type BookingFunnelStage =
    | 'page_landed'
    | 'chat_opened'
    | 'booking_intent_detected'
    | 'booking_page_loaded'
    | 'time_slot_selected'
    | 'booking_confirmed';

// ─── Funnel Tracking Functions ────────────────────────────────────

/**
 * Track a primary sales funnel stage.
 * PostHog will reconstruct the funnel from sequential events per distinct_id.
 */
export function trackPrimaryFunnel(
    stage: PrimaryFunnelStage,
    properties?: {
        service?: string;
        tier?: string;
        amount?: number;
        source?: string;
    }
) {
    trackEvent('funnel_primary', {
        funnel_stage: stage,
        ...properties,
    });
}

/**
 * Track an express self-service checkout funnel stage.
 */
export function trackExpressFunnel(
    stage: ExpressFunnelStage,
    properties?: {
        service?: string;
        package_name?: string;
        amount?: number;
    }
) {
    trackEvent('funnel_express', {
        funnel_stage: stage,
        ...properties,
    });
}

/**
 * Track a booking funnel stage.
 */
export function trackBookingFunnel(
    stage: BookingFunnelStage,
    properties?: {
        event_type?: string;
        service?: string;
    }
) {
    trackEvent('funnel_booking', {
        funnel_stage: stage,
        ...properties,
    });
}

// ─── Drop-off Tracking ───────────────────────────────────────────

/**
 * Track when a user drops off at a specific funnel stage.
 * Called on page unload, chat close, or timeout.
 */
export function trackFunnelDropoff(
    funnelType: 'primary' | 'express' | 'booking',
    lastStage: string,
    properties?: {
        service?: string;
        time_spent_seconds?: number;
        message_count?: number;
    }
) {
    trackEvent('funnel_dropoff', {
        funnel_type: funnelType,
        last_stage: lastStage,
        ...properties,
    });
}

// ─── Session Quality Scoring ─────────────────────────────────────

/**
 * Track session engagement quality for funnel analysis.
 * Called periodically or on session end.
 */
export function trackSessionQuality(metrics: {
    pages_viewed: number;
    chat_messages: number;
    time_on_site_seconds: number;
    services_explored: string[];
    reached_pricing: boolean;
    reached_checkout: boolean;
}) {
    const score =
        (metrics.pages_viewed * 1) +
        (metrics.chat_messages * 3) +
        (Math.min(metrics.time_on_site_seconds / 60, 10) * 2) +
        (metrics.services_explored.length * 2) +
        (metrics.reached_pricing ? 10 : 0) +
        (metrics.reached_checkout ? 20 : 0);

    trackEvent('session_quality', {
        ...metrics,
        quality_score: Math.round(score),
        quality_tier: score >= 30 ? 'hot' : score >= 15 ? 'warm' : 'cold',
    });
}
