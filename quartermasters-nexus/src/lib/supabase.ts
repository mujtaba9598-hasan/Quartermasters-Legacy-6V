import { createClient } from '@supabase/supabase-js'

export type Database = {
    public: {
        Tables: {
            conversations: {
                Row: {
                    id: string
                    visitor_id: string
                    status: string
                    flow_type: string
                    started_at: string
                    ended_at: string | null
                    metadata: Record<string, unknown> | null
                }
                Insert: {
                    id?: string
                    visitor_id: string
                    status?: string
                    flow_type?: string
                    started_at?: string
                    ended_at?: string | null
                    metadata?: Record<string, unknown> | null
                }
                Update: {
                    id?: string
                    visitor_id?: string
                    status?: string
                    flow_type?: string
                    started_at?: string
                    ended_at?: string | null
                    metadata?: Record<string, unknown> | null
                }
            }
            messages: {
                Row: {
                    id: string
                    conversation_id: string
                    role: string
                    content: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    conversation_id: string
                    role: string
                    content: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    conversation_id?: string
                    role?: string
                    content?: string
                    created_at?: string
                }
            }
            leads: {
                Row: {
                    id: string
                    conversation_id: string
                    email: string | null
                    company: string | null
                    budget_range: string | null
                    service_interest: string | null
                    qualification_score: number
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    conversation_id: string
                    email?: string | null
                    company?: string | null
                    budget_range?: string | null
                    service_interest?: string | null
                    qualification_score: number
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    conversation_id?: string
                    email?: string | null
                    company?: string | null
                    budget_range?: string | null
                    service_interest?: string | null
                    qualification_score?: number
                    status?: string
                    created_at?: string
                }
            }
            pricing_states: {
                Row: {
                    id: string
                    conversation_id: string
                    current_state: string
                    service: string
                    tier: string
                    base_price: number
                    current_price: number
                    discount_applied: number
                    nudge_triggered: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    conversation_id: string
                    current_state: string
                    service: string
                    tier: string
                    base_price: number
                    current_price: number
                    discount_applied?: number
                    nudge_triggered?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    conversation_id?: string
                    current_state?: string
                    service?: string
                    tier?: string
                    base_price?: number
                    current_price?: number
                    discount_applied?: number
                    nudge_triggered?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            documents: {
                Row: {
                    id: string
                    title: string
                    content: string
                    service: string | null
                    doc_type: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    content: string
                    service?: string | null
                    doc_type?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string
                    service?: string | null
                    doc_type?: string
                    created_at?: string
                }
            }
            document_embeddings: {
                Row: {
                    id: string
                    document_id: string
                    chunk_index: number
                    chunk_text: string
                    embedding: number[]
                    created_at: string
                }
                Insert: {
                    id?: string
                    document_id: string
                    chunk_index: number
                    chunk_text: string
                    embedding: number[]
                    created_at?: string
                }
                Update: {
                    id?: string
                    document_id?: string
                    chunk_index?: number
                    chunk_text?: string
                    embedding?: number[]
                    created_at?: string
                }
            }
            pricing_audit_log: {
                Row: {
                    id: string
                    conversation_id: string
                    action: string
                    details: Record<string, unknown>
                    created_at: string
                }
                Insert: {
                    id?: string
                    conversation_id: string
                    action: string
                    details: Record<string, unknown>
                    created_at?: string
                }
                Update: {
                    id?: string
                    conversation_id?: string
                    action?: string
                    details?: Record<string, unknown>
                    created_at?: string
                }
            }
            consent_records: {
                Row: {
                    id: string
                    visitor_id: string
                    geo_mode: string
                    necessary: boolean
                    analytics: boolean
                    marketing: boolean
                    do_not_sell: boolean
                    ip_country: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    visitor_id: string
                    geo_mode: string
                    necessary?: boolean
                    analytics?: boolean
                    marketing?: boolean
                    do_not_sell?: boolean
                    ip_country?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    visitor_id?: string
                    geo_mode?: string
                    necessary?: boolean
                    analytics?: boolean
                    marketing?: boolean
                    do_not_sell?: boolean
                    ip_country?: string | null
                    created_at?: string
                }
            }
        }
        Views: Record<string, never>
        Functions: Record<string, never>
        Enums: Record<string, never>
        CompositeTypes: Record<string, never>
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Server-side singleton with service role (for admin operations)
export const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)

// Client-side helper
export const createBrowserClient = () => {
    return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
