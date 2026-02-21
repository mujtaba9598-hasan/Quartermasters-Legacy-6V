import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { EventLogisticsClient } from "@/components/services/EventLogisticsClient";

const capabilities = [
  {
    title: "Event Strategy & Planning",
    description:
      "Comprehensive event architecture from concept to execution — corporate conferences, exhibitions, government functions, and high-profile gatherings.",
  },
  {
    title: "Logistics Coordination",
    description:
      "End-to-end logistics management including vendor orchestration, supply chain coordination, and real-time operational tracking.",
  },
  {
    title: "Venue Management",
    description:
      "Site selection, venue assessment, capacity planning, and on-ground operational management for events of any scale.",
  },
  {
    title: "Production & Technical Operations",
    description:
      "Audio-visual production, staging design, technical infrastructure deployment, and show management.",
  },
  {
    title: "Stakeholder & Protocol Management",
    description:
      "VIP coordination, government liaison, protocol adherence, and stakeholder communications for institutional events.",
  },
  {
    title: "Post-Event Analytics",
    description:
      "Event performance measurement, attendee analytics, ROI assessment, and operational improvement reporting.",
  },
];

export const metadata: Metadata = {
  title: "Organization & Event Management | Quartermasters",
  description: "High-Stakes Logistics, Coordination & Operational Deployment. From venue logistics to stakeholder management.",
  openGraph: {
    title: "Organization & Event Management | Quartermasters",
    description: "High-Stakes Logistics, Coordination & Operational Deployment. From venue logistics to stakeholder management.",
    url: 'https://quartermasters.me/event-logistics',
  }
};

export default function EventLogisticsPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Organization and Event Management",
        description: "High-Stakes Logistics, Coordination & Operational Deployment.",
        url: "https://quartermasters.me/event-logistics",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <EventLogisticsClient capabilities={capabilities} />
    </>
  );
}
