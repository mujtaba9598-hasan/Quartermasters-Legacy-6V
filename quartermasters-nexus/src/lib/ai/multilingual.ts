import { type Locale, localeNames } from '@/i18n/config';

/**
 * S10-08: Q Multilingual Conversation Capability
 *
 * Detects user's language from their messages and injects a language
 * instruction into Q's system prompt so Q responds in the same language.
 */

// Language detection patterns (first message triggers detection)
const LANGUAGE_PATTERNS: Record<Locale, RegExp[]> = {
    en: [/\b(the|and|is|are|how|what|can|do|have|this|that|with)\b/i],
    es: [/\b(el|la|los|las|es|son|cómo|qué|puede|hola|necesito|quiero)\b/i],
    fr: [/\b(le|la|les|est|sont|comment|quel|bonjour|je|nous|vous|merci)\b/i],
    de: [/\b(der|die|das|ist|sind|wie|was|können|ich|wir|Sie|bitte)\b/i],
    zh: [/[\u4e00-\u9fff]{2,}/],
    ja: [/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]{2,}/],
    pt: [/\b(o|a|os|as|é|são|como|pode|preciso|quero|obrigado|olá)\b/i],
};

/**
 * Detect the language of a user message.
 * Returns the best-matching locale or 'en' as fallback.
 */
export function detectLanguage(message: string): Locale {
    // Check CJK first (more distinctive patterns)
    for (const locale of ['zh', 'ja'] as Locale[]) {
        for (const pattern of LANGUAGE_PATTERNS[locale]) {
            if (pattern.test(message)) return locale;
        }
    }

    // Score-based detection for Latin-script languages
    const scores: Partial<Record<Locale, number>> = {};
    for (const locale of ['es', 'fr', 'de', 'pt'] as Locale[]) {
        for (const pattern of LANGUAGE_PATTERNS[locale]) {
            const matches = message.match(new RegExp(pattern, 'gi'));
            if (matches) {
                scores[locale] = (scores[locale] || 0) + matches.length;
            }
        }
    }

    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (entries.length > 0 && entries[0][1] >= 2) {
        return entries[0][0] as Locale;
    }

    return 'en';
}

/**
 * Build the language instruction to inject into Q's system prompt.
 * This ensures Q responds in the user's detected language.
 */
export function buildLanguageInstruction(detectedLocale: Locale): string {
    if (detectedLocale === 'en') {
        return ''; // No extra instruction needed for English
    }

    const languageName = localeNames[detectedLocale];

    return `

IMPORTANT LANGUAGE INSTRUCTION:
The user is communicating in ${languageName}. You MUST respond entirely in ${languageName}.
- Use natural, professional ${languageName} — not machine translation.
- Keep all service names, pricing (USD), and brand names ("Quartermasters", "Q") in English.
- Adapt idioms and business terminology to ${languageName} conventions.
- If unsure of a technical term, use the English term with a brief ${languageName} explanation.
`;
}

/**
 * Detect language from conversation history (uses most recent user messages).
 * More reliable than single-message detection.
 */
export function detectConversationLanguage(
    messages: { role: string; content: string }[]
): Locale {
    const userMessages = messages
        .filter(m => m.role === 'user')
        .map(m => m.content)
        .slice(-3); // Last 3 user messages

    if (userMessages.length === 0) return 'en';

    // Combine recent messages for better detection
    const combined = userMessages.join(' ');
    return detectLanguage(combined);
}
