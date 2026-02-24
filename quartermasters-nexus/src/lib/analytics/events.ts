import { trackEvent } from './posthog';

/**
 * Predefined analytics events for Quartermasters.
 * All gated behind PostHog initialization (which requires consent).
 */

// ─── Chat / Q Events ──────────────────────────────────────────────
export function trackChatOpened() {
    trackEvent('q_chat_opened');
}

export function trackChatMessageSent(messageLength: number) {
    trackEvent('q_chat_message_sent', { message_length: messageLength });
}

export function trackChatClosed(messageCount: number) {
    trackEvent('q_chat_closed', { message_count: messageCount });
}

// ─── Service Interest ─────────────────────────────────────────────
export function trackServiceViewed(service: string) {
    trackEvent('service_viewed', { service });
}

export function trackServiceCTAClicked(service: string, cta: string) {
    trackEvent('service_cta_clicked', { service, cta });
}

// ─── Pricing / Checkout ───────────────────────────────────────────
export function trackPricingShown(service: string, tier: string, amount: number) {
    trackEvent('pricing_shown', { service, tier, amount });
}

export function trackCheckoutStarted(service: string, tier: string, amount: number) {
    trackEvent('checkout_started', { service, tier, amount });
}

export function trackCheckoutCompleted(service: string, tier: string, amount: number) {
    trackEvent('checkout_completed', { service, tier, amount });
}

export function trackCheckoutAbandoned(service: string, tier: string, step: string) {
    trackEvent('checkout_abandoned', { service, tier, step });
}

// ─── Booking ──────────────────────────────────────────────────────
export function trackBookingStarted(eventType: string) {
    trackEvent('booking_started', { event_type: eventType });
}

export function trackBookingCompleted(eventType: string) {
    trackEvent('booking_completed', { event_type: eventType });
}

// ─── Lead / Qualification ─────────────────────────────────────────
export function trackLeadQualified(service: string, track: 'express' | 'executive') {
    trackEvent('lead_qualified', { service, track });
}

export function trackVelvetRopeShown(service: string) {
    trackEvent('velvet_rope_shown', { service });
}

export function trackVelvetRopeTierSelected(service: string, tier: string) {
    trackEvent('velvet_rope_tier_selected', { service, tier });
}

// ─── Navigation ───────────────────────────────────────────────────
export function trackCTAClicked(label: string, location: string) {
    trackEvent('cta_clicked', { label, location });
}

export function trackExternalLinkClicked(url: string) {
    trackEvent('external_link_clicked', { url });
}
