'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRenderingTier } from '@/hooks/useRenderingTier';

const Silk = dynamic(() => import('@/components/ui/Silk').then(mod => mod.default), { ssr: false }) as any;

export default function SilkBackground() {
    const tier = useRenderingTier();

    if (tier === 'low') return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
            <Suspense fallback={null}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#002147"
                    noiseIntensity={1.5}
                    rotation={0.1}
                />
            </Suspense>
        </div>
    );
}
