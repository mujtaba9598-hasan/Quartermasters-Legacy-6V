"use client";

import { Briefcase } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { PanoramicEffect } from "@/components/ui/SectorEffects";
import { GridPattern } from "@/components/ui/HexagonalPattern";

interface ManagementClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function ManagementClient({ capabilities }: ManagementClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#1B3A4B" borderRadius="16px" background="transparent" width="100%" height="auto">
            <PanoramicEffect>{children}</PanoramicEffect>
        </GlareHover>
    );

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
            CardWrapper={Wrapper}
            backgroundPattern={<GridPattern />}
            sectorKey="management"
            visualType="management"
        />
    );
}
