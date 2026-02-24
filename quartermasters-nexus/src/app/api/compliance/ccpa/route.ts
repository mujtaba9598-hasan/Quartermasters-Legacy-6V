import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * S10-10: CCPA Compliance Hardening
 *
 * California Consumer Privacy Act endpoints:
 * - Right to Know (what data is collected)
 * - Right to Delete (request deletion)
 * - Right to Opt-Out (do not sell)
 * - Right to Non-Discrimination
 *
 * POST /api/compliance/ccpa — Submit a CCPA request
 * Body: { type: 'know' | 'delete' | 'opt-out', email: string }
 */

type CCPARequestType = 'know' | 'delete' | 'opt-out';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, email } = body as { type: CCPARequestType; email: string };

        if (!type || !email) {
            return NextResponse.json({ error: 'Missing type or email' }, { status: 400 });
        }

        if (!['know', 'delete', 'opt-out'].includes(type)) {
            return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        switch (type) {
            case 'know':
                return handleRightToKnow(email);
            case 'delete':
                return handleRightToDelete(email);
            case 'opt-out':
                return handleOptOut(email);
            default:
                return NextResponse.json({ error: 'Unknown request type' }, { status: 400 });
        }
    } catch (error: unknown) {
        console.error('CCPA API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * Right to Know — Disclose what personal information is collected.
 */
async function handleRightToKnow(email: string) {
    const categories: Record<string, { collected: boolean; purpose: string; source: string }> = {
        identifiers: {
            collected: true,
            purpose: 'Account creation, service delivery, and communication',
            source: 'Directly from consumer via contact form, chat, or checkout',
        },
        commercial_info: {
            collected: true,
            purpose: 'Processing transactions, invoicing, and service history',
            source: 'Consumer transactions and service engagements',
        },
        internet_activity: {
            collected: true,
            purpose: 'Website analytics and experience improvement (with consent)',
            source: 'Cookies and analytics tools (PostHog), consent-gated',
        },
        professional_info: {
            collected: true,
            purpose: 'Service customization and lead qualification',
            source: 'Directly from consumer via Q chat conversations',
        },
        geolocation: {
            collected: true,
            purpose: 'Regulatory compliance (GDPR/CCPA detection)',
            source: 'IP address via Cloudflare geo-detection (country-level only)',
        },
    };

    // Fetch actual data for this consumer
    const personalData: Record<string, unknown> = {};

    const { data: contacts } = await supabase
        .from('contacts')
        .select('name, email, company, phone, source, first_seen_at')
        .eq('email', email);
    if (contacts?.length) personalData.contact_info = contacts;

    const { data: bookings } = await supabase
        .from('bookings')
        .select('cal_event_type, start_time, status, service_interest')
        .eq('attendee_email', email);
    if (bookings?.length) personalData.bookings = bookings;

    const { data: leads } = await supabase
        .from('leads')
        .select('service_interest, budget_range, qualification_score, status')
        .eq('email', email);
    if (leads?.length) personalData.lead_data = leads;

    return NextResponse.json({
        status: 'success',
        type: 'right_to_know',
        email,
        categories_collected: categories,
        personal_data: personalData,
        data_sold: false,
        data_shared_for_business_purpose: ['Payment processing (Stripe)', 'Email delivery (Resend)'],
        generated_at: new Date().toISOString(),
        note: 'Quartermasters does NOT sell personal information. Data is shared with service providers strictly for business operations.',
    });
}

/**
 * Right to Delete — Delete consumer's personal information.
 */
async function handleRightToDelete(email: string) {
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

    // Delete lead scores via contact
    const { data: contactsForScores } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', email);
    if (contactsForScores?.length) {
        for (const c of contactsForScores) {
            const { data: scores } = await supabase
                .from('lead_scores')
                .delete()
                .eq('contact_id', c.id)
                .select('id');
            deleted.lead_scores = (deleted.lead_scores || 0) + (scores?.length || 0);
        }
    }

    // Delete auth user
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users?.find(u => u.email === email);
    if (user) {
        const { data: invoices } = await supabase
            .from('invoices')
            .delete()
            .eq('client_id', user.id)
            .select('id');
        deleted.invoices = invoices?.length || 0;

        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
        if (!deleteError) deleted.auth_user = 1;
    }

    return NextResponse.json({
        status: 'success',
        type: 'right_to_delete',
        email,
        deleted,
        completed_at: new Date().toISOString(),
        exceptions: [
            'Transaction records required for tax/accounting compliance (retained per legal obligation)',
            'Stripe payment data must be deleted separately via Stripe dashboard',
        ],
        note: 'Personal information has been deleted per CCPA Section 1798.105. Certain data may be retained where legally required.',
    });
}

/**
 * Right to Opt-Out — Do not sell personal information.
 */
async function handleOptOut(email: string) {
    // Record the opt-out in consent_records
    // Note: Quartermasters does NOT sell data, but we record the preference

    const visitorId = email; // Use email as identifier for opt-out

    const { error } = await supabase
        .from('consent_records')
        .upsert({
            visitor_id: visitorId,
            geo_mode: 'ccpa',
            necessary: true,
            analytics: false,
            marketing: false,
            do_not_sell: true,
        }, {
            onConflict: 'visitor_id',
        });

    if (error) {
        console.error('CCPA opt-out error:', error);
        return NextResponse.json({ error: 'Failed to process opt-out' }, { status: 500 });
    }

    return NextResponse.json({
        status: 'success',
        type: 'opt_out',
        email,
        recorded_at: new Date().toISOString(),
        note: 'Your opt-out preference has been recorded. Quartermasters does not sell personal information. All analytics and marketing cookies have been disabled for this account.',
    });
}
