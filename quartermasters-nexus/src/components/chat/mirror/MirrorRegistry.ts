/**
 * Magic Mirror — Component Registry
 * Maps trigger tags in Q's responses to live React components.
 * Q emits [MIRROR:<type>:<json_params>] in its stream.
 * The renderer extracts these and swaps them for real components.
 */

export type MirrorType =
    | "service-comparison"
    | "pricing-grid"
    | "process-timeline"
    | "feature-showcase"
    | "metric-card";

export type MirrorBlock = {
    type: MirrorType;
    params: Record<string, unknown>;
    raw: string; // original matched string for replacement
};

/**
 * Parse all [MIRROR:type:json] blocks from a message string.
 * Returns the cleaned text (triggers removed) and the parsed blocks.
 */
export function parseMirrorBlocks(text: string): {
    cleanedText: string;
    blocks: MirrorBlock[];
} {
    const regex = /\[MIRROR:(\w[\w-]*):(\{[^}]*\})\]/g;
    const blocks: MirrorBlock[] = [];
    let cleanedText = text;

    let match;
    while ((match = regex.exec(text)) !== null) {
        const [raw, type, jsonStr] = match;
        try {
            const params = JSON.parse(jsonStr);
            blocks.push({
                type: type as MirrorType,
                params,
                raw,
            });
        } catch {
            // Invalid JSON — skip this block
            continue;
        }
    }

    // Remove all matched triggers from the text
    for (const block of blocks) {
        cleanedText = cleanedText.replace(block.raw, "");
    }

    return { cleanedText: cleanedText.trim(), blocks };
}

/**
 * Supported mirror types and their required param shapes (for validation).
 */
export const MIRROR_TYPES: Record<MirrorType, string[]> = {
    "service-comparison": ["services"], // services: string[] (service slugs to compare)
    "pricing-grid": ["service"],        // service: string (single service slug)
    "process-timeline": ["service"],    // service: string
    "feature-showcase": ["service", "tier"], // service + tier
    "metric-card": ["metrics"],         // metrics: { label, value, suffix? }[]
};
