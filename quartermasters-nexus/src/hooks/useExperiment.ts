'use client';

import { useState, useEffect, useCallback } from 'react';
import { getVariant, getOrCreateVisitorId } from '@/lib/analytics/ab-testing';
import { useConsent } from '@/hooks/useConsent';

interface UseExperimentResult {
    variant: string;
    track: (metric: 'impression' | 'click' | 'conversion' | 'bounce') => void;
    isLoading: boolean;
}

/**
 * Client-side React hook for A/B experiments.
 * Deterministic variant assignment, consent-aware, memoized per session.
 */
export function useExperiment(experimentId: string): UseExperimentResult {
    const [variant, setVariant] = useState<string>('control');
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { consent } = useConsent();
    const hasAnalyticsConsent = consent.analytics;

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const vId = getOrCreateVisitorId(hasAnalyticsConsent);
        setVisitorId(vId || null);

        if (vId) {
            const assignedVariant = getVariant(experimentId, vId, hasAnalyticsConsent);
            setVariant(assignedVariant);
        }

        setIsLoading(false);
    }, [experimentId, hasAnalyticsConsent]);

    const track = useCallback((metric: 'impression' | 'click' | 'conversion' | 'bounce') => {
        if (!visitorId || !hasAnalyticsConsent) return;

        fetch('/api/analytics/ab', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                experimentId,
                variantId: variant,
                visitorId,
                metric,
            }),
            keepalive: true,
        }).catch(err => {
            console.warn(`A/B event logging dropped for [${experimentId}]:`, err);
        });
    }, [experimentId, variant, visitorId, hasAnalyticsConsent]);

    return { variant, track, isLoading };
}
