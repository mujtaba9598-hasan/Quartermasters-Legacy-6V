'use client';

import { useEffect } from 'react';
import { useConsent } from '@/hooks/useConsent';
import { initWebVitals } from '@/lib/analytics/web-vitals';

/**
 * WebVitalsReporter — consent-gated Core Web Vitals monitoring.
 * Only initializes web-vitals collection when analytics consent is granted.
 * Measures: LCP, FID, CLS, FCP, TTFB, INP.
 * Reports to PostHog as 'web_vital' events.
 */
export function WebVitalsReporter() {
    const { consent, isLoaded } = useConsent();

    useEffect(() => {
        if (!isLoaded || !consent.analytics) return;
        initWebVitals();
    }, [consent.analytics, isLoaded]);

    return null;
}
