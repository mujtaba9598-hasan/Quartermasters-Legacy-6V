"use client";

import { type MirrorBlock } from "./MirrorRegistry";
import { ServiceComparison } from "./ServiceComparison";
import { PricingGrid } from "./PricingGrid";
import { ProcessTimeline } from "./ProcessTimeline";
import { MetricCard } from "./MetricCard";

interface MirrorRendererProps {
    blocks: MirrorBlock[];
}

/**
 * Renders Magic Mirror blocks extracted from Q's response.
 * Each block maps to a live React component rendered inline in the chat.
 */
export function MirrorRenderer({ blocks }: MirrorRendererProps) {
    if (blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block, i) => {
                switch (block.type) {
                    case "service-comparison":
                        return (
                            <ServiceComparison
                                key={`mirror-${i}`}
                                services={block.params.services as string[]}
                            />
                        );
                    case "pricing-grid":
                        return (
                            <PricingGrid
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "process-timeline":
                        return (
                            <ProcessTimeline
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "metric-card":
                        return (
                            <MetricCard
                                key={`mirror-${i}`}
                                metrics={block.params.metrics as { label: string; value: string; suffix?: string }[]}
                            />
                        );
                    case "feature-showcase":
                        // Feature showcase uses PricingGrid with tier filter
                        return (
                            <PricingGrid
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}
