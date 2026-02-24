"use client";

import Link from "next/link";
import { ChevronRight, Clock, ShieldCheck, Zap } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string | null;
    status: string;
    service_vertical: string | null;
    updated_at: string;
}

export function ProjectCard({ project }: { project: Project }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "discovery": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
            case "active": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "review": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "archived": return "bg-red-500/20 text-red-400 border-red-500/30";
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getVerticalIcon = (vertical: string) => {
        if (vertical?.toLowerCase().includes("cyber")) return <ShieldCheck className="w-5 h-5 text-[#C15A2C]" />;
        if (vertical?.toLowerCase().includes("tech")) return <Zap className="w-5 h-5 text-blue-400" />;
        return <Clock className="w-5 h-5 text-white/50" />;
    };

    return (
        <Link
            href={`/portal/projects/${project.id}`}
            className="block group h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 bg-[#001429] rounded-lg border border-white/5 shadow-inner">
                    {getVerticalIcon(project.service_vertical || "general")}
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-md border uppercase tracking-wider ${getStatusColor(project.status)}`}>
                    {project.status}
                </span>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C15A2C] transition-colors">{project.title}</h3>
                <p className="text-sm text-white/50 mb-6 line-clamp-2">
                    {project.description || "No description provided."}
                </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                <div className="text-xs text-white/40 font-medium">
                    Updated {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(project.updated_at))}
                </div>
                <div className="text-[#C15A2C] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transform duration-300">
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    );
}
