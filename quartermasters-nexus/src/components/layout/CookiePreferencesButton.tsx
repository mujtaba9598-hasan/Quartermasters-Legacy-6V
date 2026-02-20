"use client";

import { Settings } from "lucide-react";

export function CookiePreferencesButton() {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event("open-cookie-preferences")); // Dispatch custom event
                // Fallback or also try to open via hook if possible, but event is the standard way decoupled components communicate
                const banner = document.querySelector('[data-cookie-banner]');
                if (banner) (banner as HTMLElement).style.display = 'block';
            }}
            className="text-sm text-text-dim transition-colors hover:text-foreground text-left"
        >
            Cookie Preferences
        </button>
    );
}
