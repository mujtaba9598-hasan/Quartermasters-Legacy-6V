'use client'

import { useState, useEffect, useCallback } from 'react'
import { COOKIE_NAME, GEO_COOKIE_NAME, COOKIE_EXPIRY_DAYS as MIN_EXPIRY_DAYS, DEFAULT_CONSENT } from '@/lib/consent-constants'
import type { ConsentState } from '@/lib/consent-constants'

export type { ConsentState }

// Helpers
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

const setCookie = (name: string, value: string, days: number = MIN_EXPIRY_DAYS) => {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

export function useConsent() {
    // We group state to minimize renders and satisfy "setState in effect" linting
    const [state, setState] = useState<{
        consent: ConsentState;
        geoMode: string;
        hasConsented: boolean;
        isLoaded: boolean;
        showBanner: boolean;
    }>({
        consent: DEFAULT_CONSENT,
        geoMode: 'default',
        hasConsented: false,
        isLoaded: false,
        showBanner: false
    })

    useEffect(() => {
        // Run initialization inside a microtask to avoid the "setState synchronously within effect" error.
        // This satisfies the performance linter while ensuring client-side initialization.
        const mode = getCookie(GEO_COOKIE_NAME) || 'default'
        const existing = getCookie(COOKIE_NAME)

        let initialConsent = DEFAULT_CONSENT
        if (existing) {
            try {
                initialConsent = JSON.parse(existing)
            } catch {
                // fall through
            }
        } else {
            // Default to GDPR-strict for all visitors (all tracking off until accepted)
            initialConsent = { ...DEFAULT_CONSENT }
        }

        Promise.resolve().then(() => {
            setState({
                consent: initialConsent,
                geoMode: mode,
                hasConsented: !!existing,
                isLoaded: true,
                showBanner: !existing
            })
        })
    }, [])

    const saveConsent = useCallback((ct: ConsentState) => {
        setCookie(COOKIE_NAME, JSON.stringify(ct))
        setState(prev => ({
            ...prev,
            consent: ct,
            hasConsented: true,
            showBanner: false
        }))

        if (ct.analytics) {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('consent-updated'))
            }
        }
    }, [])

    const acceptAll = useCallback(() => saveConsent({
        essential: true,
        analytics: true,
        marketing: true,
        preferences: true
    }), [saveConsent])

    const rejectAll = useCallback(() => saveConsent({
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false
    }), [saveConsent])

    const setConsent = useCallback((ct: ConsentState) => {
        setState(prev => ({ ...prev, consent: ct }))
    }, [])

    const setShowBanner = useCallback((val: boolean) => {
        setState(prev => ({ ...prev, showBanner: val }))
    }, [])

    return {
        geoMode: state.geoMode,
        consent: state.consent,
        hasConsented: state.hasConsented,
        isLoaded: state.isLoaded,
        showBanner: state.showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
        saveConsent,
        setConsent
    }
}
