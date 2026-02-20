"use client";

import { SectorProvider } from "@/lib/SectorContext";
import { PageTransition } from "@/components/layout/PageTransition";
import CookieConsentBanner from "@/components/compliance/CookieConsentBanner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SectorProvider>
      <PageTransition>{children}</PageTransition>
      <CookieConsentBanner />
    </SectorProvider>
  );
}
