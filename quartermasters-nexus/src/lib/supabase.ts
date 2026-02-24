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
            bookings: {
                Row: {
                    id: string
                    cal_booking_id: string | null
                    cal_event_type: string | null
                    attendee_name: string
                    attendee_email: string
                    attendee_timezone: string | null
                    start_time: string
                    end_time: string
                    status: string | null
                    service_interest: string | null
                    notes: string | null
                    conversation_id: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    cal_booking_id?: string | null
                    cal_event_type?: string | null
                    attendee_name: string
                    attendee_email: string
                    attendee_timezone?: string | null
                    start_time: string
                    end_time: string
                    status?: string | null
                    service_interest?: string | null
                    notes?: string | null
                    conversation_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    cal_booking_id?: string | null
                    cal_event_type?: string | null
                    attendee_name?: string
                    attendee_email?: string
                    attendee_timezone?: string | null
                    start_time?: string
                    end_time?: string
                    status?: string | null
                    service_interest?: string | null
                    notes?: string | null
                    conversation_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            contacts: {
                Row: {
                    id: string
                    email: string
                    name: string | null
                    company: string | null
                    phone: string | null
                    source: string | null
                    first_seen_at: string | null
                    last_seen_at: string | null
                    metadata: Record<string, unknown> | null
                }
                Insert: {
                    id?: string
                    email: string
                    name?: string | null
                    company?: string | null
                    phone?: string | null
                    source?: string | null
                    first_seen_at?: string | null
                    last_seen_at?: string | null
                    metadata?: Record<string, unknown> | null
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string | null
                    company?: string | null
                    phone?: string | null
                    source?: string | null
                    first_seen_at?: string | null
                    last_seen_at?: string | null
                    metadata?: Record<string, unknown> | null
                }
            }
            interactions: {
                Row: {
                    id: string
                    contact_id: string | null
                    type: string
                    summary: string | null
                    metadata: Record<string, unknown> | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    contact_id?: string | null
                    type: string
                    summary?: string | null
                    metadata?: Record<string, unknown> | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    contact_id?: string | null
                    type?: string
                    summary?: string | null
                    metadata?: Record<string, unknown> | null
                    created_at?: string | null
                }
            }
            lead_scores: {
                Row: {
                    id: string
                    contact_id: string | null
                    score: number | null
                    qualification: string | null
                    budget_range: string | null
                    service_interest: string | null
                    urgency: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    contact_id?: string | null
                    score?: number | null
                    qualification?: string | null
                    budget_range?: string | null
                    service_interest?: string | null
                    urgency?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    contact_id?: string | null
                    score?: number | null
                    qualification?: string | null
                    budget_range?: string | null
                    service_interest?: string | null
                    urgency?: string | null
                    updated_at?: string | null
                }
            }
            projects: {
                Row: {
                    id: string
                    client_id: string
                    title: string
                    description: string | null
                    status: string
                    service_vertical: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    client_id: string
                    title: string
                    description?: string | null
                    status?: string
                    service_vertical?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    client_id?: string
                    title?: string
                    description?: string | null
                    status?: string
                    service_vertical?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        client_documents: {
            Row: {
                id: string
                client_id: string
                project_id: string | null
                file_name: string
                file_type: string
                file_size: number
                storage_path: string
                category: string
                uploaded_by: string
                created_at: string
                updated_at: string
            }
            Insert: {
                id?: string
                client_id: string
                project_id?: string | null
                file_name: string
                file_type: string
                file_size: number
                storage_path: string
                category?: string
                uploaded_by?: string
                created_at?: string
                updated_at?: string
            }
            Update: {
                id?: string
                client_id?: string
                project_id?: string | null
                file_name?: string
                file_type?: string
                file_size?: number
                storage_path?: string
                category?: string
                uploaded_by?: string
                created_at?: string
                updated_at?: string
            }
        }
        invoices: {
            Row: {
                id: string
                client_id: string
                project_id: string | null
                invoice_number: string
                amount: number
                currency: string
                status: string
                service: string
                tier: string
                line_items: Record<string, unknown>[]
                tax_rate: number
                tax_amount: number
                total_amount: number
                notes: string | null
                issued_at: string
                due_at: string
                paid_at: string | null
                stripe_payment_id: string | null
                created_at: string
                updated_at: string
            }
            Insert: {
                id?: string
                client_id: string
                project_id?: string | null
                invoice_number: string
                amount: number
                currency?: string
                status?: string
                service: string
                tier: string
                line_items?: Record<string, unknown>[]
                tax_rate?: number
                tax_amount?: number
                total_amount: number
                notes?: string | null
                issued_at?: string
                due_at?: string
                paid_at?: string | null
                stripe_payment_id?: string | null
                created_at?: string
                updated_at?: string
            }
            Update: {
                id?: string
                client_id?: string
                project_id?: string | null
                invoice_number?: string
                amount?: number
                currency?: string
                status?: string
                service?: string
                tier?: string
                line_items?: Record<string, unknown>[]
                tax_rate?: number
                tax_amount?: number
                total_amount?: number
                notes?: string | null
                issued_at?: string
                due_at?: string
                paid_at?: string | null
                stripe_payment_id?: string | null
                created_at?: string
                updated_at?: string
            }
        }
        payments: {
            Row: {
                id: string
                client_id: string
                invoice_id: string | null
                stripe_session_id: string
                stripe_payment_intent_id: string | null
                amount: number
                currency: string
                status: string
                service: string
                tier: string
                metadata: Record<string, unknown> | null
                created_at: string
            }
            Insert: {
                id?: string
                client_id: string
                invoice_id?: string | null
                stripe_session_id: string
                stripe_payment_intent_id?: string | null
                amount: number
                currency?: string
                status: string
                service: string
                tier: string
                metadata?: Record<string, unknown> | null
                created_at?: string
            }
            Update: {
                id?: string
                client_id?: string
                invoice_id?: string | null
                stripe_session_id?: string
                stripe_payment_intent_id?: string | null
                amount?: number
                currency?: string
                status?: string
                service?: string
                tier?: string
                metadata?: Record<string, unknown> | null
                created_at?: string
            }
        }
        client_messages: {
            Row: {
                id: string
                client_id: string
                project_id: string | null
                sender_role: string
                sender_name: string
                content: string
                read_at: string | null
                created_at: string
            }
            Insert: {
                id?: string
                client_id: string
                project_id?: string | null
                sender_role: string
                sender_name: string
                content: string
                read_at?: string | null
                created_at?: string
            }
            Update: {
                id?: string
                client_id?: string
                project_id?: string | null
                sender_role?: string
                sender_name?: string
                content?: string
                read_at?: string | null
                created_at?: string
            }
            invoices: {
                Row: {
                    id: string
                    client_id: string
                    project_id: string | null
                    invoice_number: string
                    amount: number
                    currency: string
                    status: string
                    service: string | null
                    tier: string | null
                    line_items: any | null
                    tax_amount: number | null
                    total_amount: number
                    issued_at: string | null
                    due_at: string | null
                    paid_at: string | null
                    stripe_payment_id: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    client_id: string
                    project_id?: string | null
                    invoice_number: string
                    amount: number
                    currency?: string
                    status?: string
                    service?: string | null
                    tier?: string | null
                    line_items?: any | null
                    tax_amount?: number | null
                    total_amount: number
                    issued_at?: string | null
                    due_at?: string | null
                    paid_at?: string | null
                    stripe_payment_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    client_id?: string
                    project_id?: string | null
                    invoice_number?: string
                    amount?: number
                    currency?: string
                    status?: string
                    service?: string | null
                    tier?: string | null
                    line_items?: any | null
                    tax_amount?: number | null
                    total_amount?: number
                    issued_at?: string | null
                    due_at?: string | null
                    paid_at?: string | null
                    stripe_payment_id?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            payments: {
                Row: {
                    id: string
                    client_id: string
                    invoice_id: string | null
                    stripe_session_id: string
                    stripe_payment_intent_id: string | null
                    amount: number
                    currency: string
                    status: string
                    service: string | null
                    tier: string | null
                    metadata: any | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    client_id: string
                    invoice_id?: string | null
                    stripe_session_id: string
                    stripe_payment_intent_id?: string | null
                    amount: number
                    currency?: string
                    status: string
                    service?: string | null
                    tier?: string | null
                    metadata?: any | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    client_id?: string
                    invoice_id?: string | null
                    stripe_session_id?: string
                    stripe_payment_intent_id?: string | null
                    amount?: number
                    currency?: string
                    status?: string
                    service?: string | null
                    tier?: string | null
                    metadata?: any | null
                    created_at?: string | null
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
// Lazy init: avoids crash during static export build when env vars are absent
export const supabase = supabaseUrl
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : (null as unknown as ReturnType<typeof createClient>)

// Client-side helper
export const createBrowserClient = () => {
    if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL not configured')
    return createClient(supabaseUrl, supabaseAnonKey)
}
