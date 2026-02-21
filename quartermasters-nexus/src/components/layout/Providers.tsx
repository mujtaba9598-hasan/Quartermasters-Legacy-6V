"use client";

import { SectorProvider } from "@/lib/SectorContext";
import { PageTransition } from "@/components/layout/PageTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SectorProvider>
      <PageTransition>{children}</PageTransition>
    </SectorProvider>
  );
}
