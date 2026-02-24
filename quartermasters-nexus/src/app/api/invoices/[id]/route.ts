import { NextResponse } from "next/server";
import { getInvoiceById, generateInvoiceHtml } from "@/lib/invoices/invoice-service";
import type { InvoiceData } from "@/lib/invoices/invoice-service";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/invoices/[id] — get invoice detail or HTML render
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const format = searchParams.get("format");

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
        }

        const { data: invoice, error } = await getInvoiceById(id);
        if (error || !invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        // Fetch client info for the HTML template
        if (format === "html") {
            const { data: userData } = await supabase.auth.admin.getUserById(invoice.client_id);
            const user = userData?.user;

            const invoiceData: InvoiceData = {
                id: invoice.id,
                invoice_number: invoice.invoice_number,
                client_id: invoice.client_id,
                client_name: user?.user_metadata?.name || user?.email || "Client",
                client_email: user?.email || "",
                client_company: user?.user_metadata?.company || null,
                service: invoice.service,
                tier: invoice.tier,
                amount: invoice.amount,
                currency: invoice.currency,
                tax_rate: invoice.tax_rate,
                tax_amount: invoice.tax_amount,
                total_amount: invoice.total_amount,
                line_items: invoice.line_items as any,
                status: invoice.status,
                notes: invoice.notes,
                issued_at: invoice.issued_at,
                due_at: invoice.due_at,
                paid_at: invoice.paid_at,
            };

            const html = generateInvoiceHtml(invoiceData);
            return new Response(html, {
                headers: { "Content-Type": "text/html; charset=utf-8" },
            });
        }

        return NextResponse.json({ invoice });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
