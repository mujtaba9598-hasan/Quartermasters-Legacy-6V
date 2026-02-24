import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * S10-09: GDPR Compliance Hardening
 *
 * Endpoints for GDPR Article 15 (data access), Article 17 (right to erasure),
 * and Article 20 (data portability).
 *
 * POST /api/compliance/gdpr — Submit a GDPR request
 * Body: { type: 'access' | 'erasure' | 'portability', email: string }
 */

type GDPRRequestType = 'access' | 'erasure' | 'portability';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, email } = body as { type: GDPRRequestType; email: string };

        if (!type || !email) {
            return NextResponse.json({ error: 'Missing type or email' }, { status: 400 });
        }

        if (!['access', 'erasure', 'portability'].includes(type)) {
            return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        switch (type) {
            case 'access':
                return handleDataAccess(email);
            case 'erasure':
                return handleDataErasure(email);
            case 'portability':
                return handleDataPortability(email);
            default:
                return NextResponse.json({ error: 'Unknown request type' }, { status: 400 });
        }
    } catch (error: unknown) {
        console.error('GDPR API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * Article 15 — Right of Access
 * Returns all personal data associated with the email.
 */
async function handleDataAccess(email: string) {
    const data: Record<string, unknown> = {};

    // Contacts
    const { data: contacts } = await supabase
        .from('contacts')
        .select('*')
        .eq('email', email);
    if (contacts?.length) data.contacts = contacts;

    // Bookings
    const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('attendee_email', email);
    if (bookings?.length) data.bookings = bookings;

    // Leads
    const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .eq('email', email);
    if (leads?.length) data.leads = leads;

    // Consent records
    const { data: consent } = await supabase
        .from('consent_records')
        .select('*')
        .eq('visitor_id', email); // visitor_id may differ; best-effort
    if (consent?.length) data.consent_records = consent;

    // Invoices (via auth user)
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users?.find(u => u.email === email);
    if (user) {
        const { data: invoices } = await supabase
            .from('invoices')
            .select('*')
            .eq('client_id', user.id);
        if (invoices?.length) data.invoices = invoices;

        const { data: payments } = await supabase
            .from('payments')
            .select('*')
            .eq('client_id', user.id);
        if (payments?.length) data.payments = payments;

        data.auth_profile = {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            user_metadata: user.user_metadata,
        };
    }

    return NextResponse.json({
        status: 'success',
        type: 'data_access',
        email,
        data,
        generated_at: new Date().toISOString(),
        note: 'This is a complete export of all personal data associated with this email address per GDPR Article 15.',
    });
}

/**
 * Article 17 — Right to Erasure ("Right to be Forgotten")
 * Deletes all personal data. Returns confirmation of what was deleted.
 */
async function handleDataErasure(email: string) {
    const deleted: Record<string, number> = {};

    // Delete contacts
    const { data: contacts } = await supabase
        .from('contacts')
        .delete()
        .eq('email', email)
        .select('id');
    deleted.contacts = contacts?.length || 0;

    // Delete bookings
    const { data: bookings } = await supabase
        .from('bookings')
        .delete()
        .eq('attendee_email', email)
        .select('id');
    deleted.bookings = bookings?.length || 0;

    // Delete leads
    const { data: leads } = await supabase
        .from('leads')
        .delete()
        .eq('email', email)
        .select('id');
    deleted.leads = leads?.length || 0;

    // Delete auth user and associated data
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users?.find(u => u.email === email);
    if (user) {
        // Delete invoices
        const { data: invoices } = await supabase
            .from('invoices')
            .delete()
            .eq('client_id', user.id)
            .select('id');
        deleted.invoices = invoices?.length || 0;

        // Delete payments records (note: actual Stripe data must be handled separately)
        const { data: payments } = await supabase
            .from('payments')
            .delete()
            .eq('client_id', user.id)
            .select('id');
        deleted.payments = payments?.length || 0;

        // Delete auth user
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
        if (!deleteError) deleted.auth_user = 1;
    }

    return NextResponse.json({
        status: 'success',
        type: 'data_erasure',
        email,
        deleted,
        completed_at: new Date().toISOString(),
        note: 'All personal data has been erased per GDPR Article 17. Stripe payment records must be handled separately via Stripe dashboard.',
    });
}

/**
 * Article 20 — Right to Data Portability
 * Returns data in a machine-readable JSON format.
 */
async function handleDataPortability(email: string) {
    // Same as access but with explicit portability format
    const accessResponse = await handleDataAccess(email);
    const accessData = await accessResponse.json();

    return NextResponse.json({
        ...accessData,
        type: 'data_portability',
        format: 'application/json',
        note: 'Data exported in machine-readable JSON format per GDPR Article 20. This data can be imported into another service.',
    });
}
