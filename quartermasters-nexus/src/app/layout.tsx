import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { JsonLd } from "@/components/layout/JsonLd";
import { Providers } from "@/components/layout/Providers";
import CookieConsentBanner from "@/components/compliance/CookieConsentBanner";
import SilkBackground from "@/components/layout/SilkBackground";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quartermasters.me'), // TODO: Replace with final domain
  title: {
    default: "Quartermasters — Strategic Consulting & Advisory",
    template: "%s | Quartermasters"
  },
  description:
    "Premium consulting across six verticals: Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management. California-based, globally connected.",
  applicationName: 'Quartermasters',
  authors: [{ name: 'Quartermasters' }],
  generator: 'Next.js 16',
  keywords: [
    "strategic consulting",
    "financial advisory",
    "human capital consulting",
    "technology consulting",
    "event management",
    "management consulting",
    "IT services consulting",
    "business advisory",
    "international consulting firm",
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Quartermasters',
  publisher: 'Quartermasters',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Quartermasters — Strategic Consulting & Advisory",
    description:
      "Premium consulting across Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management.",
    url: 'https://quartermasters.me', // TODO: Replace with final domain
    siteName: 'Quartermasters',
    images: [
      {
        url: '/quartermasters-logo-monogram.png',
        width: 1200,
        height: 630,
        alt: 'Quartermasters — Strategic Consulting',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quartermasters',
    description: 'Premium strategic consulting across six verticals.',
    images: ['/quartermasters-logo-monogram.png'],
  },
  alternates: {
    canonical: 'https://quartermasters.me', // TODO: Replace with final domain
    languages: {
      'en-US': 'https://quartermasters.me',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#002147" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Quartermasters" />
        <link rel="apple-touch-icon" href="/quartermasters-logo-monogram.png" />
      </head>
      <body
        className={`${dmSerif.variable} ${dmSans.variable} antialiased`}
      >
        <SilkBackground />
        <Providers>
          <div className="relative z-10">
            {children}
          </div>
          <CookieConsentBanner />
          <ChatPanel />
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  );
}
