"use client";

import { useState } from "react";
import { scoreAllContacts } from "@/lib/crm/lead-scoring";

type Tab = "bookings" | "leads" | "contacts";

// Component props interfaces based on Supabase schema
export function AdminDashboard({
    initialBookings,
    initialLeads,
    initialContacts,
    interactions,
}: {
    initialBookings: any[];
    initialLeads: any[];
    initialContacts: any[];
    interactions: any[];
}) {
    const [activeTab, setActiveTab] = useState<Tab>("bookings");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Stats calculation
    const totalBookings = initialBookings.length;
    const totalLeads = initialLeads.length;
    const hotLeads = initialLeads.filter((l) => l.score > 60).length;
    const upcomingBookings = initialBookings.filter(
        (b) => new Date(b.start_time) > new Date() && b.status === "confirmed"
    ).length;

    const toggleExpand = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleRescoreAll = async () => {
        alert("Rescoring started in background.");
        await scoreAllContacts();
    };

    // Status Badges
    const getBookingStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
            cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
            rescheduled: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            no_show: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        };
        const color = colors[status] || colors.no_show;
        return <span className={`px-2 py-1 text-xs font-medium rounded-md border ${color}`}>{status}</span>;
    };

    const getQualBadge = (qual: string) => {
        const colors: Record<string, string> = {
            cold: "bg-gray-500/20 text-gray-400 border-gray-500/30",
            warm: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            hot: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            qualified: "bg-green-500/20 text-green-400 border-green-500/30",
            customer: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        };
        const color = colors[qual] || colors.cold;
        return <span className={`px-2 py-1 text-xs font-medium rounded-md border ${color}`}>{qual}</span>;
    };

    const getSourceBadge = (source: string) => {
        return <span className="px-2 py-1 text-xs font-medium rounded-md border bg-white/5 text-white/70 border-white/10">{source}</span>;
    };

    // Filtered Data
    const filteredBookings = initialBookings.filter((b) =>
        statusFilter === "all" ? true : b.status === statusFilter
    );

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white font-heading">
                    Quartermasters <span style={{ color: "#C15A2C" }}>Command Center</span>
                </h1>
                <p className="text-white/50 mt-2">Manage bookings, leads, and client CRM data.</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {[
                    { label: "Total Bookings", value: totalBookings },
                    { label: "Upcoming Bookings", value: upcomingBookings },
                    { label: "Total Leads", value: totalLeads },
                    { label: "Hot Leads", value: hotLeads },
                ].map((stat, i) => (
                    <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-sm font-medium text-white/50 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold" style={{ color: "#C15A2C" }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-white/10 mb-6 overflow-x-auto pb-px">
                {(["bookings", "leads", "contacts"] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap pb-4 text-sm font-medium transition-colors ${activeTab === tab
                            ? "text-white border-b-2"
                            : "text-white/50 hover:text-white/80 border-b-2 border-transparent"
                            }`}
                        style={activeTab === tab ? { borderColor: "#C15A2C" } : {}}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

                {/* BOOKINGS TAB */}
                {activeTab === "bookings" && (
                    <div>
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h2 className="text-white font-medium">Booking Pipeline</h2>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-slate-900 border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none focus:border-[#C15A2C]"
                            >
                                <option value="all">All Status</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="rescheduled">Rescheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no_show">No Show</option>
                            </select>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Attendee</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Event</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Date/Time</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredBookings.map((b) => (
                                        <div key={b.id} className="contents display-contents group">
                                            <tr
                                                onClick={() => toggleExpand(b.id)}
                                                className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-white">{b.attendee_name}</div>
                                                    <div className="text-sm text-white/50">{b.attendee_email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{b.cal_event_type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                                                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(b.start_time))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getBookingStatusBadge(b.status)}
                                                </td>
                                            </tr>
                                            {expandedRow === b.id && (
                                                <tr className="bg-white/[0.02]">
                                                    <td colSpan={4} className="px-6 py-4 text-sm text-white/70">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div><strong>Timezone:</strong> {b.attendee_timezone || 'N/A'}</div>
                                                            <div><strong>Notes:</strong> {b.notes || 'None provided'}</div>
                                                            <div><strong>Conversation ID:</strong> {b.conversation_id || 'N/A'}</div>
                                                            <div><strong>Service Interest:</strong> {b.service_interest || 'General'}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </div>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* LEADS TAB */}
                {activeTab === "leads" && (
                    <div>
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h2 className="text-white font-medium">Lead Intelligence</h2>
                            <button
                                onClick={handleRescoreAll}
                                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-opacity-90 flex items-center gap-2"
                                style={{ background: "#C15A2C", color: "white" }}
                            >
                                Rescore All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Qualification</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Interest</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {initialLeads.map((l) => (
                                        <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white">{l.contact?.name || 'Unknown'}</div>
                                                <div className="text-sm text-white/50">{l.contact?.email}</div>
                                                {l.contact?.company && <div className="text-xs text-[#C15A2C] mt-1">{l.contact.company}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-mono text-white/90 w-6">{l.score}</span>
                                                    <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${l.score > 60 ? 'bg-green-500' : l.score >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                            style={{ width: `${l.score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {getQualBadge(l.qualification || 'cold')}
                                                    <span className="text-xs text-white/40 ml-2">Urg: {l.urgency || 'low'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                                                {l.service_interest || 'Not Specified'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CONTACTS TAB */}
                {activeTab === "contacts" && (
                    <div>
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h2 className="text-white font-medium">CRM Directory</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Name/Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">Last Seen</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {initialContacts.map((c) => {
                                        const contactInteractions = interactions.filter(i => i.contact_id === c.id);
                                        return (
                                            <div key={c.id} className="contents display-contents group">
                                                <tr
                                                    onClick={() => toggleExpand(c.id)}
                                                    className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-white">{c.name || 'Anonymous'}</div>
                                                        <div className="text-sm text-white/50">{c.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                                                        {c.company || '—'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getSourceBadge(c.source || 'website')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                                                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(c.last_seen_at))}
                                                    </td>
                                                </tr>
                                                {expandedRow === c.id && (
                                                    <tr className="bg-white/[0.02]">
                                                        <td colSpan={4} className="px-6 py-4">
                                                            <h4 className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wider">Interaction History</h4>
                                                            {contactInteractions.length > 0 ? (
                                                                <ul className="space-y-3">
                                                                    {contactInteractions.map(interaction => (
                                                                        <li key={interaction.id} className="text-sm">
                                                                            <span className="text-white/40 mr-3">{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(interaction.created_at))}</span>
                                                                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/70 mr-2 uppercase tracking-wide">{interaction.type}</span>
                                                                            <span className="text-white/80">{interaction.summary}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-sm text-white/40 italic">No interactions logged yet.</p>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                            </div>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
