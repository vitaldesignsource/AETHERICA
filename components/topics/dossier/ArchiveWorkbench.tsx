import { ArrowUpRight, ScrollText } from "lucide-react";
import type { TopicDossier } from "@/lib/data/topicDossiers";

/**
 * The working glossary, at full width.
 *
 * This section used to carry two further blocks. "Archive Searches" was a chip row that mostly
 * restated glossary headwords and sent several of them to searches returning nothing; "Study
 * Questions" was a set of seminar prompts on a page with no input, no answer and nothing to save.
 * Both were removed rather than rebuilt.
 *
 * The remaining honesty problem was that every term linked to /search regardless of whether the
 * archive holds anything — nigredo, albedo and rubedo all resolve to "No archive matches yet".
 * Terms better served elsewhere on the page now say so and link there instead.
 */
export function ArchiveWorkbench({ workbench }: { workbench: TopicDossier["researchWorkbench"] }) {
  if (!workbench.glossary.length) return null;

  return (
    <section className="temple-border rounded bg-black/46 p-5">
      <div className="flex items-center gap-3">
        <ScrollText className="text-gold" size={20} aria-hidden="true" />
        <h2 className="font-display text-3xl text-ivory">Working Glossary</h2>
      </div>
      <p className="mt-3 max-w-4xl leading-7 text-parchment">
        The vocabulary this dossier uses, with the register each definition belongs to. Terms the
        archive has spoken about link into transcript search; terms treated more fully on this page
        point there instead.
      </p>

      <dl className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workbench.glossary.map((entry) => (
          <div
            key={entry.term}
            className="flex flex-col rounded border border-gold/14 bg-black/32 p-4 transition duration-500 hover:border-gold/35"
          >
            <dt className="font-display text-2xl text-ivory">{entry.term}</dt>
            {entry.register ? (
              <p className="mt-1 text-[.65rem] uppercase tracking-[.22em] text-gold">{entry.register}</p>
            ) : null}
            <dd className="mt-2 flex-1 text-sm leading-6 text-parchment">{entry.definition}</dd>

            {entry.seeAlso ? (
              <a
                href={entry.seeAlso.href}
                className="focus-ring mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[.16em] text-gold transition hover:text-ivory"
              >
                {entry.seeAlso.label}
                <span aria-hidden>↓</span>
              </a>
            ) : (
              <a
                href={`/search?q=${encodeURIComponent(entry.term)}`}
                className="focus-ring mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[.16em] text-gold transition hover:text-ivory"
              >
                Search the archive
                <ArrowUpRight aria-hidden size={13} />
              </a>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
