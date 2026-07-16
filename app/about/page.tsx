import { Section } from "@/components/ui/Section";
import { AboutEsotericBanner } from "@/components/sections/AboutEsotericBanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <AboutEsotericBanner />
      </div>

      <Section eyebrow="About Aetherica" title="The Aetherica mission">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <article className="leading-8 text-parchment">
            <p className="text-xl leading-9 text-ivory">
              Exploring the world&apos;s wisdom traditions, mystery schools, symbolic sciences, and hidden histories through conversations with leading scholars, practitioners, and researchers.
            </p>

            <div className="mt-8 grid gap-5">
              <p>
                Aetherica is an exploration of the world&apos;s wisdom traditions, esoteric philosophies, symbolic sciences, and hidden histories. Through in-depth conversations with scholars, practitioners, authors, historians, initiates, and independent researchers, the podcast investigates the ideas, symbols, and practices that have shaped humanity&apos;s understanding of reality across cultures and centuries.
              </p>
              <p>
                Our discussions traverse a wide landscape of subjects including Hermeticism, Alchemy, Theurgy, Kabbalah, Gnosticism, Neoplatonism, Astrology, Mysticism, Freemasonry, comparative religion, philosophy, mythology, symbolism, consciousness, and the perennial search for meaning. Alongside these classical traditions, Aetherica also explores emerging questions surrounding science, culture, technology, and the evolving frontiers of human knowledge.
              </p>
              <p>
                The name <em className="text-ivory">Aetherica</em> is inspired by the ancient concept of the aether, the subtle medium believed by many philosophical and mystical traditions to connect the visible and invisible dimensions of existence. It represents a meeting place where ideas, symbols, and traditions can be examined not as relics of the past, but as living systems of knowledge that continue to illuminate the present.
              </p>
              <p>
                More than a podcast, Aetherica seeks to become a living archive of the mystery traditions: a place where seekers, students, researchers, and the curious can discover new perspectives, trace connections between seemingly distant subjects, and engage with some of the most profound questions humanity has ever asked.
              </p>
              <p>
                Whether you are beginning your journey or have spent decades studying the esoteric arts, Aetherica invites you to explore the pathways that lie between philosophy and practice, symbol and reality, history and myth, the seen and the unseen.
              </p>
            </div>

            <div className="temple-border mt-10 rounded p-5">
              <h2 className="font-display text-3xl text-ivory">A Living Archive</h2>
              <p className="mt-3">
                The website is designed as a library, observatory, temple, and research institute at once: a connected archive of episodes, chapters, transcripts, guests, topics, books, notes, and practical instruments for study.
              </p>
            </div>
          </article>
          <aside className="temple-border rounded p-5">
            <h2 className="font-display text-2xl text-ivory">Contact</h2>
            <ContactForm recipientEmail={siteConfig.contactEmail} />
          </aside>
        </div>
      </Section>
    </>
  );
}
