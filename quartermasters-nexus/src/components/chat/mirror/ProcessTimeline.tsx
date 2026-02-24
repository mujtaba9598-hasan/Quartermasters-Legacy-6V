"use client";

import { motion } from "framer-motion";

const SERVICE_PROCESSES: Record<string, { step: string; desc: string }[]> = {
    "financial-advisory": [
        { step: "Discovery", desc: "Financial health assessment & goal alignment" },
        { step: "Analysis", desc: "Market research, risk modeling & opportunity mapping" },
        { step: "Strategy", desc: "Custom financial plan with actionable recommendations" },
        { step: "Implementation", desc: "Execute strategy with banking introductions & monitoring" },
    ],
    "human-capital": [
        { step: "Audit", desc: "Workforce analysis, compliance review & gap assessment" },
        { step: "Design", desc: "Policy frameworks, compensation structures & org design" },
        { step: "Recruit", desc: "Talent acquisition strategy & pipeline development" },
        { step: "Optimize", desc: "Performance systems, retention programs & L&D" },
    ],
    "management": [
        { step: "Diagnose", desc: "Operations audit, process mapping & bottleneck identification" },
        { step: "Strategize", desc: "Growth roadmap, market positioning & competitive analysis" },
        { step: "Transform", desc: "Change management, process redesign & system integration" },
        { step: "Sustain", desc: "KPI dashboards, quarterly reviews & continuous improvement" },
    ],
    "tech-rnd": [
        { step: "Research", desc: "Technology landscape analysis & innovation scouting" },
        { step: "Prototype", desc: "Proof of concept, feasibility study & architecture design" },
        { step: "Develop", desc: "Full implementation with agile methodology" },
        { step: "Scale", desc: "Deployment, optimization & knowledge transfer" },
    ],
    "event-logistics": [
        { step: "Brief", desc: "Event objectives, audience profiling & budget framework" },
        { step: "Plan", desc: "Venue selection, vendor coordination & logistics mapping" },
        { step: "Execute", desc: "On-ground management, live coordination & contingency" },
        { step: "Review", desc: "Post-event analytics, ROI report & feedback synthesis" },
    ],
    "it-services": [
        { step: "Assess", desc: "Technical requirements, stack evaluation & security audit" },
        { step: "Architect", desc: "System design, technology selection & infrastructure planning" },
        { step: "Build", desc: "Agile development, CI/CD pipeline & quality assurance" },
        { step: "Deploy", desc: "Launch, monitoring setup & maintenance handover" },
    ],
};

interface ProcessTimelineProps {
    service: string;
}

export function ProcessTimeline({ service }: ProcessTimelineProps) {
    const steps = SERVICE_PROCESSES[service];
    if (!steps) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-4 rounded-xl border border-white/10 overflow-hidden"
        >
            <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Engagement Process
                </p>
            </div>

            <div className="p-4">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#C15A2C] via-[#C15A2C]/40 to-transparent" />

                    <div className="space-y-4">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 relative"
                            >
                                {/* Node */}
                                <div className="relative z-10 mt-1 shrink-0">
                                    <div
                                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold"
                                        style={{
                                            background: `rgba(193, 90, 44, ${0.15 + i * 0.1})`,
                                            border: "1px solid rgba(193, 90, 44, 0.4)",
                                            color: "#C15A2C",
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white leading-tight">{s.step}</p>
                                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
