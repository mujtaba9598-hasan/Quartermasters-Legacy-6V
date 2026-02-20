import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhaseGate } from "@/components/home/PhaseGate";
import { GlobeSection } from "@/components/home/GlobeSection";
import { SearchBar } from "@/components/home/SearchBar";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { FlowConnector } from "@/components/home/FlowConnector";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title:
    "[BRAND] — Strategic Consulting & Advisory",
  description:
    "Premium consulting across Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management. California-based, globally minded.",
  keywords: [
    "strategic consulting",
    "financial advisory",
    "human capital consulting",
    "technology consulting",
    "event management consulting",
    "management consulting",
    "business advisory",
    "California consulting firm",
    "premium consulting",
  ],
  authors: [{ name: "[BRAND]" }],
  openGraph: {
    title: "[BRAND] — Strategic Consulting & Advisory",
    description:
      "Premium consulting across five integrated verticals. California-based, globally minded.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Homepage — Server Component.
 *
 * Static text renders on server for SEO. Interactive behaviour
 * (animations, smooth scroll, 3D globe) hydrates via client islands.
 */
export default function HomePage() {
  return (
    <HomePageClient>
      <Header />
      <main>
        {/* SEO-critical static content — sr-only for crawlers */}
        <section className="sr-only" aria-label="Company overview">
          <h1>
            [BRAND] — Strategic Consulting & Advisory
          </h1>
          <p>
            Premium consulting firm delivering integrated advisory across
            Financial Advisory, Human Capital, Technology & Innovation,
            Events & Experiences, and Strategic Management.
          </p>
          <h2>Our Five Service Verticals</h2>
          <ul>
            <li>
              Financial Advisory — Strategic advisory on financial planning,
              capital structuring, and investment strategy.
            </li>
            <li>
              Human Capital — Talent acquisition, workforce strategy,
              and organizational development.
            </li>
            <li>
              Technology & Innovation — Digital transformation, technology
              strategy, and R&D advisory.
            </li>
            <li>
              Events & Experiences — High-impact event strategy, logistics,
              and experiential design.
            </li>
            <li>
              Strategic Management — Organizational design, governance
              frameworks, and executive decision-making.
            </li>
          </ul>
          <h2>Our Approach</h2>
          <ol>
            <li>Discovery — Initial assessment and scope definition.</li>
            <li>Strategy — Research-driven planning and roadmapping.</li>
            <li>Execution — Operational deployment with progress tracking.</li>
            <li>Review — Post-engagement assessment and optimization.</li>
          </ol>
          <p>
            California, United States. Serving clients globally.
          </p>
        </section>

        {/* Visual sections — client islands with animations */}
        <HeroSection />
        <FlowConnector />
        <GlobeSection />
        <FlowConnector />
        <Testimonials />
        <FlowConnector />
        <PhaseGate />
        <FlowConnector />
        <SearchBar />
        <CTABanner />
      </main>
      <Footer />
    </HomePageClient>
  );
}
