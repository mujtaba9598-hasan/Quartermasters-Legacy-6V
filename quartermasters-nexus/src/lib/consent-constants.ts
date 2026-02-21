export const COOKIE_NAME = 'qm_consent'
export const GEO_COOKIE_NAME = 'qm_geo_mode'
export const COOKIE_EXPIRY_DAYS = 365

export const CONSENT_CATEGORIES = {
    essential: 'essential',
    analytics: 'analytics',
    marketing: 'marketing',
    preferences: 'preferences',
} as const

export const REGIONS = {
    // GDPR: EU/EEA + UK
    GDPR: [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO', 'CH'
    ],
    // CCPA: United States ONLY (California Consumer Privacy Act)
    CCPA: ['US'],
    // PDPL: UAE (maintained for legal compliance per DEC-007)
    PDPL: ['AE'],
}

export type ConsentState = {
    essential: boolean
    analytics: boolean
    marketing: boolean
    preferences: boolean
}


export const DEFAULT_CONSENT: ConsentState = {
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
}

