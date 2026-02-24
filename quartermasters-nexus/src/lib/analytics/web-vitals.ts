'use client';

import { trackEvent } from './posthog';

/**
 * Core Web Vitals reporter.
 * Uses the web-vitals library to measure LCP, FID, CLS, FCP, TTFB, INP.
 * Reports metrics to PostHog as custom events (consent-gated via PostHog initialization).
 */

interface WebVitalMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    id: string;
    navigationType: string;
}

function sendMetric(metric: WebVitalMetric) {
    trackEvent('web_vital', {
        metric_name: metric.name,
        metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_rating: metric.rating,
        metric_id: metric.id,
        navigation_type: metric.navigationType,
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
    });

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
        const color = metric.rating === 'good' ? '#0cce6b' : metric.rating === 'needs-improvement' ? '#ffa400' : '#ff4e42';
        console.log(
            `%c[Web Vital] ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 4 : 0)} (${metric.rating})`,
            `color: ${color}; font-weight: bold;`
        );
    }
}

/**
 * Initialize Core Web Vitals monitoring.
 * Dynamically imports web-vitals to avoid bundling it on pages that don't need it.
 */
export async function initWebVitals() {
    if (typeof window === 'undefined') return;

    try {
        const { onCLS, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');

        onCLS(sendMetric as Parameters<typeof onCLS>[0]);
        onLCP(sendMetric as Parameters<typeof onLCP>[0]);
        onFCP(sendMetric as Parameters<typeof onFCP>[0]);
        onTTFB(sendMetric as Parameters<typeof onTTFB>[0]);
        onINP(sendMetric as Parameters<typeof onINP>[0]);
    } catch {
        // web-vitals not available — silently skip
    }
}
