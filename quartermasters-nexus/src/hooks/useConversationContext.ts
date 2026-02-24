import { useMemo, useEffect, useState } from 'react';

// Define the service domains mapped to the S8-04 spec
export type ServiceTheme =
    | 'financial-advisory'
    | 'human-capital'
    | 'management'
    | 'tech-rnd'
    | 'event-logistics'
    | 'it-services'
    | 'idle';

const THEME_KEYWORDS: Record<ServiceTheme, string[]> = {
    'financial-advisory': ['financial', 'banking', 'investment', 'cfo', 'audit', 'wealth', 'capital', 'finance'],
    'human-capital': ['hr', 'human capital', 'recruitment', 'talent', 'workforce', 'staffing', 'culture', 'employees'],
    'management': ['management', 'strategy', 'operations', 'growth', 'transformation', 'restructuring', 'expansion'],
    'tech-rnd': ['technology', 'r&d', 'innovation', 'ai', 'prototype', 'research', 'scientific', 'invention'],
    'event-logistics': ['event', 'conference', 'exhibition', 'logistics', 'venue', 'production', 'concert', 'festival'],
    'it-services': ['it', 'software', 'web', 'development', 'infrastructure', 'cloud', 'security', 'network'],
    'idle': [] // 'idle' represents the default SilkBackground state
};

interface ContextResult {
    activeService: ServiceTheme;
    confidence: number;
}

export function useConversationContext(latestAssistantMessage: string): ContextResult {
    const [result, setResult] = useState<ContextResult>({ activeService: 'idle', confidence: 0 });

    useEffect(() => {
        if (!latestAssistantMessage) return;

        // Implement debounce (3 seconds max transitions)
        const timeoutId = setTimeout(() => {
            const lowerMsg = latestAssistantMessage.toLowerCase();
            let highestConfidence = 0;
            let detectedTheme: ServiceTheme = 'idle';

            for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
                if (theme === 'idle') continue;

                // Simple keyword density metric
                let matches = 0;
                for (const keyword of keywords) {
                    // Simple word boundary check to avoid partial word matches
                    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                    const count = (lowerMsg.match(regex) || []).length;
                    matches += count;
                }

                // Confidence formula (require at least 2 matches as per spec)
                // We'll map 2 matches to 0.5 confidence, 4 matches to 1.0
                const confidence = Math.min(1.0, (matches / 4));

                if (confidence >= 0.5 && confidence > highestConfidence) {
                    highestConfidence = confidence;
                    detectedTheme = theme as ServiceTheme;
                }
            }

            setResult({ activeService: detectedTheme, confidence: highestConfidence });

        }, 500); // 500ms debounce on keystrokes/stream chunks

        return () => clearTimeout(timeoutId);

    }, [latestAssistantMessage]);

    return result;
}
