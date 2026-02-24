"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { ActivityTimeline } from "@/components/portal/ActivityTimeline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !id) return;

        const fetchProject = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .eq('client_id', user.id)
                .single();

            if (error || !data) {
                console.error("Project fetch error:", error);
                router.push("/portal/projects");
                return;
            }

            setProject(data);
            setLoading(false);
        };

        fetchProject();
    }, [user, id, router]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <Link href="/portal/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group mb-4">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
            </Link>

            <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10">
                    <div>
                        <span className="px-3 py-1 bg-[#C15A2C]/20 text-[#C15A2C] border border-[#C15A2C]/30 text-xs font-medium rounded-full uppercase tracking-widest mb-4 inline-block">
                            {project?.service_vertical || 'General Service'}
                        </span>
                        <h1 className="text-3xl font-bold text-white mb-2 font-heading">{project?.title}</h1>
                        <p className="text-white/60">Created on {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(project?.created_at))}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-white/40 uppercase tracking-widest mb-1">Current Status</p>
                        <p className="text-xl font-bold text-white uppercase">{project?.status}</p>
                    </div>
                </div>

                <div className="p-6 bg-[#001429]/50 rounded-2xl border border-white/5 mb-8">
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-3">Project Scope</h3>
                    <p className="text-white/80 leading-relaxed">
                        {project?.description || "This project is currently being scoped. Details will be populated here shortly."}
                    </p>
                </div>

                <div className="mt-12">
                    <h3 className="text-lg font-bold text-white mb-8 border-b border-white/10 pb-4">Execution Timeline</h3>
                    <ActivityTimeline
                        status={project?.status}
                        createdAt={project?.created_at}
                        updatedAt={project?.updated_at}
                    />
                </div>
            </div>
        </div>
    );
}
