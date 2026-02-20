import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function KnowledgeBaseIndex() {
    const categories = [
        {
            title: "Banking Services Consultancy",
            slug: "banking-services",
            description: "Regulatory compliance, capital structuring, and financial frameworks.",
        },
        {
            title: "Human Resources Consultancy",
            slug: "human-resources",
            description: "Talent acquisition strategy, workforce planning, and labor law compliance.",
        },
        {
            title: "Management Consultancies",
            slug: "management-consultancy",
            description: "Organizational design, governance frameworks, and operational excellence.",
        },
        {
            title: "Organization & Event Management",
            slug: "event-management",
            description: "High-stakes logistics, venue coordination, and event strategy.",
        },
        {
            title: "Technology Education R&D",
            slug: "technology-education",
            description: "Digital transformation, EdTech infrastructure, and R&D strategy.",
        },
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16">
                        <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-[#C8872E]">
                            Knowledge Base
                        </span>
                        <h1 className="heading-1 mb-6">Strategic Intelligence.</h1>
                        <p className="max-w-2xl text-lg text-[var(--text-muted)]">
                            Deep dives into our methodologies, regulatory frameworks, and
                            operational standards across five key consultancy verticals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/knowledge-base/${category.slug}`}
                                className="group relative overflow-hidden rounded-xl border border-[rgba(27,58,75,0.08)] bg-white/80 p-8 transition-all hover:border-[#C8872E] hover:shadow-[0_0_30px_rgba(200,135,46,0.1)]"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(200,135,46,0.1)] text-[#C8872E] transition-colors group-hover:bg-[#C8872E] group-hover:text-black">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="heading-4 mb-3 group-hover:text-[#C8872E]">
                                    {category.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                                    {category.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
