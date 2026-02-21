import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/portal/'],
        },
        sitemap: 'https://quartermasters.me/sitemap.xml',
        host: 'https://quartermasters.me',
    }
}
