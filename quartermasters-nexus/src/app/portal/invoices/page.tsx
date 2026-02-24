"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { motion } from "framer-motion";

type Invoice = {
    id: string;
    invoice_number: string;
    service: string;
    tier: string;
    amount: number;
    currency: string;
    tax_amount: number;
    total_amount: number;
    status: string;
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

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
    draft: { bg: "bg-gray-500/20", text: "text-gray-400" },
    sent: { bg: "bg-blue-500/20", text: "text-blue-400" },
    paid: { bg: "bg-green-500/20", text: "text-green-400" },
    overdue: { bg: "bg-red-500/20", text: "text-red-400" },
    cancelled: { bg: "bg-gray-500/20", text: "text-gray-500" },
};

export default function InvoicesPage() {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        if (!user) return;
        fetchInvoices();
    }, [user]);

    async function fetchInvoices() {
        try {
            const res = await fetch(`/api/invoices?clientId=${user!.id}`);
            const data = await res.json();
            if (data.invoices) setInvoices(data.invoices);
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    }

    function fmt(amount: number, currency: string) {
        const sym = CURRENCY_SYMBOLS[currency] || currency + " ";
        return `${sym}${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    }

    const filtered = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

    const totalOutstanding = invoices
        .filter((i) => i.status === "sent" || i.status === "overdue")
        .reduce((sum, i) => sum + i.total_amount, 0);

    const totalPaid = invoices
        .filter((i) => i.status === "paid")
        .reduce((sum, i) => sum + i.total_amount, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Invoices</h1>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total Invoices</p>
                    <p className="text-2xl font-bold text-white mt-1">{invoices.length}</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Outstanding</p>
                    <p className="text-2xl font-bold text-[#C15A2C] mt-1">{fmt(totalOutstanding, "USD")}</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total Paid</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">{fmt(totalPaid, "USD")}</p>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap">
                {["all", "draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            filter === s
                                ? "bg-[#C15A2C] text-white"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            {/* Invoice List */}
            {loading ? (
                <div className="text-center py-12 text-gray-400">Loading invoices...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No invoices found.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((inv, idx) => {
                        const style = STATUS_STYLES[inv.status] || STATUS_STYLES.draft;
                        const serviceLabel = inv.service
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ");

                        return (
                            <motion.div
                                key={inv.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#C15A2C]/30 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-mono text-[#C15A2C]">
                                                {inv.invoice_number}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                                            >
                                                {inv.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-white font-medium">{serviceLabel} — {inv.tier.charAt(0).toUpperCase() + inv.tier.slice(1)}</p>
                                        <p className="text-xs text-gray-400">
                                            Issued {new Date(inv.issued_at).toLocaleDateString()} &bull; Due{" "}
                                            {new Date(inv.due_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-white">
                                            {fmt(inv.total_amount, inv.currency)}
                                        </p>
                                        {inv.tax_amount > 0 && (
                                            <p className="text-xs text-gray-400">
                                                incl. tax {fmt(inv.tax_amount, inv.currency)}
                                            </p>
                                        )}
                                        <a
                                            href={`/api/invoices/${inv.id}?format=html`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#C15A2C] hover:underline mt-1 inline-block"
                                        >
                                            View Invoice
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
