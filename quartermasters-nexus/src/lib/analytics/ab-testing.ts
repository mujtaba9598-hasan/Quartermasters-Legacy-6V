import { ACTIVE_EXPERIMENTS } from './experiments';

export type ABVariant = {
    id: string;
    name: string;
    weight: number; // 0.0 to 1.0 representing traffic slice
};

export type ABExperiment = {
    id: string;
    name: string;
    variants: ABVariant[];
    traffic: number; // 0.0 to 1.0 fraction of overall traffic exposed
};

const VISITOR_COOKIE = 'qm_visitor_id';

/**
 * Simple string hash function (djb2) — works in browser and server.
 * No dependency on Node crypto module.
 */
function hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit int
    }
    return Math.abs(hash);
}

/**
 * Deterministic hash-based bucketing.
 * Returns a consistent float 0.0 to 1.0 for a given visitorId + experimentId.
 */
function getBucket(visitorId: string, experimentId: string): number {
    const hash = hashString(`${visitorId}:${experimentId}`);
    return (hash % 10000) / 10000;
}

/**
 * Gets the deterministic variant for a user for a given experiment.
 * Returns first (control) variant if no consent or experiment not found.
 */
export function getVariant(experimentId: string, visitorId: string, hasConsent: boolean): string {
    const experiment = ACTIVE_EXPERIMENTS.find(e => e.id === experimentId);

    if (!experiment || !hasConsent) {
        return experiment?.variants[0]?.id || 'control';
    }

    const bucket = getBucket(visitorId, experimentId);

    // If user is outside the traffic allocation, give them control
    if (bucket > experiment.traffic) {
        return experiment.variants[0].id;
    }

    // Bucket into variants based on weights
    const normalizedBucket = bucket / experiment.traffic;
    let accumulatedWeight = 0;

    for (const variant of experiment.variants) {
        accumulatedWeight += variant.weight;
        if (normalizedBucket <= accumulatedWeight) {
            return variant.id;
        }
    }

    return experiment.variants[0].id;
}

/**
 * Get or create visitor ID from cookie (browser-only).
 */
export function getOrCreateVisitorId(hasConsent: boolean): string | null {
    if (!hasConsent || typeof document === 'undefined') return null;

    // Read existing cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${VISITOR_COOKIE}=([^;]*)`));
    let visitorId = match ? decodeURIComponent(match[1]) : null;

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        const maxAge = 60 * 60 * 24 * 365; // 1 year
        document.cookie = `${VISITOR_COOKIE}=${visitorId};max-age=${maxAge};path=/;SameSite=Lax;Secure`;
    }

    return visitorId;
}

/**
 * Log an A/B event via the REST API.
 */
export async function trackConversion(experimentId: string, variantId: string, metric: string, visitorId: string) {
    if (!visitorId) return;

    try {
        await fetch('/api/analytics/ab', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ experimentId, variantId, visitorId, metric }),
            keepalive: true,
        });
    } catch (e) {
        console.error('A/B Tracking failed:', e);
    }
}
