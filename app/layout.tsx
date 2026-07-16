import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PlayerProvider } from "@/components/audio/PlayerProvider";
import { organizationJsonLd } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Aetherica Podcast",
    template: "%s | Aetherica Podcast"
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    types: process.env.PODCAST_RSS_URL ? { "application/rss+xml": process.env.PODCAST_RSS_URL } : undefined
  },
  openGraph: {
    title: "Aetherica Podcast",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Aetherica Podcast",
    images: ["/images/aetherica-hero.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <PlayerProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
