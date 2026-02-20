import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const visitorId = searchParams.get('visitorId')

        if (!visitorId) {
            return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('visitor_id', visitorId)
            .order('started_at', { ascending: false })

        if (error) {
            console.error('Error fetching conversations:', error)
            return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
        }

        return NextResponse.json(data)

    } catch (error: any) {
        console.error('Error in GET /api/conversations:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { visitorId, flowType } = body

        if (!visitorId) {
            return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('conversations')
            .insert({
                visitor_id: visitorId,
                flow_type: flowType || 'discovery',
                status: 'active'
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating conversation:', error)
            return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
        }

        return NextResponse.json(data)

    } catch (error: any) {
        console.error('Error in POST /api/conversations:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
