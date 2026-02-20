import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Keep the regions from A-02 spec
const EU_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
    'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
    'SI', 'ES', 'SE', 'GB', 'NO', 'IS', 'LI', 'CH'
]

export function middleware(request: NextRequest) {
    // Read Cloudflare IP Country Header
    const country = request.headers.get('cf-ipcountry')

    let geoMode = 'default'

    if (country === 'US') {
        geoMode = 'ccpa'
    } else if (country === 'AE') {
        geoMode = 'pdpl'
    } else if (country && EU_COUNTRIES.includes(country)) {
        geoMode = 'gdpr'
    }

    // Create response
    const response = NextResponse.next()

    // Set the cookie if not already set or changed
    const currentCookie = request.cookies.get('qm_geo_mode')?.value

    if (currentCookie !== geoMode) {
        response.cookies.set('qm_geo_mode', geoMode, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 2592000 // 30 days
        })
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
