import React from 'react';
import { ServiceTheme } from '@/hooks/useConversationContext';

// --- CSS Keyframes (Global via styled-jsx or plain CSS. For speed, we'll inline some and rely on Tailwind where possible) ---

// Financial Advisory Theme
export const FinancialAdvisoryTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#002147]/90" />
        {/* Upward data streams */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmYmQzOSIvPjwvc3ZnPg==')] animate-[slideUp_20s_linear_infinite]" />
        {/* Subtle gold accent pulse */}
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
    </div>
);

// Human Capital Theme
export const HumanCapitalTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1005]/90 to-[#0a0f1a]/80" />
        {/* Network constellation placeholder using repeating radial gradient */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(193,90,44,0.4)_1px,transparent_1px)] bg-[length:40px_40px] animate-[pulse_4s_ease-in-out_infinite]" />
        {/* Warm amber bloom */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C15A2C]/10 rounded-full blur-[150px] animate-[pulse_6s_ease-in-out_infinite]" />
    </div>
);

// Management Theme
export const ManagementTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-slate-950/90" />
        {/* Structured Grid lines */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-400/5 rounded-full blur-[100px]" />
    </div>
);

// Tech R&D Theme
export const TechRnDTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-[#020813]/90" />
        {/* Circuit/Matrix feel */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,200,0.3)_25%,rgba(0,255,200,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,200,0.3)_75%,rgba(0,255,200,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,200,0.3)_25%,rgba(0,255,200,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,200,0.3)_75%,rgba(0,255,200,0.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        {/* Cyan glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-[pulse_5s_ease-in-out_infinite]" />
    </div>
);

// Event Logistics Theme
export const EventLogisticsTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0514]/90 to-[#0a0f1a]/95" />
        {/* Stage spotlights effect */}
        <div className="absolute -top-[20%] left-[20%] w-[30%] h-[150%] bg-gradient-to-b from-white/10 to-transparent transform rotate-[-15deg] blur-[40px] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute -top-[20%] right-[20%] w-[30%] h-[150%] bg-gradient-to-b from-white/10 to-transparent transform rotate-[15deg] blur-[40px] animate-[pulse_5s_ease-in-out_infinite_animation-delay-2s]" />
    </div>
);

// IT Services Theme
export const ITServicesTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-[#05110f]/90" />
        {/* Hexagonal Mesh or terminal rivers (using simple dash array representation via css bg) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 1px, transparent 50%)', backgroundSize: '20px 20px' }} />
        {/* Emerald Glow */}
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
    </div>
);

// Theme Mapper
export const ThemeRenderer = ({ theme }: { theme: ServiceTheme }) => {
    switch (theme) {
        case 'financial-advisory': return <FinancialAdvisoryTheme />;
        case 'human-capital': return <HumanCapitalTheme />;
        case 'management': return <ManagementTheme />;
        case 'tech-rnd': return <TechRnDTheme />;
        case 'event-logistics': return <EventLogisticsTheme />;
        case 'it-services': return <ITServicesTheme />;
        case 'idle':
        default:
            return null; // Let SilkBackground show underneath
    }
};

export const GlobalThemeStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUp {
            0% { background-position: 0 100vh; }
            100% { background-position: 0 -100vh; }
        }
        .fade-in {
            animation: fadeInTheme 1.5s ease forwards;
        }
        @keyframes fadeInTheme {
            from { opacity: 0; }
            to { opacity: 0.15; } /* Max opacity constraint */
        }
    `}} />
);
