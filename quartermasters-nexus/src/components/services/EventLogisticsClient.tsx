"use client";

import { MapPin } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { RippleEffect } from "@/components/ui/SectorEffects";
import { RadarPattern } from "@/components/ui/HexagonalPattern";

interface EventLogisticsClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function EventLogisticsClient({ capabilities }: EventLogisticsClientProps) {
    return (
        <ServicePageLayout
            overline="Events & Experiences"
            title="Events & Experiences."
            subtitle="High-Impact Logistics, Coordination & Experiential Design."
            description="When precision and timing define success, our operational framework ensures every element from venue logistics to stakeholder management is executed with precision."
            accent="var(--sector-events)"
            glow="rgba(212, 118, 60, 0.15)"
            icon={MapPin}
            metaphor="The Compass"
            capabilities={capabilities}
            CardWrapper={RippleEffect}
            backgroundPattern={<RadarPattern />}
            sectorKey="events"
        />
    );
}
