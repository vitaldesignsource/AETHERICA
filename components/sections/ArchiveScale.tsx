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
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-gold/15 bg-gold/15 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative bg-obsidian/95 transition duration-500 hover:bg-black">
              <Link href={stat.href} className="focus-ring flex h-full flex-col items-center gap-2 px-4 py-8 text-center">
                <dd className="font-cinzel-brand text-4xl text-gold transition duration-500 group-hover:text-ivory group-hover:drop-shadow-[0_0_22px_rgba(181,146,85,.45)] sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="text-sm uppercase tracking-[.2em] text-ivory">{stat.label}</dt>
                <p className="max-w-[22ch] text-xs leading-5 text-parchment/80">{stat.detail}</p>
              </Link>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
