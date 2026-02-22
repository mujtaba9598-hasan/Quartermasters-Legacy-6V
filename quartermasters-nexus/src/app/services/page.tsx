"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GlassSurface from "@/components/ui/GlassSurface";
import ClickSpark from "@/components/ui/ClickSpark";
import ServiceVisual from "@/components/ui/ServiceVisual";
import { motion } from "framer-motion";

const services = [
    {
        title: "Financial Advisory",
        tagline: "Venture Capital & Structuring",
        visual: "financial" as const,
        href: "/financial-advisory",
        accent: "var(--sector-financial)"
    },
    {
        title: "Management",
        tagline: "Corporate Strategy & Operations",
        visual: "management" as const,
        href: "/management",
        accent: "var(--sector-mgmt)"
    },
    {
        title: "Technology & R&D",
        tagline: "Innovation Infrastructure",
        visual: "tech" as const,
        href: "/tech-rnd",
        accent: "var(--sector-tech)"
    },
    {
        title: "Human Capital",
        tagline: "Organizational Psychology",
        visual: "hr" as const,
        href: "/human-capital",
        accent: "var(--sector-hr)"
    },
    {
        title: "Event Logistics",
        tagline: "High-Stakes Planning",
        visual: "events" as const,
        href: "/event-logistics",
        accent: "var(--sector-events)"
    },
    {
        title: "IT Services",
        tagline: "Custom Software Engineering",
        visual: "it" as const,
        href: "/it-services",
        accent: "var(--sector-it)"
    }
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="flex-1 pt-32 pb-24 min-h-screen relative">

                <div className="text-center z-10 mb-16 px-6">
                    <motion.h1
                        className="heading-1 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Capabilities & Verticals
                    </motion.h1>
                    <motion.p
                        className="text-text-muted max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Explore our specialized divisions engineered to deploy structural change across critical sectors, driving enterprise endurance.
                    </motion.p>
                </div>

                <div className="mx-auto max-w-5xl px-6 relative z-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ClickSpark key={service.title} sparkColor={service.accent} sparkSize={6} sparkRadius={15} sparkCount={8} duration={400}>
                                <GlassSurface width="100%" height={280} borderRadius={16} backgroundOpacity={0.15}>
                                    <Link href={service.href} className="block w-full h-full">
                                        <div
                                            className="flex flex-col items-center justify-between h-full group relative overflow-hidden"
                                            style={{
                                                border: `1px solid ${service.accent}44`,
                                                borderRadius: 'inherit',
                                            }}
                                        >
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                                style={{ background: `radial-gradient(circle at center, ${service.accent}, transparent)` }}
                                            />

                                            {/* Service Visual Section */}
                                            <div className="w-full relative z-10 pt-4 px-4 overflow-hidden">
                                                <ServiceVisual type={service.visual} accent={service.accent} />
                                            </div>

                                            {/* Text Content Section */}
                                            <div className="text-center w-full z-10 pb-6 px-4">
                                                <h3 className="heading-3 mb-2">{service.title}</h3>
                                                <p className="text-sm text-text-muted" style={{ fontFamily: "var(--font-body)" }}>
                                                    {service.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </GlassSurface>
                            </ClickSpark>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
