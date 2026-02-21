import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { ITServicesClient } from "@/components/services/ITServicesClient";

const capabilities = [
    {
        title: "Custom Software Dev",
        description: "End-to-end bespoke software tailored exactly to your unique workflows and operational specifications.",
    },
    {
        title: "Web App Engineering",
        description: "Highly interactive, accessible, and progressive web application frameworks built for scale.",
    },
    {
        title: "SaaS Platform Dev",
        description: "Multi-tenant architectures designed with resilient data silos, billing integrations, and seamless user experiences.",
    },
    {
        title: "API Design & Integration",
        description: "Microservice routing protocols and robust GraphQL/REST API bridges connecting enterprise applications securely.",
    },
    {
        title: "Digital Product Strategy",
        description: "Comprehensive product road mapping, agile consulting, and UI/UX ideation to bring ideas into market reality.",
    },
];

export const metadata: Metadata = {
    title: "IT Services | Quartermasters F.Z.C",
    description: "Custom Software & Digital Product Engineering. From web applications to SaaS architectures.",
    openGraph: {
        title: "IT Services | Quartermasters F.Z.C",
        description: "Custom Software & Digital Product Engineering. From web applications to SaaS architectures.",
        url: 'https://quartermasters.me/it-services',
    }
};

export default function ITServicesPage() {
    return (
        <>
            <ServiceJsonLd service={{
                name: "IT Services",
                description: "Custom Software & Digital Product Engineering.",
                url: "https://quartermasters.me/it-services",
                image: "https://quartermasters.me/og-image.jpg"
            }} />
            <ITServicesClient capabilities={capabilities} />
        </>
    );
}
