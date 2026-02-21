"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { motion } from "framer-motion";

const services = [
    {
        title: "Financial Advisory",
        tagline: "Venture Capital & Structuring",
        href: "/financial-advisory",
        accent: "var(--sector-financial)"
    },
    {
        title: "Management",
        tagline: "Corporate Strategy & Operations",
        href: "/management",
        accent: "var(--sector-mgmt)"
    },
    {
        title: "Technology & R&D",
        tagline: "Innovation Infrastructure",
        href: "/tech-rnd",
        accent: "var(--sector-tech)"
    },
    {
        title: "Human Capital",
        tagline: "Organizational Psychology",
        href: "/human-capital",
        accent: "var(--sector-hr)"
    },
    {
        title: "Event Logistics",
        tagline: "High-Stakes Planning",
        href: "/event-logistics",
        accent: "var(--sector-events)"
    },
    {
        title: "IT Services",
        tagline: "Custom Software Engineering",
        href: "/it-services",
        accent: "var(--sector-it)"
    }
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main className="flex-1 pt-32 pb-24 min-h-screen relative overflow-hidden">

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

                <div className="mx-auto max-w-xl px-6 relative z-20">
                    <ScrollStack
                        useWindowScroll
                        itemDistance={100}
                        itemScale={0.03}
                        itemStackDistance={30}
                        stackPosition="20%"
                        scaleEndPosition="10%"
                        baseScale={0.85}
                        rotationAmount={1.5}
                        blurAmount={2}
                    >
                        {services.map((service) => (
                            <ScrollStackItem key={service.title}>
                                <Link href={service.href} className="block h-full">
                                    <div
                                        className="flex flex-col items-center justify-center h-full text-center group relative overflow-hidden"
                                        style={{
                                            border: `1px solid ${service.accent}44`,
                                            background: 'rgba(0, 33, 71, 0.4)',
                                            backdropFilter: 'blur(16px)',
                                            borderRadius: 'inherit',
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                            style={{ background: `radial-gradient(circle at center, ${service.accent}, transparent)` }}
                                        />
                                        <h3 className="heading-3 mb-2 relative z-10">{service.title}</h3>
                                        <p className="text-sm text-text-muted relative z-10" style={{ fontFamily: "var(--font-body)" }}>
                                            {service.tagline}
                                        </p>
                                    </div>
                                </Link>
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>

            </main>
            <Footer />
        </>
    );
}
