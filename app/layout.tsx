import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PlayerProvider } from "@/components/audio/PlayerProvider";
import { organizationJsonLd, podcastSeriesJsonLd, webSiteJsonLd } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Aetherica Podcast",
    template: "%s | Aetherica Podcast"
  },
  description: siteConfig.description,
  // No canonical here on purpose. `alternates` is inherited by every descendant segment that does
  // not declare its own, so a canonical set at the root made all 40+ pages announce themselves as
  // duplicates of the homepage. Absent a canonical, each route is self-canonical, which is correct.
  alternates: {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }} />
        <PlayerProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </PlayerProvider>
      </body>
    </html>
  );
}
