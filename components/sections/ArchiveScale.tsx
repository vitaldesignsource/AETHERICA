import Link from "next/link";

type Stat = {
  value: number;
  label: string;
  detail: string;
  href: string;
};

export function ArchiveScale({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative isolate overflow-hidden border-y border-gold/20 bg-black/60">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_50%,rgba(181,146,85,.13),transparent_42%),radial-gradient(circle_at_82%_50%,rgba(122,17,26,.16),transparent_44%),linear-gradient(180deg,rgba(8,8,8,.86),rgba(8,8,8,.96))]" />
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs uppercase tracking-[.32em] text-gold">The archive at a glance</p>
        {/* A grid of links, not a term/definition set. The <dl> this replaced put <dd> before its
            <dt> and wrapped both in an <a>, which the div-grouping form of <dl> does not permit —
            so the pairing was never owned by the list anyway. */}
        <ul role="list" className="grid grid-cols-2 gap-px overflow-hidden rounded border border-gold/15 bg-gold/15 lg:grid-cols-4">
          {stats.map((stat) => (
            <li key={stat.label} className="group relative bg-obsidian/95 transition duration-500 hover:bg-black">
              <Link href={stat.href} className="focus-ring flex h-full flex-col items-center gap-2 px-4 py-8 text-center">
                <span className="font-cinzel-brand text-4xl text-gold transition duration-500 group-hover:text-ivory group-hover:drop-shadow-[0_0_22px_rgba(181,146,85,.45)] sm:text-5xl">
                  {stat.value}
                </span>
                <span className="text-sm uppercase tracking-[.2em] text-ivory">{stat.label}</span>
                <span className="max-w-[22ch] text-xs leading-5 text-parchment/80">{stat.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
