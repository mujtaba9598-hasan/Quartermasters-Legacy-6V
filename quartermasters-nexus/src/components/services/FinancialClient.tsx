"use client";

import { Coins } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { VaultEffect } from "@/components/ui/SectorEffects";
import { HexagonalPattern } from "@/components/ui/HexagonalPattern";

interface FinancialClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function FinancialClient({ capabilities }: FinancialClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#C8872E" borderRadius="16px" background="transparent" width="100%" height="auto">
            <VaultEffect>{children}</VaultEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Financial Advisory"
            title="Financial Advisory."
            subtitle="Strategic Financial Architecture & Regulatory Positioning."
            description="From capital structuring to investment strategy, we architect financial compliance and operational infrastructure for institutional mandates."
            accent="var(--sector-financial)"
            glow="rgba(200, 135, 46, 0.15)"
            icon={Coins}
            metaphor="The Lighthouse"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<HexagonalPattern />}
            sectorKey="financial"
        />
    );
}
