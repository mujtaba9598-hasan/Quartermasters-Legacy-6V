import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { retrieveContext } from '@/lib/rag/retrieve'
import { askQ } from '@/lib/ai/claude'
import { validateResponse } from '@/lib/ai/guardrails'

// Simple in-memory rate limiting map
// Key: visitorId, Value: { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(visitorId: string): boolean {
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 minute
    const maxRequests = 10

    const entry = rateLimitMap.get(visitorId)

    if (!entry) {
        rateLimitMap.set(visitorId, { count: 1, resetTime: now + windowMs })
        return true
    }

    if (now > entry.resetTime) {
        rateLimitMap.set(visitorId, { count: 1, resetTime: now + windowMs })
        return true
    }

    if (entry.count >= maxRequests) {
        return false
    }

    entry.count += 1
    return true
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { message, visitorId, conversationId } = body

        if (!message || !visitorId) {
            return NextResponse.json({ error: 'Missing message or visitorId' }, { status: 400 })
        }

        if (!checkRateLimit(visitorId)) {
            return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
        }

        let currentConversationId = conversationId

        // a. If conversationId provided, fetch it. Otherwise create new one.
        if (!currentConversationId) {
            const { data: convData, error: convError } = await supabase
                .from('conversations')
                .insert({ visitor_id: visitorId, status: 'active', flow_type: 'discovery' })
                .select('id')
                .single()

            if (convError || !convData) {
                console.error('Error creating conversation:', convError)
                return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
            }
            currentConversationId = convData.id
        }

        // b. Fetch conversation history
        const { data: messagesData, error: messagesError } = await supabase
            .from('messages')
            .select('role, content')
            .eq('conversation_id', currentConversationId)
            .order('created_at', { ascending: true })

        if (messagesError) {
            console.error('Error fetching messages:', messagesError)
            return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
        }

        const conversationHistory = messagesData || []

        // c. Call retrieveContext for RAG context
        const context = await retrieveContext(message)

        // d. Fetch current pricing_state
        const { data: pricingData, error: pricingError } = await supabase
            .from('pricing_states')
            .select('*')
            .eq('conversation_id', currentConversationId)
            .single()

        // It's okay if pricing state doesn't exist yet
        if (pricingError && pricingError.code !== 'PGRST116') {
            console.error('Error fetching pricing state:', pricingError)
        }

        // e. Call askQ with all context
        const qResponseText = await askQ({
            userMessage: message,
            conversationHistory,
            context,
            pricingState: pricingData || undefined
        })

        // f. Run response through validateResponse
        const validationResult = validateResponse(qResponseText, pricingData || undefined)

        // g. Store user message + Q response
        const { error: insertError } = await supabase.from('messages').insert([
            { conversation_id: currentConversationId, role: 'user', content: message },
            { conversation_id: currentConversationId, role: 'assistant', content: validationResult.cleaned }
        ])

        if (insertError) {
            console.error('Error inserting new messages:', insertError)
            return NextResponse.json({ error: 'Failed to save messages' }, { status: 500 })
        }

        // h. Return response
        return NextResponse.json({
            response: validationResult.cleaned,
            conversationId: currentConversationId,
            flags: validationResult.flags
        })

    } catch (error: any) {
        console.error('Error in /api/chat:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
