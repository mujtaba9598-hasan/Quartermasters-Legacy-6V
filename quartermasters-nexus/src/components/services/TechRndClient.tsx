"use client";

import { Cpu } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface TechRndClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function TechRndClient({ capabilities }: TechRndClientProps) {
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
            CardWrapper={GlitchEffect}
            backgroundPattern={<WireframePattern />}
            sectorKey="tech"
        />
    );
}
