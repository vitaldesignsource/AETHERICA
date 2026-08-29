import type { ReactNode } from "react";
import Link from "next/link";

export function Section({
  eyebrow,
  title,
  children,
  id,
  titleAs = "h2"
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  id?: string;
  /**
   * Sections default to h2 because most sit beneath a page hero that already owns the h1. On a
   * page where this Section IS the title, pass "h1" — otherwise the document has no h1 at all,
   * which was true of 29 routes.
   */
  titleAs?: "h1" | "h2";
}) {
  const isResourcePage = eyebrow?.toLowerCase().startsWith("resources");
  const Heading = titleAs;

  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {isResourcePage ? <ResourceReturn className="mb-10" /> : null}
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">{eyebrow}</p> : null}
        <Heading className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">{title}</Heading>
      </div>
      {children}
      {isResourcePage ? <ResourceReturn className="mt-14 border-t border-gold/15 pt-8" /> : null}
    </section>
  );
}

function ResourceReturn({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/resources"
      className={`focus-ring inline-flex text-xs uppercase tracking-[.32em] text-gold transition hover:text-ivory sm:text-sm ${className}`}
    >
      Back to Resources
    </Link>
  );
}
