import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { resolveSiteImage } from "@/lib/images";
import { CommonplaceBook } from "@/components/research/CommonplaceBook";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Commonplace Book",
  description: "A private Aetherica research collection for episodes, quotes, transcript passages, books, guests, topics, events, notes, and timestamps.",
  openGraph: {
    images: [{ url: "/images/pages/commonplace-oculus.webp", alt: "A flooded rotunda library beneath an open oculus" }]
  },
  twitter: { card: "summary_large_image", images: ["/images/pages/commonplace-oculus.webp"] }
};

export default function CommonplacePage() {
  const pageHero = resolveSiteImage("/images/pages/commonplace-oculus");
  return (
    <>
      <PageHero
        eyebrow="Commonplace book"
        title="Gathered passages"
        lede="The old practice of copying out what matters, so that scattered reading becomes one argument you can revisit."
        imageSrc={pageHero}
        imageAlt="A flooded rotunda library with a fallen marble head, its oculus reflected as a pale disc on the black water"
        focus="50% 44%"
      />
    {/* The hero above carries the page title; this names the section under it. */}
    <Section eyebrow="Your passages" title="Saved excerpts">
      <p className="mb-8 max-w-3xl leading-8 text-parchment">
        A private scholarly notebook for saving episodes, quotes, transcript passages, books, guests, topics, events, exact timestamps, and personal notes.
      </p>
      <CommonplaceBook />
    </Section>
    </>
  );
}
