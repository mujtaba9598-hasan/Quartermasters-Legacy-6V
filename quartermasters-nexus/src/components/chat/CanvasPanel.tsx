'use client';

import React from 'react';
import { type MirrorBlock } from './mirror/MirrorRegistry';
import { ServiceComparison } from './mirror/ServiceComparison';
import { PricingGrid } from './mirror/PricingGrid';
import { ProcessTimeline } from './mirror/ProcessTimeline';
import { MetricCard } from './mirror/MetricCard';

interface CanvasPanelProps {
    blocks: MirrorBlock[];
}

export function CanvasPanel({ blocks }: CanvasPanelProps) {
    if (!blocks || blocks.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-500">
                Awaiting intelligence module...
            </div>
        );
    }

    // Usually, we display the last block in the split screen if multiple are generated
    const activeBlock = blocks[blocks.length - 1];

    let componentName = "Intelligence Module";
    switch (activeBlock.type) {
        case "service-comparison": componentName = "Service Comparison Matrix"; break;
        case "pricing-grid": componentName = "Pricing Grid & Tiers"; break;
        case "process-timeline": componentName = "Process Timeline Explorer"; break;
        case "metric-card": componentName = "Metric Snapshot"; break;
        case "feature-showcase": componentName = "Feature Showcase Overview"; break;
    }

    return (
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto animation-fade-in">
            {/* Header Status */}
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C15A2C]/20 border border-[#C15A2C]/30 text-[#C15A2C] text-xs font-semibold uppercase tracking-widest rounded-full mb-4 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#C15A2C] animate-pulse" />
                    Live Canvas
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-white font-heading">
                    {componentName}
                </h1>
                <p className="text-slate-400 mt-2">Interactive Quartermasters Data Visualization</p>
            </div>

            {/* Render Contextual Component */}
            <div className="w-full h-full pb-20">
                {activeBlock.type === "service-comparison" && (
                    <ServiceComparison services={activeBlock.params.services as string[]} />
                )}

                {(activeBlock.type === "pricing-grid" || activeBlock.type === "feature-showcase") && (
                    <PricingGrid service={activeBlock.params.service as string} />
                )}

                {activeBlock.type === "process-timeline" && (
                    <ProcessTimeline service={activeBlock.params.service as string} />
                )}

                {activeBlock.type === "metric-card" && (
                    <MetricCard metrics={activeBlock.params.metrics as any} />
                )}
            </div>
        </div>
    );
}
