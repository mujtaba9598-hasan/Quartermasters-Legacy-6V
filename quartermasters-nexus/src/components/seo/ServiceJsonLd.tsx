export function ServiceJsonLd({ service }: {
    service: {
        name: string
        description: string
        url: string
        image?: string
    }
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Quartermasters",
            "url": "https://quartermasters.me" // TODO: Replace with final domain
        },
        "serviceType": service.name,
        "areaServed": [
            {
                "@type": "Country",
                "name": "United States"
            },
            {
                "@type": "Country",
                "name": "United Kingdom"
            },
            {
                "@type": "Country",
                "name": "Singapore"
            },
            {
                "@type": "Country",
                "name": "Australia"
            },
            {
                "@type": "Place",
                "name": "European Union"
            }
        ],
        "url": service.url,
        ...(service.image && { "image": service.image })
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
