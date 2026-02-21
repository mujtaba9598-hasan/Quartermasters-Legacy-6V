'use client';

import { useState, useEffect } from 'react';
import { RenderingTier, detectRenderingTier } from '@/lib/rendering/tier-detect';

export function useRenderingTier(): RenderingTier {
    // Default to 'low' during SSR to prevent hydration mismatches and save immediate load times
    const [tier, setTier] = useState<RenderingTier>('low');

    useEffect(() => {
        // Run detection once mounted on the client
        const detectedTier = detectRenderingTier();
        setTier(detectedTier);
    }, []);

    return tier;
}
