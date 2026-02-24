'use client';

import posthog from 'posthog-js';

let initialized = false;

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

/**
 * Initialize PostHog only after analytics consent is granted.
 * Called from PostHogProvider once consent.analytics === true.
 */
export function initPostHog() {
    if (initialized || !POSTHOG_KEY || typeof window === 'undefined') return;

    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
        persistence: 'localStorage+cookie',
        // Respect DNT header
        respect_dnt: true,
        // Mask all text in session recordings for privacy
        session_recording: {
            maskAllInputs: true,
            maskTextSelector: '[data-ph-mask]',
        },
        loaded: (ph) => {
            // In development, enable debug mode
            if (process.env.NODE_ENV === 'development') {
                ph.debug();
            }
        },
    });

    initialized = true;
}

/**
 * Shut down PostHog (e.g., if user revokes consent).
 */
export function shutdownPostHog() {
    if (!initialized) return;
    posthog.opt_out_capturing();
    initialized = false;
}

/**
 * Track a custom event.
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
    if (!initialized) return;
    posthog.capture(eventName, properties);
}

/**
 * Identify a user (e.g., after login).
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>) {
    if (!initialized) return;
    posthog.identify(userId, traits);
}

/**
 * Reset identity (e.g., on logout).
 */
export function resetUser() {
    if (!initialized) return;
    posthog.reset();
}

export { posthog };
