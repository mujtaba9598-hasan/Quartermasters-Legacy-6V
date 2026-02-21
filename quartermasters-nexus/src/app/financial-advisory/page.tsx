import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { FinancialClient } from "@/components/services/FinancialClient";

const capabilities = [
  {
    title: "Banking Services Consultancy",
    description:
      "Advisory on UAE banking ecosystem positioning, account structuring, relationship management, and trade finance frameworks.",
  },
  {
    title: "Investment Structure Design",
    description:
      "Architecture for holding companies, SPVs, and FDI vehicles aligned with DIFC, ADGM, and mainland regulations.",
  },
  {
    title: "Regulatory Compliance & Licensing",
    description:
      "End-to-end licensing support for financial services, including SCA (Securities & Commodities Authority) and Central Bank filings.",
  },
  {
    title: "Treasury & Cash Management",
    description:
      "Design and execution of institutional treasury operations, FX hedging strategies, and multi-currency frameworks.",
  },
  {
    title: "Capital Raise & Fundraising Advisory",
    description:
      "Positioning for private equity, venture capital, and institutional funding rounds — from pitch to term sheet.",
  },
];

export const metadata: Metadata = {
  title: "Financial Advisory & Banking Services | Quartermasters",
  description: "Institutional Financial Architecture & Regulatory Positioning. From banking structures to regulatory compliance.",
  openGraph: {
    title: "Financial Advisory & Banking Services | Quartermasters",
    description: "Institutional Financial Architecture & Regulatory Positioning. From banking structures to regulatory compliance.",
    url: 'https://quartermasters.me/financial-advisory',
  }
};

export default function FinancialAdvisoryPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Financial Advisory & Banking Services",
        description: "Institutional Financial Architecture & Regulatory Positioning.",
        url: "https://quartermasters.me/financial-advisory",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <FinancialClient capabilities={capabilities} />
    </>
  );
}
