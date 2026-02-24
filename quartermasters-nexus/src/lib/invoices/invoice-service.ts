import { supabase } from "@/lib/supabase";
import { getPackageDetails } from "@/lib/pricing/packages";

export type InvoiceLineItem = {
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
};

export type InvoiceData = {
    id: string;
    invoice_number: string;
    client_id: string;
    client_name: string;
    client_email: string;
    client_company: string | null;
    service: string;
    tier: string;
    amount: number;
    currency: string;
    tax_rate: number;
    tax_amount: number;
    total_amount: number;
    line_items: InvoiceLineItem[];
    status: string;
    notes: string | null;
    issued_at: string;
    due_at: string;
    paid_at: string | null;
};

const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$",
    EUR: "\u20AC",
    GBP: "\u00A3",
    SGD: "S$",

};

/**
 * Generate a unique invoice number: QM-YYYY-NNNNN
 */
async function generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `QM-${year}-`;

    const { count } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true })
        .like("invoice_number", `${prefix}%`);

    const seq = String((count || 0) + 1).padStart(5, "0");
    return `${prefix}${seq}`;
}

/**
 * Create a new invoice for a client
 */
export async function createInvoice(params: {
    clientId: string;
    projectId?: string;
    service: string;
    tier: string;
    currency?: string;
    taxRate?: number;
    notes?: string;
    dueDays?: number;
}): Promise<{ invoice: any; error: string | null }> {
    const {
        clientId,
        projectId,
        service,
        tier,
        currency = "USD",
        taxRate = 0,
        notes,
        dueDays = 30,
    } = params;

    const pkg = getPackageDetails(service, tier);
    if (!pkg) {
        return { invoice: null, error: `Package not found: ${service}/${tier}` };
    }

    const invoiceNumber = await generateInvoiceNumber();
    const amount = pkg.basePrice;
    const taxAmount = Math.round(amount * (taxRate / 100) * 100) / 100;
    const totalAmount = amount + taxAmount;

    const lineItems: InvoiceLineItem[] = [
        {
            description: `${pkg.description} (${pkg.timeline})`,
            quantity: 1,
            unit_price: amount,
            amount: amount,
        },
    ];

    // Add individual deliverables as sub-items
    for (const d of pkg.deliverables) {
        lineItems.push({
            description: `  \u2022 ${d}`,
            quantity: 1,
            unit_price: 0,
            amount: 0,
        });
    }

    const now = new Date();
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + dueDays);

    const { data, error } = await supabase
        .from("invoices")
        .insert({
            client_id: clientId,
            project_id: projectId || null,
            invoice_number: invoiceNumber,
            amount,
            currency,
            status: "draft",
            service,
            tier,
            line_items: lineItems,
            tax_rate: taxRate,
            tax_amount: taxAmount,
            total_amount: totalAmount,
            notes: notes || null,
            issued_at: now.toISOString(),
            due_at: dueDate.toISOString(),
        })
        .select()
        .single();

    if (error) {
        return { invoice: null, error: error.message };
    }

    return { invoice: data, error: null };
}

/**
 * Mark invoice as sent
 */
export async function markInvoiceSent(invoiceId: string) {
    return supabase
        .from("invoices")
        .update({ status: "sent", updated_at: new Date().toISOString() })
        .eq("id", invoiceId);
}

/**
 * Mark invoice as paid (linked to Stripe payment)
 */
export async function markInvoicePaid(invoiceId: string, stripePaymentId?: string) {
    return supabase
        .from("invoices")
        .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            stripe_payment_id: stripePaymentId || null,
            updated_at: new Date().toISOString(),
        })
        .eq("id", invoiceId);
}

/**
 * Get all invoices for a client
 */
export async function getClientInvoices(clientId: string) {
    return supabase
        .from("invoices")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
}

/**
 * Get single invoice by ID
 */
export async function getInvoiceById(invoiceId: string) {
    return supabase.from("invoices").select("*").eq("id", invoiceId).single();
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string): string {
    const symbol = CURRENCY_SYMBOLS[currency] || currency + " ";
    return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Generate branded HTML invoice for PDF rendering or email
 */
export function generateInvoiceHtml(invoice: InvoiceData): string {
    const symbol = CURRENCY_SYMBOLS[invoice.currency] || invoice.currency + " ";
    const fmt = (n: number) => `${symbol}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const serviceLabel = invoice.service
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    const tierLabel = invoice.tier.charAt(0).toUpperCase() + invoice.tier.slice(1);

    const lineItemRows = invoice.line_items
        .map((item) => {
            if (item.amount === 0) {
                return `<tr><td colspan="4" style="padding:4px 12px;color:#94a3b8;font-size:13px;">${item.description}</td></tr>`;
            }
            return `<tr>
                <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;">${item.description}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;text-align:center;">${item.quantity}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;text-align:right;">${fmt(item.unit_price)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;text-align:right;">${fmt(item.amount)}</td>
            </tr>`;
        })
        .join("");

    const statusColor =
        invoice.status === "paid" ? "#22c55e" : invoice.status === "overdue" ? "#ef4444" : "#C15A2C";

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Invoice ${invoice.invoice_number}</title></head>
<body style="margin:0;padding:0;background:#0a1628;font-family:'Segoe UI',system-ui,sans-serif;color:#e2e8f0;">
<div style="max-width:800px;margin:40px auto;background:#002147;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#001a3a,#002147);padding:40px;border-bottom:2px solid #C15A2C;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <h1 style="margin:0;font-size:28px;color:#C15A2C;letter-spacing:2px;">QUARTERMASTERS</h1>
                    <p style="margin:4px 0 0;font-size:12px;color:#64748b;letter-spacing:1px;">Management &amp; Technology Consultancy</p>
                    <p style="margin:2px 0 0;font-size:11px;color:#475569;">California, United States</p>
                </td>
                <td style="text-align:right;vertical-align:top;">
                    <h2 style="margin:0;font-size:36px;color:#e2e8f0;font-weight:300;">INVOICE</h2>
                    <p style="margin:8px 0 0;font-size:14px;color:#94a3b8;">${invoice.invoice_number}</p>
                    <span style="display:inline-block;margin-top:8px;padding:4px 12px;border-radius:12px;background:${statusColor}22;color:${statusColor};font-size:12px;font-weight:600;text-transform:uppercase;">${invoice.status}</span>
                </td>
            </tr>
        </table>
    </div>

    <!-- Client + Dates -->
    <div style="padding:30px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Bill To</p>
                    <p style="margin:8px 0 0;font-size:16px;font-weight:600;color:#e2e8f0;">${invoice.client_name}</p>
                    ${invoice.client_company ? `<p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">${invoice.client_company}</p>` : ""}
                    <p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">${invoice.client_email}</p>
                </td>
                <td style="text-align:right;vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Service</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#C15A2C;font-weight:600;">${serviceLabel}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#94a3b8;">${tierLabel} Package</p>
                    <p style="margin:16px 0 0;font-size:11px;color:#64748b;">Issued: ${new Date(invoice.issued_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                    <p style="margin:2px 0 0;font-size:11px;color:#64748b;">Due: ${new Date(invoice.due_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </td>
            </tr>
        </table>
    </div>

    <!-- Line Items -->
    <div style="padding:0 40px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <thead>
                <tr style="background:#001a3a;">
                    <th style="padding:10px 12px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #C15A2C;">Description</th>
                    <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #C15A2C;">Qty</th>
                    <th style="padding:10px 12px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #C15A2C;">Unit Price</th>
                    <th style="padding:10px 12px;text-align:right;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #C15A2C;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${lineItemRows}
            </tbody>
        </table>

        <!-- Totals -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr>
                <td></td>
                <td style="width:200px;text-align:right;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding:6px 0;color:#94a3b8;font-size:14px;">Subtotal</td>
                            <td style="padding:6px 0;text-align:right;color:#e2e8f0;font-size:14px;">${fmt(invoice.amount)}</td>
                        </tr>
                        ${invoice.tax_rate > 0 ? `
                        <tr>
                            <td style="padding:6px 0;color:#94a3b8;font-size:14px;">Tax (${invoice.tax_rate}%)</td>
                            <td style="padding:6px 0;text-align:right;color:#e2e8f0;font-size:14px;">${fmt(invoice.tax_amount)}</td>
                        </tr>` : ""}
                        <tr>
                            <td style="padding:12px 0 6px;color:#C15A2C;font-size:18px;font-weight:700;border-top:2px solid #C15A2C;">Total</td>
                            <td style="padding:12px 0 6px;text-align:right;color:#C15A2C;font-size:18px;font-weight:700;border-top:2px solid #C15A2C;">${fmt(invoice.total_amount)}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    ${invoice.notes ? `
    <div style="padding:0 40px 30px;">
        <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Notes</p>
        <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">${invoice.notes}</p>
    </div>` : ""}

    <!-- Footer -->
    <div style="background:#001a3a;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:11px;color:#475569;">Quartermasters &bull; California, USA &bull; ceocli@quartermasters.me</p>
        <p style="margin:4px 0 0;font-size:10px;color:#334155;">Payment terms: Net ${invoice.due_at ? Math.ceil((new Date(invoice.due_at).getTime() - new Date(invoice.issued_at).getTime()) / 86400000) : 30} days. Late payments may incur a 1.5% monthly service charge.</p>
    </div>

</div>
</body>
</html>`;
}
