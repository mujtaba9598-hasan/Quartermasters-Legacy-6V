"use client";

import { Briefcase } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { PanoramicEffect } from "@/components/ui/SectorEffects";
import { GridPattern } from "@/components/ui/HexagonalPattern";

interface ManagementClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function ManagementClient({ capabilities }: ManagementClientProps) {
    return (
        <ServicePageLayout
            overline="Strategic Management"
            title="Strategic Management."
            subtitle="Strategic Operations & Organizational Infrastructure."
            description="We architect strategic frameworks and operational systems for organizations navigating complex regulatory, financial, and operational landscapes."
            accent="var(--sector-mgmt)"
            glow="rgba(27, 58, 75, 0.12)"
            icon={Briefcase}
            metaphor="The Helm"
            capabilities={capabilities}
            CardWrapper={PanoramicEffect}
            backgroundPattern={<GridPattern />}
            sectorKey="management"
        />
    );
}
