"use client";

import { Monitor } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";

interface ITServicesClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function ITServicesClient({ capabilities }: ITServicesClientProps) {
    // The directive requires CardWrapper to render the capability cards. 
    // We will wrap the generic effect rendering in GlareHover.
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#6366F1" borderRadius="16px" background="transparent" width="100%" height="auto">
            <div className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ border: "1px solid rgba(99,102,241,0.2)" }}>
                {children}
            </div>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="IT Services"
            title="Digital Engineering."
            subtitle="Custom Software & Platforms."
            description="From digital product strategy to complex SaaS architectures, we forge the resilient digital infrastructure required to scale modern enterprises."
            accent="#6366F1"
            glow="rgba(99,102,241,0.15)"
            icon={Monitor}
            metaphor="The Forge"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            sectorKey="it"
        />
    );
}
