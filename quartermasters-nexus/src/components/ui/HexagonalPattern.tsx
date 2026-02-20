'use client';

/**
 * Hexagonal SVG pattern for Financial Advisory (The Lighthouse) theme.
 */
export function HexagonalPattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="hexagons"
                    x="0"
                    y="0"
                    width="100"
                    height="86.6"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M25 0 L75 0 L100 43.3 L75 86.6 L25 86.6 L0 43.3 Z"
                        fill="none"
                        stroke="var(--sector-financial)"
                        strokeWidth="0.5"
                        opacity="0.1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
    );
}

/**
 * Network pattern for Human Capital (The Harbor) theme.
 */
export function NetworkPattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="network"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="60" cy="60" r="3" fill="var(--sector-hr)" opacity="0.12" />
                    <circle cx="0" cy="0" r="2" fill="var(--sector-hr)" opacity="0.08" />
                    <circle cx="120" cy="0" r="2" fill="var(--sector-hr)" opacity="0.08" />
                    <circle cx="0" cy="120" r="2" fill="var(--sector-hr)" opacity="0.08" />
                    <circle cx="120" cy="120" r="2" fill="var(--sector-hr)" opacity="0.08" />
                    <line x1="60" y1="60" x2="0" y2="0" stroke="var(--sector-hr)" strokeWidth="0.5" opacity="0.06" />
                    <line x1="60" y1="60" x2="120" y2="0" stroke="var(--sector-hr)" strokeWidth="0.5" opacity="0.06" />
                    <line x1="60" y1="60" x2="0" y2="120" stroke="var(--sector-hr)" strokeWidth="0.5" opacity="0.06" />
                    <line x1="60" y1="60" x2="120" y2="120" stroke="var(--sector-hr)" strokeWidth="0.5" opacity="0.06" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
    );
}

/**
 * Wireframe pattern for Tech (The Observatory) theme.
 */
export function WireframePattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="wireframe"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="40" height="40" fill="none" stroke="var(--sector-tech)" strokeWidth="0.5" opacity="0.08" />
                    <line x1="0" y1="20" x2="40" y2="20" stroke="var(--sector-tech)" strokeWidth="0.3" opacity="0.05" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="var(--sector-tech)" strokeWidth="0.3" opacity="0.05" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wireframe)" />
        </svg>
    );
}

/**
 * Radar pattern for Events (The Compass) theme.
 */
export function RadarPattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="radar"
                    x="0"
                    y="0"
                    width="200"
                    height="200"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="100" cy="100" r="30" fill="none" stroke="var(--sector-events)" strokeWidth="0.5" opacity="0.1" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="var(--sector-events)" strokeWidth="0.5" opacity="0.07" />
                    <circle cx="100" cy="100" r="90" fill="none" stroke="var(--sector-events)" strokeWidth="0.5" opacity="0.05" />
                    <line x1="100" y1="0" x2="100" y2="200" stroke="var(--sector-events)" strokeWidth="0.3" opacity="0.05" />
                    <line x1="0" y1="100" x2="200" y2="100" stroke="var(--sector-events)" strokeWidth="0.3" opacity="0.05" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radar)" />
        </svg>
    );
}

/**
 * Grid pattern for Management (The Helm) theme.
 */
export function GridPattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="grid"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                >
                    <rect x="5" y="5" width="50" height="50" fill="none" stroke="var(--sector-mgmt)" strokeWidth="0.5" opacity="0.08" />
                    <rect x="15" y="15" width="30" height="30" fill="none" stroke="var(--sector-mgmt)" strokeWidth="0.5" opacity="0.05" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );
}
