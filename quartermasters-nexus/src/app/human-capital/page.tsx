import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { HumanCapitalClient } from "@/components/services/HumanCapitalClient";

const capabilities = [
  {
    title: "HR Compliance & Labor Law Advisory",
    description:
      "UAE labor law alignment, contract structuring, WPS compliance, and Ministry of Labour positioning.",
  },
  {
    title: "Workforce Structuring & Hiring",
    description:
      "Talent acquisition frameworks, visa processing, onboarding systems, and offshore/local workforce optimization.",
  },
  {
    title: "Performance Management Systems",
    description:
      "OKR frameworks, KPI architecture, appraisal cycles, and feedback loops aligned with organizational objectives.",
  },
  {
    title: "Compensation & Benefits Design",
    description:
      "Salary structuring, equity programs, health insurance frameworks, and end-of-service calculation compliance.",
  },
  {
    title: "Organizational Development",
    description:
      "Team restructuring, capacity planning, role design, and scalability roadmaps for growth-stage organizations.",
  },
];

export const metadata: Metadata = {
  title: "Human Capital & Resource Management | [BRAND]",
  description: "Workforce Infrastructure & Regulatory Compliance. HR systems for the UAE operational landscape.",
  openGraph: {
    title: "Human Capital & Resource Management | [BRAND]",
    description: "Workforce Infrastructure & Regulatory Compliance. HR systems for the UAE operational landscape.",
    url: 'https://example.com/human-capital',
  }
};

export default function HumanCapitalPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Human Capital & Resource Management",
        description: "Workforce Infrastructure & Regulatory Compliance.",
        url: "https://example.com/human-capital",
        image: "https://example.com/og-image.jpg"
      }} />
      <HumanCapitalClient capabilities={capabilities} />
    </>
  );
}
