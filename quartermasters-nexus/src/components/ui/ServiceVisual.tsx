"use client";

import React from "react";
import "./ServiceVisual.css";

interface ServiceVisualProps {
    type: "financial" | "management" | "tech" | "hr" | "events" | "it";
    accent: string;
}

export default function ServiceVisual({ type, accent }: ServiceVisualProps) {
    switch (type) {
        case "financial":
            return <FinancialVisual accent={accent} />;
        case "management":
            return <ManagementVisual accent={accent} />;
        case "tech":
            return <TechVisual accent={accent} />;
        case "hr":
            return <HRVisual accent={accent} />;
        case "events":
            return <EventsVisual accent={accent} />;
        case "it":
            return <ITVisual accent={accent} />;
        default:
            return null;
    }
}

// 1. FINANCIAL: Capital Flow Network
function FinancialVisual({ accent }: { accent: string }) {
    const outerRadius = 40;
    const cx = 100;
    const cy = 40;
    // Calculate 5 points in a pentagon
    const points = Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        return {
            x: cx + outerRadius * Math.cos(angle),
            y: cy + outerRadius * Math.sin(angle),
        };
    });

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={accent} strokeWidth="1" strokeOpacity="0.2">
                    {points.map((p, i) => (
                        <path key={`path-${i}`} id={`fin-path-${i}`} d={`M${p.x},${p.y} L${cx},${cy}`} fill="none" />
                    ))}
                </g>

                {/* Animated Particles */}
                {points.map((_, i) => (
                    <circle key={`particle-${i}`} r="2" fill={accent}>
                        <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.6}s`}>
                            <mpath href={`#fin-path-${i}`} />
                        </animateMotion>
                    </circle>
                ))}

                {/* Outer Nodes */}
                {points.map((p, i) => (
                    <circle key={`node-${i}`} cx={p.x} cy={p.y} r="4" fill={accent} fillOpacity="0.8" />
                ))}

                {/* Central Node */}
                <circle cx={cx} cy={cy} r="7" fill={accent} className="sv-pulse" />

                {/* Baseline & Ticks */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1">
                    <line x1="20" y1="85" x2="180" y2="85" />
                    {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                        <line
                            key={`tick-${i}`}
                            x1={x}
                            y1={85}
                            x2={x}
                            y2={85 - (4 + Math.random() * 6)}
                        >
                            <animate
                                attributeName="opacity"
                                values="0;1"
                                dur="0.5s"
                                begin={`${i * 0.1}s`}
                                fill="freeze"
                            />
                        </line>
                    ))}
                </g>
            </svg>
        </div>
    );
}

// 2. MANAGEMENT: Decision Matrix Grid
function ManagementVisual({ accent }: { accent: string }) {
    // 4 cols x 3 rows grid
    // Grid bounds roughly 60px to 140px in x, 25px to 75px in y
    const cells = [];
    const startX = 66;
    const startY = 24;
    const size = 18;
    const gap = 8;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            cells.push({ x: startX + col * (size + gap), y: startY + row * (size + gap), r: row, c: col });
        }
    }

    // Define paths (indices of cells)
    const path1 = [0, 5, 10, 11]; // Diagonal-ish
    const path2 = [8, 9, 5, 2];   // Bottom-left to top-right
    const objectiveIndex = 3;     // Top-right square

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g stroke={accent} strokeOpacity="0.08" strokeWidth="1">
                    {/* Faint grid lines */}
                    <line x1="60" y1="46" x2="164" y2="46" />
                    <line x1="60" y1="72" x2="164" y2="72" />
                    <line x1="88" y1="20" x2="88" y2="98" />
                    <line x1="114" y1="20" x2="114" y2="98" />
                    <line x1="140" y1="20" x2="140" y2="98" />
                </g>

                {cells.map((cell, i) => {
                    let animStyle = {};

                    if (i === objectiveIndex) {
                        animStyle = { animation: "matrix-objective 2s infinite ease-in-out" };
                    } else if (path1.includes(i)) {
                        const delay = path1.indexOf(i) * 0.3;
                        // 2 sequences * 1.5s = 3s total loop roughly
                        animStyle = { animation: `matrix-flash 4s infinite ease-out ${delay}s` };
                    } else if (path2.includes(i)) {
                        const delay = 2 + path2.indexOf(i) * 0.3;
                        animStyle = { animation: `matrix-flash 4s infinite ease-out ${delay}s` };
                    }

                    return (
                        <rect
                            key={`cell-${i}`}
                            x={cell.x}
                            y={cell.y}
                            width={size}
                            height={size}
                            rx="3"
                            fill={accent}
                            opacity="0.08"
                            style={animStyle}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

// 3. TECHNOLOGY: Circuit Pulse Board
function TechVisual({ accent }: { accent: string }) {
    // Main path points: (20,50) -> (60,50) -> (60,20) -> (140,20) -> (140,80) -> (180,80)
    const mainPath = "M20,50 L60,50 L60,20 L140,20 L140,80 L180,80";

    // Nodes at key junctions
    const nodes = [
        { cx: 60, cy: 50, delay: 0.8 },
        { cx: 60, cy: 20, delay: 1.2 },
        { cx: 140, cy: 20, delay: 2.8 },
        { cx: 140, cy: 80, delay: 4.0 },
    ];

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Decoration circuits */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1.5" fill="none">
                    <path d={mainPath} />
                    <path d="M40,20 L40,70 L80,70" />
                    <path d="M120,50 L180,50" />
                    <path d="M100,20 L100,50" />
                </g>

                {/* The traveling pulse */}
                <circle r="3" fill={accent}>
                    <animateMotion dur="5s" repeatCount="indefinite" path={mainPath} />
                </circle>

                {/* Nodes and their ping effect */}
                {nodes.map((n, i) => (
                    <g key={`tech-node-${i}`}>
                        {/* Base diamond */}
                        <rect
                            x={n.cx - 3}
                            y={n.cy - 3}
                            width="6"
                            height="6"
                            fill={accent}
                            opacity="0.5"
                            transform={`rotate(45 ${n.cx} ${n.cy})`}
                        />
                        {/* Flash animation */}
                        <rect
                            x={n.cx - 3}
                            y={n.cy - 3}
                            width="6"
                            height="6"
                            fill={accent}
                            opacity="0"
                            transform={`rotate(45 ${n.cx} ${n.cy})`}
                        >
                            <animate
                                attributeName="opacity"
                                values="0; 1; 0"
                                dur="5s"
                                keyTimes={`0; ${n.delay / 5}; ${(n.delay + 0.6) / 5}`}
                                repeatCount="indefinite"
                            />
                        </rect>
                        {/* Expanding ping ring */}
                        <circle cx={n.cx} cy={n.cy} r="3" fill={accent} style={{ animation: `ping-ring 5s infinite ease-out ${n.delay}s`, transformOrigin: `${n.cx}px ${n.cy}px` }} opacity="0" />
                    </g>
                ))}
            </svg>
        </div>
    );
}

// 4. HUMAN CAPITAL: Orbital System
function HRVisual({ accent }: { accent: string }) {
    const cx = 100;
    const cy = 50;

    const orbits = [
        { r: 22, speedClass: "sv-rotate-8s" },
        { r: 34, speedClass: "sv-rotate-12s" },
        { r: 46, speedClass: "sv-rotate-16s sv-dash-orbit" }
    ];

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Radial faint lines */}
                <g stroke={accent} strokeOpacity="0.1" strokeWidth="1">
                    <line x1={cx} y1={cy} x2={cx} y2={10} />
                    <line x1={cx} y1={cy} x2={cx - 35} y2={cy + 20} />
                    <line x1={cx} y1={cy} x2={cx + 35} y2={cy + 20} />
                </g>

                {/* Center breathing circle */}
                <circle cx={cx} cy={cy} r="12" fill="none" stroke={accent} strokeOpacity="0.8" strokeWidth="1.5" className="sv-breathe" />
                <circle cx={cx} cy={cy} r="3" fill={accent} />

                {/* Orbitals */}
                {orbits.map((orb, i) => (
                    <g key={`orbit-${i}`} style={{ transformOrigin: `${cx}px ${cy}px` }} className={orb.speedClass}>
                        {/* Orbit path (faint) */}
                        <circle cx={cx} cy={cy} r={orb.r} fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="1" />

                        {/* The satellite object */}
                        <circle cx={cx + orb.r} cy={cy} r="3" fill={accent} />
                        <circle cx={cx + orb.r} cy={cy} r="6" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
                    </g>
                ))}

            </svg>
        </div>
    );
}

// 5. EVENTS: Timeline Cascade
function EventsVisual({ accent }: { accent: string }) {
    const bars = [
        { y: 20, w: 120, op: 0.4, delay: 0 },
        { y: 35, w: 80, op: 0.6, delay: 0.15 },
        { y: 50, w: 140, op: 0.8, delay: 0.3 },
        { y: 65, w: 60, op: 0.5, delay: 0.45 },
        { y: 80, w: 100, op: 0.7, delay: 0.6 }
    ];

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Timeline Axis */}
                <line x1="15" y1="0" x2="15" y2="100" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />

                {/* The Animated Group (Compression) */}
                <g style={{ animation: "event-compress 6s infinite ease-in-out", transformOrigin: "170px center" }}>
                    {bars.map((b, i) => (
                        <g key={`bar-${i}`}>
                            <rect
                                x="15"
                                y={b.y - 3}
                                width={b.w}
                                height="6"
                                rx="3"
                                fill={accent}
                                fillOpacity={b.op}
                                className="sv-event-bar"
                                style={{ animation: `slideIn 0.8s ease-out forwards ${b.delay}s` }}
                            />
                            <circle
                                cx={15 + b.w}
                                cy={b.y}
                                r="3"
                                fill={accent}
                                style={{ transformOrigin: `${15 + b.w}px ${b.y}px`, animation: `popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${b.delay + 0.6}s` }}
                                opacity="0"
                            />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}

// 6. IT SERVICES: Code Deploy Pipeline
function ITVisual({ accent }: { accent: string }) {
    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Stage 1: Code Block */}
                <g>
                    {[30, 45, 25, 40].map((w, i) => (
                        <rect
                            key={`code-${i}`}
                            x="20"
                            y={35 + i * 8}
                            width={w}
                            height="2"
                            fill={accent}
                            style={{ animation: `blink-line 1.5s infinite ease-in-out ${i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Sub-Flow Arrows 1 -> 2 */}
                <g fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {[0, 1, 2].map(i => (
                        <polyline
                            key={`chev1-${i}`}
                            points="65,46 69,50 65,54"
                            style={{ animation: `flowRight 1.5s infinite ease-in-out ${i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Stage 2: Build Hexagon */}
                <g transform="translate(100, 50)" className="sv-rotate-hex">
                    {/* Hexagon polygon points (r=15 approx) */}
                    <polygon
                        points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5"
                        fill="none"
                        stroke={accent}
                        strokeWidth="1.5"
                    />
                </g>

                {/* Sub-Flow Arrows 2 -> 3 */}
                <g fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {[0, 1, 2].map(i => (
                        <polyline
                            key={`chev2-${i}`}
                            points="125,46 129,50 125,54"
                            style={{ animation: `flowRight 1.5s infinite ease-in-out ${0.6 + i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Stage 3: Browser Window */}
                <g transform="translate(145, 32)">
                    <rect x="0" y="0" width="45" height="35" rx="3" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
                    <line x1="0" y1="10" x2="45" y2="10" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
                    <circle cx="6" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />
                    <circle cx="11" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />
                    <circle cx="16" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />

                    {/* Animated payload filling the window */}
                    <rect x="0" y="35" width="45" height="25" fill={accent} fillOpacity="0.3" transform="scale(1, -1)">
                        <animate
                            attributeName="height"
                            values="0; 25; 25; 0"
                            keyTimes="0; 0.2; 0.8; 1"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </rect>
                </g>

            </svg>
        </div>
    );
}
