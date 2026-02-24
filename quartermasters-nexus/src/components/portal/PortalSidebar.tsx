"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Settings, LogOut, Receipt } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export function PortalSidebar() {
    const pathname = usePathname();
    const { signOut, user } = useAuth();

    const navItems = [
        { label: "Overview", href: "/portal", icon: LayoutDashboard },
        { label: "Projects", href: "/portal/projects", icon: Briefcase },
        { label: "Documents", href: "/portal/documents", icon: FileText },
        { label: "Invoices", href: "/portal/invoices", icon: Receipt },
        { label: "Messages", href: "/portal/messages", icon: MessageSquare },
        { label: "Settings", href: "/portal/settings", icon: Settings },
    ];

    return (
        <div className="w-64 flex flex-col h-full bg-[#002147]/60 backdrop-blur-xl border-r border-white/10">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white tracking-wide">
                    Quartermasters
                </h2>
                <p className="text-[#C15A2C] text-sm font-medium tracking-widest mt-1 uppercase">
                    Client Portal
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-[#C15A2C] text-white font-medium shadow-lg shadow-[#C15A2C]/20"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/40"}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="mb-4 px-4">
                    <p className="text-sm font-medium text-white truncate">{user?.user_metadata?.full_name || "Client"}</p>
                    <p className="text-xs text-white/40 truncate">{user?.email}</p>
                </div>
                <button
                    onClick={signOut}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
