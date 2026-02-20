"use client";

import { Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { BreathingEffect } from "@/components/ui/SectorEffects";
import { NetworkPattern } from "@/components/ui/HexagonalPattern";

interface HumanCapitalClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function HumanCapitalClient({ capabilities }: HumanCapitalClientProps) {
    return (
        <ServicePageLayout
            overline="Human Capital"
            title="Human Capital."
            subtitle="Workforce Strategy & Organizational Development."
            description="We design end-to-end talent strategies, workforce structuring, and organizational development programs tailored to your growth trajectory."
            accent="var(--sector-hr)"
            glow="rgba(42, 157, 143, 0.15)"
            icon={Users}
            metaphor="The Harbor"
            capabilities={capabilities}
            CardWrapper={BreathingEffect}
            backgroundPattern={<NetworkPattern />}
            sectorKey="hr"
        />
    );
}
