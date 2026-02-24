'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useConsent } from '@/hooks/useConsent';
import { initPostHog, shutdownPostHog, posthog } from '@/lib/analytics/posthog';

/**
 * Inner tracker that uses useSearchParams (requires Suspense boundary).
 */
function PostHogTracker({ children }: { children: React.ReactNode }) {
    const { consent, isLoaded } = useConsent();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const prevPathRef = useRef<string>('');

    // Initialize or shutdown based on consent
    useEffect(() => {
        if (!isLoaded) return;

        if (consent.analytics) {
            initPostHog();
        } else {
            shutdownPostHog();
        }
    }, [consent.analytics, isLoaded]);

    // Also listen for the consent-updated event (fired by useConsent.saveConsent)
    useEffect(() => {
        const handler = () => {
            // Re-read consent from cookie to catch accept-all
            initPostHog();
        };
        window.addEventListener('consent-updated', handler);
        return () => window.removeEventListener('consent-updated', handler);
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (!consent.analytics) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        if (url !== prevPathRef.current) {
            posthog.capture('$pageview', { $current_url: url });
            prevPathRef.current = url;
        }
    }, [pathname, searchParams, consent.analytics]);

    return <>{children}</>;
}

/**
 * PostHogProvider — consent-gated analytics wrapper.
 * Wraps the tracker in Suspense to satisfy Next.js useSearchParams requirement.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <PostHogTracker>{children}</PostHogTracker>
        </Suspense>
    );
}
