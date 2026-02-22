"use client";

import { Cpu } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface TechRndClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function TechRndClient({ capabilities }: TechRndClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#3B82C4" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Technology & Innovation"
            title="Technology & Innovation."
            subtitle="Innovation Strategy & Technical Operations."
            description="From digital transformation consulting to technical R&D strategy, we architect the operational backbone for technology-driven enterprises."
            accent="var(--sector-tech)"
            glow="rgba(59, 130, 196, 0.15)"
            icon={Cpu}
            metaphor="The Observatory"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="tech"
            visualType="tech"
        />
    );
}
