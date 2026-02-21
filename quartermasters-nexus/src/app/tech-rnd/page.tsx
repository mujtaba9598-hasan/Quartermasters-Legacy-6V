import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { TechRndClient } from "@/components/services/TechRndClient";

const capabilities = [
  {
    title: "Technology R&D Infrastructure",
    description:
      "Laboratory setup, equipment procurement, technical compliance, and R&D licensing frameworks for government-certified innovation programs.",
  },
  {
    title: "Education Technology Curriculum",
    description:
      "Design and deployment of MOE-aligned curricula for STEM, coding, robotics, and digital literacy programs.",
  },
  {
    title: "Technical Operations & Systems",
    description:
      "IT infrastructure setup, software procurement, SaaS negotiations, and operational technology integration.",
  },
  {
    title: "Innovation Program Management",
    description:
      "Proof-of-concept execution, grant applications, incubation frameworks, and public-private partnership structuring.",
  },
  {
    title: "Digital Transformation Advisory",
    description:
      "Process automation, cloud migration, digital workflow design, and change management for legacy system modernization.",
  },
];

export const metadata: Metadata = {
  title: "Technology & R&D Services | Quartermasters",
  description: "Innovation Infrastructure & Technical Operations. From education technology to R&D frameworks.",
  openGraph: {
    title: "Technology & R&D Services | Quartermasters",
    description: "Innovation Infrastructure & Technical Operations. From education technology to R&D frameworks.",
    url: 'https://quartermasters.me/tech-rnd',
  }
};

export default function TechRndPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Technology & R&D Services",
        description: "Innovation Infrastructure & Technical Operations.",
        url: "https://quartermasters.me/tech-rnd",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <TechRndClient capabilities={capabilities} />
    </>
  );
}
