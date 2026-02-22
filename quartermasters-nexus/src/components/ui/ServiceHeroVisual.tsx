"use client";

import React from "react";
import "./ServiceHeroVisual.css";

interface ServiceHeroVisualProps {
    type: "financial" | "management" | "tech" | "hr" | "events" | "it";
    accent: string;
}

export default function ServiceHeroVisual({ type, accent }: ServiceHeroVisualProps) {
    switch (type) {
        case "financial":
            return <FinancialHero accent={accent} />;
        case "management":
            return <ManagementHero accent={accent} />;
        case "tech":
            return <TechHero accent={accent} />;
        case "hr":
            return <HRHero accent={accent} />;
        case "events":
            return <EventsHero accent={accent} />;
        case "it":
            return <ITHero accent={accent} />;
        default:
            return null;
    }
}

// 1. FINANCIAL: The Vault
function FinancialHero({ accent }: { accent: string }) {
    const cx = 200;
    const cy = 130;

    const candlesticks = [
        { x: 60, h: 40, delay: 0 },
        { x: 100, h: 25, delay: 0.1 },
        { x: 140, h: 55, delay: 0.2 },
        { x: 180, h: 35, delay: 0.3 },
        { x: 220, h: 60, delay: 0.4 },
        { x: 260, h: 30, delay: 0.5 },
        { x: 300, h: 45, delay: 0.6 },
        { x: 340, h: 50, delay: 0.7 },
    ];

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fin-beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Floating Currency */}
                {[80, 160, 240, 320].map((x, i) => (
                    <text
                        key={`currency-${i}`}
                        x={x}
                        y={200}
                        fontSize="10"
                        fill={accent}
                        style={{
                            animation: `shv-float-up 6s infinite linear ${i * 1.5}s`,
                            opacity: 0,
                        }}
                    >
                        $
                    </text>
                ))}

                {/* Lighthouse Beam */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-beam-rotate">
                    <path
                        d={`M${cx},${cy} L${cx - 40},${cy + 150} L${cx + 40},${cy + 150} Z`}
                        fill="url(#fin-beam-grad)"
                    />
                </g>

                {/* Outer Ring (30s CW) */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-rotate-cw-30s">
                    <circle cx={cx} cy={cy} r="90" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 8" />
                </g>

                {/* Middle Ring (18s CCW) */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-rotate-ccw-18s">
                    <circle cx={cx} cy={cy} r="65" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
                    {Array.from({ length: 12 }).map((_, i) => (
                        <rect
                            key={`m-tick-${i}`}
                            x={cx - 2}
                            y={cy - 65 - 4}
                            width="4"
                            height="8"
                            fill={accent}
                            transform={`rotate(${i * 30} ${cx} ${cy})`}
                        />
                    ))}
                </g>

                {/* Inner Ring (12s CW) */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-rotate-cw-12s">
                    <circle cx={cx} cy={cy} r="40" fill="none" stroke={accent} strokeWidth="2" />
                    {Array.from({ length: 8 }).map((_, i) => (
                        <rect
                            key={`i-tick-${i}`}
                            x={cx - 1}
                            y={cy - 40 - 3}
                            width="2"
                            height="6"
                            fill={accent}
                            transform={`rotate(${i * 45} ${cx} ${cy})`}
                        />
                    ))}
                </g>

                {/* Central Keyhole */}
                <g className="shv-pulse-glow">
                    <circle cx={cx} cy={cy - 2} r="12" fill={accent} />
                    <rect x={cx - 10} y={cy + 2} width="20" height="15" fill={accent} rx="2" />
                </g>

                {/* Candlestick Chart */}
                <g>
                    {candlesticks.map((c, i) => {
                        const isBullish = i % 2 === 0;
                        const itemAccent = isBullish ? accent : accent;
                        const op = isBullish ? 1 : 0.4;
                        const yOffset = 280 - c.h;
                        return (
                            <g key={`candle-${i}`} style={{ animation: `shv-slide-up 1s ease-out forwards ${c.delay}s`, opacity: 0 }}>
                                {/* Wick */}
                                <line x1={c.x} y1={yOffset - 10} x2={c.x} y2={280} stroke={itemAccent} strokeOpacity={op} strokeWidth="1" />
                                {/* Body */}
                                <rect x={c.x - 4} y={yOffset} width="8" height={c.h - 10} fill={itemAccent} fillOpacity={op} rx="1" />
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}

// 2. MANAGEMENT: The Helm
function ManagementHero({ accent }: { accent: string }) {
    const cx = 200;
    const cy = 120;

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Strategic Quadrant (Background) */}
                <g stroke={accent} strokeOpacity="0.05" strokeWidth="1">
                    <line x1={cx} y1="0" x2={cx} y2="300" />
                    <line x1="0" y1={cy} x2="400" y2={cy} />
                </g>
                <g fontSize="8" fill={accent} fillOpacity="0.08" fontFamily="sans-serif">
                    <text x={cx + 20} y={cy - 20}>Growth</text>
                    <text x={cx - 50} y={cy - 20}>Defend</text>
                    <text x={cx - 50} y={cy + 30}>Harvest</text>
                    <text x={cx + 20} y={cy + 30}>Innovate</text>
                </g>

                {/* Ship's Wheel */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-wheel-rotate">
                    <circle cx={cx} cy={cy} r="60" fill="none" stroke={accent} strokeWidth="2" />
                    <circle cx={cx} cy={cy} r="20" fill="none" stroke={accent} strokeWidth="1.5" />
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={`spoke-${i}`} transform={`rotate(${i * 45} ${cx} ${cy})`}>
                            <line x1={cx} y1={cy - 20} x2={cx} y2={cy - 60} stroke={accent} strokeWidth="1.5" />
                            <circle cx={cx} cy={cy - 60} r="4" fill={accent} />
                        </g>
                    ))}
                </g>

                {/* Compass Rose Center */}
                <g>
                    <polygon points={`${cx},${cy - 12} ${cx + 4},${cy} ${cx},${cy + 12} ${cx - 4},${cy}`} fill="none" stroke={accent} strokeWidth="1" />
                    <text x={cx - 3} y={cy - 25} fontSize="8" fill={accent} fillOpacity="0.5">N</text>
                    <text x={cx - 3} y={cy + 30} fontSize="8" fill={accent} fillOpacity="0.5">S</text>
                    <text x={cx + 25} y={cy + 3} fontSize="8" fill={accent} fillOpacity="0.5">E</text>
                    <text x={cx - 32} y={cy + 3} fontSize="8" fill={accent} fillOpacity="0.5">W</text>
                </g>

                {/* Org Chart Tree */}
                <g>
                    {/* Edges */}
                    <g stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" className="shv-march">
                        {/* L1 -> L2 */}
                        <line x1="200" y1="210" x2="140" y2="245" />
                        <line x1="200" y1="210" x2="260" y2="245" />
                        {/* L2 -> L3 */}
                        <line x1="140" y1="245" x2="110" y2="275" />
                        <line x1="140" y1="245" x2="170" y2="275" />
                        <line x1="260" y1="245" x2="230" y2="275" />
                        <line x1="260" y1="245" x2="290" y2="275" />
                    </g>
                    {/* Nodes */}
                    {/* L1 */}
                    <circle cx="200" cy="210" r="8" fill={accent} />
                    {/* L2 */}
                    <circle cx="140" cy="245" r="6" fill={accent} fillOpacity="0.8" />
                    <circle cx="260" cy="245" r="6" fill={accent} fillOpacity="0.8" />
                    {/* L3 */}
                    <circle cx="110" cy="275" r="4" fill={accent} fillOpacity="0.6" />
                    <circle cx="170" cy="275" r="4" fill={accent} fillOpacity="0.6" />
                    <circle cx="230" cy="275" r="4" fill={accent} fillOpacity="0.6" />
                    <circle cx="290" cy="275" r="4" fill={accent} fillOpacity="0.6" />
                </g>

            </svg>
        </div>
    );
}

// 3. TECHNOLOGY: The Observatory
function TechHero({ accent }: { accent: string }) {
    const stars = [
        { id: 0, x: 80, y: 60 }, { id: 1, x: 150, y: 40 }, { id: 2, x: 250, y: 50 }, { id: 3, x: 340, y: 70 },
        { id: 4, x: 60, y: 120 }, { id: 5, x: 130, y: 100 }, { id: 6, x: 200, y: 80 }, { id: 7, x: 280, y: 110 }, { id: 8, x: 350, y: 140 },
        { id: 9, x: 100, y: 170 }, { id: 10, x: 220, y: 160 }, { id: 11, x: 310, y: 190 }
    ];

    const edges = [
        [0, 1], [1, 2], [2, 3], [1, 6], [6, 2], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [9, 10], [10, 7], [10, 11], [11, 8], [5, 1]
    ];

    const particles = [
        { path: [1, 6], dur: "3s", delay: 0 },
        { path: [6, 2], dur: "3s", delay: 0.5 },
        { path: [4, 5], dur: "3s", delay: 1.0 },
        { path: [5, 6], dur: "3s", delay: 1.5 },
        { path: [10, 7], dur: "3s", delay: 2.0 },
        { path: [11, 8], dur: "3s", delay: 2.5 },
    ];

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Binary Rain */}
                {[90, 200, 310].map((x, i) => (
                    <g key={`rain-${i}`} fontSize="8" fill={accent} fillOpacity="0.05" fontFamily="monospace">
                        {Array.from({ length: 8 }).map((_, j) => (
                            <text key={`r-${i}-${j}`} x={x} y={0} style={{ animation: `shv-slide-up 10s linear infinite ${(i * 2) + j}s`, opacity: 0 }}>
                                {Math.random() > 0.5 ? "1" : "0"}
                            </text>
                        ))}
                    </g>
                ))}

                <defs>
                    <linearGradient id="tech-beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={accent} stopOpacity="0" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
                    </linearGradient>
                </defs>

                {/* Scanning Beam */}
                <g style={{ transformOrigin: `200px 230px` }} className="shv-pendulum">
                    <polygon points="200,230 100,0 300,0" fill="url(#tech-beam-grad)" />
                </g>

                {/* Constellation Edges */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1">
                    {edges.map((e, i) => {
                        const p1 = stars[e[0]];
                        const p2 = stars[e[1]];
                        return <path key={`edge-${i}`} id={`tech-path-${i}`} d={`M${p1.x},${p1.y} L${p2.x},${p2.y}`} fill="none" />;
                    })}
                </g>

                {/* Data Particles */}
                {particles.map((p, i) => {
                    const p1 = stars[p.path[0]];
                    const p2 = stars[p.path[1]];
                    return (
                        <circle key={`particle-${i}`} r="2" fill={accent}>
                            <animateMotion dur={p.dur} repeatCount="indefinite" begin={`${p.delay}s`} path={`M${p1.x},${p1.y} L${p2.x},${p2.y}`} />
                        </circle>
                    );
                })}

                {/* Constellation Nodes */}
                {stars.map((s) => (
                    <g key={`star-${s.id}`}>
                        <circle cx={s.x} cy={s.y} r="6" fill={accent} fillOpacity="0.2" />
                        <circle cx={s.x} cy={s.y} r="3" fill={accent} />
                    </g>
                ))}

                {/* Dome Silhouette */}
                <clipPath id="dome-clip">
                    <rect x="0" y="230" width="400" height="70" />
                </clipPath>
                <g clipPath="url(#dome-clip)">
                    <ellipse cx="200" cy="300" rx="120" ry="70" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.2" strokeWidth="1.5" />
                    <rect x="198" y="230" width="4" height="20" fill={accent} fillOpacity="0.4" />
                </g>

            </svg>
        </div>
    );
}

// 4. HUMAN CAPITAL: The Harbor
function HRHero({ accent }: { accent: string }) {
    const boats = [
        { x: 120, y: 235, delay: 0 },
        { x: 170, y: 245, delay: 0.5 },
        { x: 200, y: 230, delay: 1.0 },
        { x: 250, y: 240, delay: 1.5 },
        { x: 300, y: 235, delay: 2.0 },
    ];

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Harbor Water (Animated Sine Waves) */}
                <g stroke={accent} fill="none" strokeWidth="2" style={{ transformOrigin: "center" }}>
                    <path d="M-100,240 Q0,230 100,240 T300,240 T500,240" strokeOpacity="0.08" className="shv-wave-shift" style={{ animationDuration: "16s" }} />
                    <path d="M-100,260 Q0,250 100,260 T300,260 T500,260" strokeOpacity="0.12" className="shv-wave-shift" style={{ animationDuration: "12s" }} />
                    <path d="M-100,280 Q0,270 100,280 T300,280 T500,280" strokeOpacity="0.06" className="shv-wave-shift" style={{ animationDuration: "8s" }} />
                </g>

                {/* Breakwaters */}
                <g stroke={accent} strokeOpacity="0.25" strokeWidth="4" fill="none" strokeLinecap="round">
                    <path d="M30,200 Q100,200 160,260" />
                    <path d="M370,200 Q300,200 240,260" />
                </g>

                {/* Lighthouse */}
                <g fill={accent} fillOpacity="0.6">
                    <rect x="36" y="170" width="8" height="30" />
                    <polygon points="34,170 46,170 40,160" />
                </g>
                {/* Lighthouse Beam */}
                <g style={{ transformOrigin: "40px 165px" }} className="shv-beam-rotate" stroke={accent} strokeOpacity="0.2" strokeWidth="2">
                    <line x1="40" y1="165" x2="100" y2="105" />
                    <line x1="40" y1="165" x2="-20" y2="225" />
                </g>

                {/* Dock Platform */}
                <rect x="80" y="195" width="240" height="3" fill={accent} fillOpacity="0.4" />

                {/* Connecting Paths (Marching Ants) */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" fill="none" className="shv-march">
                    {boats.map((b, i) => (
                        <path key={`path-${i}`} d={`M${b.x},198 Q${b.x},215 ${b.x - 5},${b.y}`} />
                    ))}
                </g>

                {/* People on Dock */}
                <g stroke={accent} strokeWidth="1.5" strokeLinecap="round">
                    {[100, 140, 180, 220, 260, 280].map((px, i) => (
                        <g key={`person-${i}`} fill="none" style={{ animation: i % 2 === 0 ? "shv-bob 4s ease-in-out infinite" : "" }}>
                            <circle cx={px} cy="184" r="2.5" />
                            <line x1={px} y1="186.5" x2={px} y2="191" />
                            {/* Legs */}
                            <line x1={px} y1="191" x2={px - 3} y2="195" />
                            <line x1={px} y1="191" x2={px + 3} y2="195" />
                            {/* Arms */}
                            <line x1={px - 4} y1="188" x2={px + 4} y2="188" />
                        </g>
                    ))}
                </g>

                {/* Boats */}
                <g>
                    {boats.map((b, i) => (
                        <g key={`boat-${i}`} className="shv-bob" style={{ animationDelay: `${b.delay}s` }}>
                            <polygon points={`${b.x - 8},${b.y} ${b.x + 8},${b.y} ${b.x + 6},${b.y + 4} ${b.x - 6},${b.y + 4}`} fill={accent} fillOpacity="0.7" />
                            <polygon points={`${b.x - 1},${b.y} ${b.x - 1},${b.y - 10} ${b.x - 7},${b.y - 2}`} fill={accent} fillOpacity="0.5" />
                        </g>
                    ))}
                </g>

            </svg>
        </div>
    );
}

// 5. EVENTS: The Compass
function EventsHero({ accent }: { accent: string }) {
    const cx = 200;
    const cy = 140;

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Radar Sweep & Rings */}
                <defs>
                    <linearGradient id="event-radar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                </defs>

                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-radar-sweep">
                    <path d={`M${cx},${cy} L${cx},${cy - 80} A80,80 0 0,1 ${cx + 69},${cy - 40} Z`} fill="url(#event-radar-grad)" />
                </g>

                <g fill="none" stroke={accent} strokeWidth="1" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                    <circle cx={cx} cy={cy} r="30" style={{ animation: "shv-ring-pulse 4s ease-out infinite 0s" }} />
                    <circle cx={cx} cy={cy} r="55" style={{ animation: "shv-ring-pulse 4s ease-out infinite 1.3s" }} />
                    <circle cx={cx} cy={cy} r="80" style={{ animation: "shv-ring-pulse 4s ease-out infinite 2.6s" }} />
                </g>

                {/* Large Compass Rose */}
                <circle cx={cx} cy={cy} r="80" fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />

                <g fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1">
                    {/* Minor Points (NE/SE/SW/NW) */}
                    <polygon points={`${cx},${cy - 10} ${cx + 40},${cy - 40} ${cx + 10},${cy}`} />
                    <polygon points={`${cx},${cy + 10} ${cx + 40},${cy + 40} ${cx + 10},${cy}`} />
                    <polygon points={`${cx},${cy + 10} ${cx - 40},${cy + 40} ${cx - 10},${cy}`} />
                    <polygon points={`${cx},${cy - 10} ${cx - 40},${cy - 40} ${cx - 10},${cy}`} />
                </g>

                <g fill={accent} fillOpacity="0.7">
                    {/* Major Points */}
                    <polygon points={`${cx - 8},${cy} ${cx},${cy - 70} ${cx + 8},${cy} ${cx},${cy + 70}`} />
                    <polygon points={`${cx},${cy - 8} ${cx + 70},${cy} ${cx},${cy + 8} ${cx - 70},${cy}`} />
                    {/* Darker halves for 3D effect */}
                    <polygon points={`${cx},${cy} ${cx},${cy - 70} ${cx + 8},${cy}`} fillOpacity="0.4" />
                    <polygon points={`${cx},${cy} ${cx},${cy + 70} ${cx - 8},${cy}`} fillOpacity="0.4" />
                    <polygon points={`${cx},${cy} ${cx + 70},${cy} ${cx},${cy + 8}`} fillOpacity="0.4" />
                    <polygon points={`${cx},${cy} ${cx - 70},${cy} ${cx},${cy - 8}`} fillOpacity="0.4" />
                </g>

                {/* Labels */}
                <g fontSize="9" fill={accent} fillOpacity="0.6" fontFamily="sans-serif" textAnchor="middle">
                    <text x={cx} y={cy - 90}>Plan</text>
                    <text x={cx + 100} y={cy + 3}>Execute</text>
                    <text x={cx} y={cy + 100}>Manage</text>
                    <text x={cx - 100} y={cy + 3}>Report</text>
                </g>

                {/* Animated Needle */}
                <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="shv-wobble">
                    <polygon points={`${cx - 4},${cy} ${cx},${cy - 65} ${cx + 4},${cy}`} fill={accent} />
                    <polygon points={`${cx - 4},${cy} ${cx},${cy + 65} ${cx + 4},${cy}`} fill={accent} fillOpacity="0.4" />
                </g>

                {/* Event Timeline Arc */}
                <path d="M60,260 Q130,220 200,240 T340,260" fill="none" stroke={accent} strokeOpacity="0.2" strokeWidth="2" />
                {/* Milestones */}
                {[60, 116, 172, 228, 284, 340].map((x, i) => {
                    // Rough estimation of path y
                    const y = x === 60 || x === 340 ? 260 : (x === 116 ? 232 : (x === 172 ? 238 : (x === 228 ? 245 : 255)));
                    return (
                        <g key={`milestone-${i}`} style={{ animation: `shv-milestone-light 5s infinite ${i * 0.5}s`, opacity: 0.2 }}>
                            <circle cx={x} cy={y} r="4" fill={accent} />
                            <text x={x} y={y + 15} fontSize="9" fill={accent} textAnchor="middle">M{i + 1}</text>
                        </g>
                    );
                })}

            </svg>
        </div>
    );
}

// 6. IT SERVICES: The Forge
function ITHero({ accent }: { accent: string }) {
    const cx = 200;

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Cooling Stream */}
                <path d="M0,275 Q50,265 100,275 T200,275 T300,275 T400,275" fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="2" strokeDasharray="10 5" className="shv-flow" />

                {/* Circuit Traces Radiating */}
                <g fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="1">
                    <path d={`M${cx - 20},220 L100,220 L100,100 L40,100`} />
                    <path d={`M${cx + 20},220 L300,220 L300,80 L360,80`} />
                    <path d={`M${cx - 10},240 L120,240 L120,290 L80,290`} />
                    <path d={`M${cx + 10},240 L280,240 L280,290 L320,290`} />
                    <path d={`M${cx - 30},200 L60,200 L60,40 L20,40`} />
                    <path d={`M${cx + 30},200 L340,200 L340,60 L380,60`} />
                </g>
                {/* Circuit Nodes */}
                <g fill={accent} fillOpacity="0.2">
                    <circle cx="100" cy="100" r="2" />
                    <circle cx="300" cy="80" r="2" />
                    <circle cx="120" cy="290" r="2" />
                    <circle cx="280" cy="290" r="2" />
                    <circle cx="60" cy="40" r="2" />
                    <circle cx="340" cy="60" r="2" />
                </g>

                {/* Anvil */}
                <g fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5">
                    <path d={`M${cx - 30},200 Q${cx},198 ${cx + 30},200 L${cx + 20},240 L${cx - 20},240 Z`} />
                    <polygon points={`${cx - 30},200 ${cx - 50},210 ${cx - 30},220`} />
                    <rect x={cx - 25} y={240} width="50" height="15" rx="2" />
                </g>

                {/* The Hammer */}
                <g style={{ transformOrigin: `${cx}px 120px` }} className="shv-hammer-strike">
                    <line x1={cx} y1="120" x2={cx} y2="180" stroke={accent} strokeWidth="3" />
                    <rect x={cx - 15} y="180" width="30" height="15" rx="2" fill={accent} />
                </g>

                {/* Spark Burst (Synced with Hammer) */}
                <g style={{ transformOrigin: `${cx}px 200px` }} className="shv-spark-burst">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <circle
                            key={`spark-${i}`}
                            cx={cx + Math.cos(i * 45 * Math.PI / 180) * 30}
                            cy={200 + Math.sin(i * 45 * Math.PI / 180) * 30}
                            r="2"
                            fill={accent}
                        />
                    ))}
                </g>

                {/* Code Brackets rising */}
                {[-30, 0, 30].map((dx, i) => (
                    <text
                        key={`code-${i}`}
                        x={cx + dx - 10}
                        y={200}
                        fontSize="14"
                        fontWeight="bold"
                        fill={accent}
                        style={{ animation: `shv-code-rise 4s infinite linear ${i * 1.3}s`, opacity: 0 }}
                    >
                        {"< />"}
                    </text>
                ))}

            </svg>
        </div>
    );
}
