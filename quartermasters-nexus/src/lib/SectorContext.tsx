"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { SectorKey } from "@/lib/design-tokens";
import { colors } from "@/lib/design-tokens";

interface SectorContextValue {
  activeSector: SectorKey | null;
  setActiveSector: (sector: SectorKey | null) => void;
  accentColor: string;
  glowColor: string;
}

const SectorContext = createContext<SectorContextValue>({
  activeSector: null,
  setActiveSector: () => {},
  accentColor: colors.accent.gold,
  glowColor: "rgba(200, 135, 46, 0.15)",
});

export function SectorProvider({ children }: { children: React.ReactNode }) {
  const [activeSector, setActiveSector] = useState<SectorKey | null>(null);

  const sector = activeSector ? colors.sectors[activeSector] : null;
  const accentColor = sector ? sector.primary : colors.accent.gold;
  const glowColor = sector ? sector.glow : "rgba(200, 135, 46, 0.15)";

  // Apply accent as CSS variable on body for global theming
  useEffect(() => {
    document.documentElement.style.setProperty("--active-accent", accentColor);
    document.documentElement.style.setProperty("--active-glow", glowColor);
  }, [accentColor, glowColor]);

  return (
    <SectorContext.Provider
      value={{ activeSector, setActiveSector, accentColor, glowColor }}
    >
      {children}
    </SectorContext.Provider>
  );
}

export function useSector() {
  return useContext(SectorContext);
}
