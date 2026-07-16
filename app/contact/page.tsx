import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Aetherica",
  description: "Send listener questions, guest suggestions, corrections, collaboration notes, or general messages to Aetherica."
};

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Send a message to Aetherica">
      <div className="max-w-4xl">
        <p className="text-lg leading-8 text-parchment">
          Use this form for listener questions, episode ideas, source corrections, guest leads, collaboration notes, or general comments.
        </p>
      </div>
      <div className="mt-8 max-w-4xl temple-border rounded p-5">
        <ContactForm recipientEmail={siteConfig.contactEmail} />
      </div>
    </Section>
  );
}
