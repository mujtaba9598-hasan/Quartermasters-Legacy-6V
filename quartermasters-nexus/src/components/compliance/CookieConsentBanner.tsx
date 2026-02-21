'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Check, Settings, X } from 'lucide-react'
import { useConsent } from '@/hooks/useConsent'
import { useState, useEffect } from 'react'

export default function CookieConsentBanner() {
    const {
        geoMode,
        consent,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
        saveConsent,
        setConsent
    } = useConsent()

    const [isExpanded, setIsExpanded] = useState(false)

    // Listen for footer trigger
    useEffect(() => {
        const handleOpen = () => {
            setShowBanner(true)
            setIsExpanded(true)
        }
        window.addEventListener('open-cookie-preferences', handleOpen)
        return () => window.removeEventListener('open-cookie-preferences', handleOpen)
    }, [setShowBanner])

    // Don't render until client-side hydration is complete and we know if banner is needed
    if (!showBanner) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-8 md:w-[480px]"
            >
                {/* Glass Panel */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,26,23,0.85)] p-6 shadow-2xl backdrop-blur-xl">
                    {/* Accent Glow */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#C8A97E]/10 blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8A97E]/10 text-[#C8A97E]">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white font-heading">
                                        {geoMode === 'ccpa' ? 'Do Not Sell My Personal Information' : geoMode === 'gdpr' ? 'Privacy Settings' : 'Cookie Notice'}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {geoMode === 'gdpr'
                                            ? 'We respect your data privacy.'
                                            : geoMode === 'pdpl'
                                                ? 'UAE PDPL Compliant'
                                                : 'Enhancing your experience.'}
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <Settings className="h-4 w-4" />
                                </button>
                                {geoMode !== 'gdpr' && (
                                    <button
                                        onClick={() => setShowBanner(false)} // Just close (implied consent in some regions, or just dismissal)
                                        className="p-2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="text-xs text-slate-300 leading-relaxed">
                            {isExpanded ? (
                                <div className="space-y-4 py-2">
                                    {/* Category: Essential */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium text-white block">Essential</span>
                                            <span className="text-[10px] text-slate-500">Required for site security & function.</span>
                                        </div>
                                        <Check className="h-4 w-4 text-[#C8A97E]" />
                                    </div>

                                    {/* Category: Analytics */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium text-white block">Analytics</span>
                                            <span className="text-[10px] text-slate-500">Anonymous usage data to improve UX.</span>
                                        </div>
                                        <button
                                            onClick={() => setConsent({ ...consent, analytics: !consent.analytics })}
                                            className={`relative h-5 w-9 rounded-full transition-colors ${consent.analytics ? 'bg-[#C8A97E]' : 'bg-slate-700'}`}
                                        >
                                            <motion.div layout className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow-sm ${consent.analytics ? 'translate-x-[16px]' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Category: Preferences */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium text-white block">Preferences</span>
                                            <span className="text-[10px] text-slate-500">Site customization and settings.</span>
                                        </div>
                                        <button
                                            onClick={() => setConsent({ ...consent, preferences: !consent.preferences })}
                                            className={`relative h-5 w-9 rounded-full transition-colors ${consent.preferences ? 'bg-[#C8A97E]' : 'bg-slate-700'}`}
                                        >
                                            <motion.div layout className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow-sm ${consent.preferences ? 'translate-x-[16px]' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Category: Marketing */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium text-white block">Marketing</span>
                                            <span className="text-[10px] text-slate-500">Personalized content relevance.</span>
                                        </div>
                                        <button
                                            onClick={() => setConsent({ ...consent, marketing: !consent.marketing })}
                                            className={`relative h-5 w-9 rounded-full transition-colors ${consent.marketing ? 'bg-[#C8A97E]' : 'bg-slate-700'}`}
                                        >
                                            <motion.div layout className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow-sm ${consent.marketing ? 'translate-x-[16px]' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>
                                    {geoMode === 'ccpa'
                                        ? 'Under UAE law, you have the right to opt-out of the sale of your personal information. Click "Manage Preferences" to control your data choices.'
                                        : geoMode === 'pdpl'
                                            ? 'We process data in accordance with the UAE Personal Data Protection Law (PDPL). Your data is handled with appropriate safeguards.'
                                            : 'We use cookies to analyze traffic and enhance your experience.'}
                                    {geoMode === 'gdpr' ? ' You must opt-in to non-essential cookies.' : geoMode !== 'ccpa' && geoMode !== 'pdpl' ? ' You can adjust your preferences at any time.' : ''}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            {isExpanded ? (
                                <button
                                    onClick={() => saveConsent(consent)}
                                    className="w-full rounded-lg bg-white/10 py-2.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
                                >
                                    Save Preferences
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={rejectAll}
                                        className="flex-1 rounded-lg border border-white/10 bg-transparent py-2.5 text-xs font-medium text-white hover:bg-white/5 transition-colors"
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        onClick={acceptAll}
                                        className="flex-1 rounded-lg bg-[#C8A97E] py-2.5 text-xs font-medium text-white shadow-lg shadow-[#C8A97E]/20 hover:bg-[#B6966B] transition-colors"
                                    >
                                        Accept All
                                    </button>
                                </>
                            )}
                        </div>

                        {!isExpanded && (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="select-none text-center text-[10px] text-slate-500 hover:text-[#C8A97E] transition-colors"
                            >
                                Manage Preferences
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
