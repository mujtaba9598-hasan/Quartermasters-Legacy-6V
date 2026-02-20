import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { ManagementClient } from "@/components/services/ManagementClient";

const capabilities = [
  {
    title: "Strategic Business Planning",
    description:
      "Market entry strategies, competitive positioning, growth roadmaps, and scenario planning for complex operating environments.",
  },
  {
    title: "Operational Excellence",
    description:
      "Process optimization, resource allocation frameworks, SOP development, and scalability architecture.",
  },
  {
    title: "Corporate Structure & Governance",
    description:
      "Holding company design, board governance frameworks, shareholder agreements, and decision-making protocols.",
  },
  {
    title: "Change Management",
    description:
      "Organizational transformation programs, restructuring execution, culture alignment, and stakeholder communication.",
  },
  {
    title: "Risk Management & Mitigation",
    description:
      "Enterprise risk frameworks, regulatory risk assessment, operational continuity planning, and crisis management protocols.",
  },
];

export const metadata: Metadata = {
  title: "Strategic Management Consultancy | [BRAND]",
  description: "Strategic Operations & Organizational Infrastructure for complex regulatory landscapes.",
  openGraph: {
    title: "Strategic Management Consultancy | [BRAND]",
    description: "Strategic Operations & Organizational Infrastructure for complex regulatory landscapes.",
    url: 'https://example.com/management',
  }
};

export default function ManagementPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Strategic Management Consultancy",
        description: "Strategic Operations & Organizational Infrastructure.",
        url: "https://example.com/management",
        image: "https://example.com/og-image.jpg"
      }} />
      <ManagementClient capabilities={capabilities} />
    </>
  );
}
