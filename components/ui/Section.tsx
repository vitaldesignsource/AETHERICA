import type { ReactNode } from "react";
import Link from "next/link";

export function Section({
  eyebrow,
  title,
  children,
  id
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  const isResourcePage = eyebrow?.toLowerCase().startsWith("resources");

  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {isResourcePage ? <ResourceReturn className="mb-10" /> : null}
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">{eyebrow}</p> : null}
        <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">{title}</h2>
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
