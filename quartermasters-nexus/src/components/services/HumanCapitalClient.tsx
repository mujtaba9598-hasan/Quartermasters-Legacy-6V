"use client";

import { Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { BreathingEffect } from "@/components/ui/SectorEffects";
import { NetworkPattern } from "@/components/ui/HexagonalPattern";

interface HumanCapitalClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function HumanCapitalClient({ capabilities }: HumanCapitalClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#2A9D8F" borderRadius="16px" background="transparent" width="100%" height="auto">
            <BreathingEffect>{children}</BreathingEffect>
        </GlareHover>
    );

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
            CardWrapper={Wrapper}
            backgroundPattern={<NetworkPattern />}
            sectorKey="hr"
            visualType="hr"
        />
    );
}
