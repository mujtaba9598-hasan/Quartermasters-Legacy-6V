import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createInvoice, getClientInvoices, markInvoiceSent } from "@/lib/invoices/invoice-service";

export const dynamic = "force-dynamic";

// GET /api/invoices?clientId=xxx — list invoices for a client
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get("clientId");

        if (!clientId) {
            return NextResponse.json({ error: "clientId is required" }, { status: 400 });
        }

        const { data, error } = await getClientInvoices(clientId);
        if (error) throw error;

        return NextResponse.json({ invoices: data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/invoices — create a new invoice
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clientId, projectId, service, tier, currency, taxRate, notes, dueDays } = body;

        if (!clientId || !service || !tier) {
            return NextResponse.json(
                { error: "clientId, service, and tier are required" },
                { status: 400 }
            );
        }

        const { invoice, error } = await createInvoice({
            clientId,
            projectId,
            service,
            tier,
            currency,
            taxRate,
            notes,
            dueDays,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ invoice }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH /api/invoices — update invoice status (send, cancel)
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { invoiceId, action } = body;

        if (!invoiceId || !action) {
            return NextResponse.json(
                { error: "invoiceId and action are required" },
                { status: 400 }
            );
        }

        if (action === "send") {
            const { error } = await markInvoiceSent(invoiceId);
            if (error) throw error;
            return NextResponse.json({ success: true, message: "Invoice marked as sent" });
        }

        if (action === "cancel") {
            const { error } = await supabase
                .from("invoices")
                .update({ status: "cancelled", updated_at: new Date().toISOString() })
                .eq("id", invoiceId);
            if (error) throw error;
            return NextResponse.json({ success: true, message: "Invoice cancelled" });
        }

        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
