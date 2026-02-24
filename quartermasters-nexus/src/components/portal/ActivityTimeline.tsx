"use client";

import { CheckCircle2, Circle, Clock, Rocket, ShieldCheck } from "lucide-react";

interface TimelineProps {
    status: string;
    createdAt: string;
    updatedAt: string;
}

export function ActivityTimeline({ status, createdAt, updatedAt }: TimelineProps) {
    const stages = [
        { id: "discovery", label: "Discovery & Planning", icon: Rocket },
        { id: "active", label: "Active Execution", icon: Clock },
        { id: "review", label: "Client Review", icon: ShieldCheck },
        { id: "completed", label: "Delivery & Sign-off", icon: CheckCircle2 },
    ];

    const currentStageIndex = stages.findIndex(s => s.id === status);
    const activeIndex = currentStageIndex === -1 ? 0 : currentStageIndex;

    return (
        <div className="relative border-l-2 border-white/10 ml-6 pl-8 py-4 space-y-12">
            {stages.map((stage, index) => {
                const isCompleted = index < activeIndex;
                const isCurrent = index === activeIndex;
                const isPending = index > activeIndex;

                return (
                    <div key={stage.id} className="relative group">
                        <div className={`absolute -left-[41px] top-1 p-1 rounded-full bg-[#001429] 
              ${isCompleted ? 'text-green-500' : isCurrent ? 'text-[#C15A2C]' : 'text-white/20'}`}
                        >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5 bg-[#001429]" />
                                : isCurrent ? <stage.icon className="w-5 h-5 animate-pulse bg-[#001429]" />
                                    : <Circle className="w-5 h-5 bg-[#001429]" />}
                        </div>

                        <div>
                            <h4 className={`text-lg font-bold mb-1 ${isCurrent ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/40'}`}>
                                {stage.label}
                            </h4>
                            <p className="text-sm text-white/50">
                                {isCurrent
                                    ? `In progress since ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(updatedAt))}`
                                    : isCompleted
                                        ? "Completed"
                                        : "Pending future phase"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
