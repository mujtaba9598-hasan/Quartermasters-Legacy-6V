'use client';

import { useEffect, useState } from 'react';

export function FooterTicker() {
  const [messages] = useState<string[]>([
    "ADVISORY STATUS: ACTIVE",
    "CLIENT PORTFOLIO: GROWING",
    "CONSULTING NETWORK: GLOBAL",
    "COMPLIANCE: UP TO DATE",
    "5 SERVICE VERTICALS",
  ]);
  const [isConnected] = useState(false);

  useEffect(() => {
    // Placeholder for real-time socket connection
  }, []);

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex gap-12 py-1">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--color-gold)" }}>
            <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
            {msg}
          </div>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 flex gap-12 py-1">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--color-gold)" }}>
            <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
