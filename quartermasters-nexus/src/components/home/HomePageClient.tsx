"use client";

import { type ReactNode } from "react";

interface HomePageClientProps {
  children: ReactNode;
}

/**
 * Client shell for the homepage.
 * Simple wrapper component for client-side features.
 */
export function HomePageClient({ children }: HomePageClientProps) {
  return <>{children}</>;
}
