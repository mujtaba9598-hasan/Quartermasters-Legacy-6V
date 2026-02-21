import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { JsonLd } from "@/components/layout/JsonLd";
import { Providers } from "@/components/layout/Providers";
import CookieConsentBanner from "@/components/compliance/CookieConsentBanner";
import SilkBackground from "@/components/layout/SilkBackground";
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
    default: "Quartermasters F.Z.C — Strategic Consulting & Advisory",
    template: "%s | Quartermasters F.Z.C"
  },
  description:
    "Premium consulting across six verticals: Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management. Ajman Free Zone licensed, globally minded.",
  applicationName: 'Quartermasters F.Z.C',
  authors: [{ name: 'Quartermasters F.Z.C' }],
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
    "California consulting firm",
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Quartermasters F.Z.C',
  publisher: 'Quartermasters F.Z.C',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Quartermasters F.Z.C — Strategic Consulting & Advisory",
    description:
      "Premium consulting across Financial Advisory, Human Capital, Technology & Innovation, Events & Experiences, and Strategic Management.",
    url: 'https://quartermasters.me', // TODO: Replace with final domain
    siteName: 'Quartermasters F.Z.C',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quartermasters F.Z.C — Strategic Consulting',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quartermasters F.Z.C',
    description: 'Premium strategic consulting across six verticals.',
    images: ['/og-image.jpg'],
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
        </Providers>
      </body>
    </html>
  );
}
