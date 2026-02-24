"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { ProjectCard } from "@/components/portal/ProjectCard";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', user.id)
                .order('updated_at', { ascending: false });

            if (data) setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, [user]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 font-heading">
                        Your Projects
                    </h1>
                    <p className="text-white/60">Track progress, deliverables, and upcoming milestones.</p>
                </div>
                <button className="px-5 py-2.5 bg-[#C15A2C] hover:bg-[#C15A2C]/90 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Request New Service
                </button>
            </div>

            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 backdrop-blur-xl bg-white/5 border border-dashed border-white/20 rounded-3xl">
                    <div className="w-16 h-16 bg-white/5 mx-auto rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No Active Projects</h3>
                    <p className="text-white/50 max-w-sm mx-auto">
                        You don't have any active engagements with Quartermasters at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}
