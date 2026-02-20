export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "[BRAND]",
    url: "https://example.com", // TODO: Replace with final domain
    logo: "/og-image.jpg",
    description:
      "Premium strategic consulting across five verticals: Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "California",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "[BRAND]",
    image: "/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressRegion: "California",
      addressCountry: "US",
    },
    description:
      "Premium consulting firm operating across five integrated verticals: Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management.",
    priceRange: "$$$$",
  };

  const services = [
    {
      name: "Financial Advisory",
      description:
        "Strategic advisory on financial planning, capital structuring, investment strategy, and regulatory compliance.",
    },
    {
      name: "Human Capital Consulting",
      description:
        "Talent acquisition, workforce strategy, organizational development, and HR transformation.",
    },
    {
      name: "Strategic Management Consulting",
      description:
        "Strategic management advisory, organizational design, governance frameworks, and executive decision-making support.",
    },
    {
      name: "Events & Experiences",
      description:
        "High-impact event strategy, logistics coordination, brand activations, and experiential design at scale.",
    },
    {
      name: "Technology & Innovation Consulting",
      description:
        "Digital transformation, technology strategy, R&D advisory, and emerging technology assessment.",
    },
  ];

  const serviceSchema = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "[BRAND]",
    },
    name: s.name,
    description: s.description,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does [BRAND] offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "[BRAND] provides five integrated consulting services: Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management.",
        },
      },
      {
        "@type": "Question",
        name: "Where is [BRAND] based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "[BRAND] is based in California, United States, serving clients globally.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does [BRAND] serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "[BRAND] serves a wide range of industries including finance, technology, healthcare, events, and enterprise organizations seeking strategic consulting and advisory services.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {serviceSchema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
