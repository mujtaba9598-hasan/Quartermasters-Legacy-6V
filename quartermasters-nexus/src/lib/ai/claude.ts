import Anthropic from '@anthropic-ai/sdk'
import { anthropic as aiAnthropic } from '@ai-sdk/anthropic'
import { streamText, type StreamTextResult } from 'ai'

export type RetrievedChunk = {
    chunkText: string
    documentTitle: string
    service: string | null
    similarity: number
}

export type PricingState = {
    current_state: string
    service: string
    tier: string
    base_price: number
    current_price: number
    discount_applied: number
    nudge_triggered: boolean
}

export interface AskQParams {
    userMessage: string
    conversationHistory: Array<{ role: string; content: string }>
    context: RetrievedChunk[]
    pricingState?: PricingState
}

function buildSystemPrompt(params: AskQParams): string {
    let systemPrompt = `Name: Q
Role: Senior Strategy Consultant for Quartermasters
Personality: Professional, authoritative, concise. Not chatty. Speaks like a seasoned consultant.
Scope: ONLY the 6 service verticals (HR Consultancy, Management Consultancies, Technology Education R&D, Event Management, Banking Services Consultancy, IT Services). If asked about anything outside scope, politely redirect.
Rule 1: NEVER fabricate prices - state that pricing info comes from the engagement framework.
Rule 2: NEVER make commitments (timelines, guarantees, deliverables) - always say subject to engagement terms.
Rule 3: NEVER provide legal/financial advice - always disclaim.
Goal: Qualify visitor -> determine service need -> present relevant info -> close (Express) or handoff (Executive).
Language: English only.`

    if (params.context.length > 0) {
        const contextStr = params.context
            .map(c => `[${c.documentTitle}${c.service ? ` - ${c.service}` : ''}]: ${c.chunkText}`)
            .join('\n\n')
        systemPrompt += `\n\n--- Knowledge Base Context ---\n${contextStr}`
    }

    if (params.pricingState) {
        const ps = params.pricingState
        systemPrompt += `\n\n--- Pricing State ---
Current State: ${ps.current_state}
Service: ${ps.service}
Tier: ${ps.tier}
Base Price: ${ps.base_price}
Current Price: ${ps.current_price}
Discount Applied: ${ps.discount_applied}
Nudge Triggered: ${ps.nudge_triggered}`
    }

    return systemPrompt
}

function buildMessages(params: AskQParams) {
    const validMessages = params.conversationHistory
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }))

    validMessages.push({
        role: 'user',
        content: params.userMessage
    })

    return validMessages
}

/**
 * Non-streaming Q response. Used for non-streaming contexts.
 */
export async function askQ(params: AskQParams): Promise<string> {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
        throw new Error('Missing ANTHROPIC_API_KEY environment variable.')
    }

    const anthropic = new Anthropic({ apiKey })
    const systemPrompt = buildSystemPrompt(params)
    const validMessages = buildMessages(params)

    const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: validMessages
    })

    const firstContent = response.content[0]
    if (!firstContent || firstContent.type !== 'text') {
        throw new Error('Invalid or empty response from Claude API.')
    }

    return firstContent.text
}

/**
 * Streaming Q response via Vercel AI SDK.
 * onFinish callback fires after stream completes with the full text.
 */
export function streamQ(
    params: AskQParams,
    onFinish?: (event: { text: string }) => void | Promise<void>
) {
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('Missing ANTHROPIC_API_KEY environment variable.')
    }

    const systemPrompt = buildSystemPrompt(params)
    const validMessages = buildMessages(params)

    return streamText({
        model: aiAnthropic('claude-sonnet-4-6'),
        maxTokens: 1024 as any,
        system: systemPrompt,
        messages: validMessages,
        onFinish,
    } as any)
}
