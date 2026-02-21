import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { HumanCapitalClient } from "@/components/services/HumanCapitalClient";

const capabilities = [
  {
    title: "HR Compliance & Labor Law Advisory",
    description:
      "Federal and state labor law alignment, contract structuring, compliance advisory, and workforce positioning.",
  },
  {
    title: "Workforce Structuring & Hiring",
    description:
      "Talent acquisition frameworks, onboarding systems, remote workforce strategies, and workforce optimization.",
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
  title: "Human Capital & Resource Management | Quartermasters",
  description: "Workforce Infrastructure & Regulatory Compliance. HR systems for modern enterprises.",
  openGraph: {
    title: "Human Capital & Resource Management | Quartermasters",
    description: "Workforce Infrastructure & Regulatory Compliance. HR systems for modern enterprises.",
    url: 'https://quartermasters.me/human-capital',
  }
};

export default function HumanCapitalPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Human Capital & Resource Management",
        description: "Workforce Infrastructure & Regulatory Compliance.",
        url: "https://quartermasters.me/human-capital",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <HumanCapitalClient capabilities={capabilities} />
    </>
  );
}
