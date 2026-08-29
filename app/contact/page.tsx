import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";
import { resolveSiteImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Aetherica",
  description: "Send listener questions, guest suggestions, corrections, collaboration notes, or general messages to Aetherica.",
  alternates: { canonical: "/contact" }
};

/**
 * Drop the artwork at public/images/contact-armillary.<ext> (png/jpg/webp/avif all work).
 * Until it exists the page falls back to the plain temple treatment rather than a broken image.
 */
const BACKGROUND_BASE = "/images/contact-armillary";

export default function ContactPage() {
  const background = resolveSiteImage(BACKGROUND_BASE);

  return (
    <section className="relative isolate overflow-hidden">
      {background ? (
        <>
          <Image
            src={background}
            alt=""
            fill
            // Above the fold and the largest thing on the page, so it is the LCP candidate.
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          {/* Two scrims rather than one: a vertical fade seats the plate against the page, and a
              horizontal one keeps the left column dark enough for body text at AA. */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,.92),rgba(8,8,8,.62)_38%,rgba(8,8,8,.94))]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.9),rgba(8,8,8,.45)_58%,rgba(8,8,8,.75))]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(181,146,85,.16),transparent_38%),linear-gradient(180deg,rgba(8,8,8,.9),rgba(8,8,8,.98))]" />
      )}

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-xs uppercase tracking-[.32em] text-gold">Contact</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Send a message to Aetherica
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment">
          Use this form for listener questions, episode ideas, source corrections, guest leads,
          collaboration notes, or general comments.
        </p>

        <div className="mt-10 max-w-4xl rounded border border-gold/25 bg-obsidian/80 p-5 shadow-aureate backdrop-blur-md sm:p-6">
          <ContactForm recipientEmail={siteConfig.contactEmail} />
        </div>
      </div>
    </section>
  );
}
