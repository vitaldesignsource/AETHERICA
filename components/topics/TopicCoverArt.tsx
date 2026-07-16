import {
  Compass,
  Cross,
  Eye,
  Flame,
  FlaskConical,
  Landmark,
  Network,
  Orbit,
  ScrollText,
  Sparkles,
  SquareStack,
  WandSparkles
} from "lucide-react";
import type { Topic } from "@/lib/data/types";

const coverArt = {
  alchemy: {
    Icon: FlaskConical,
    sigil: "vessel",
    frame: "from-gold/30 via-crimson/20 to-black",
    aura: "bg-[radial-gradient(circle_at_72%_40%,rgba(181,146,85,.34),transparent_24rem),radial-gradient(circle_at_24%_78%,rgba(122,17,26,.32),transparent_24rem)]"
  },
  theurgy: {
    Icon: Flame,
    sigil: "flame",
    frame: "from-crimson/34 via-gold/18 to-black",
    aura: "bg-[radial-gradient(circle_at_68%_38%,rgba(122,17,26,.48),transparent_22rem),radial-gradient(circle_at_72%_64%,rgba(181,146,85,.32),transparent_18rem)]"
  },
  hermeticism: {
    Icon: ScrollText,
    sigil: "scroll",
    frame: "from-brass/30 via-gold/14 to-black",
    aura: "bg-[radial-gradient(circle_at_74%_34%,rgba(181,146,85,.26),transparent_22rem),repeating-linear-gradient(0deg,rgba(181,146,85,.08)_0_1px,transparent_1px_18px)]"
  },
  astrology: {
    Icon: Orbit,
    sigil: "orbit",
    frame: "from-stone/34 via-gold/16 to-black",
    aura: "bg-[radial-gradient(circle_at_74%_42%,rgba(181,146,85,.28),transparent_22rem),conic-gradient(from_32deg_at_76%_42%,rgba(181,146,85,.22),transparent,rgba(122,17,26,.18),transparent)]"
  },
  kabbalah: {
    Icon: Network,
    sigil: "tree",
    frame: "from-gold/26 via-crimson/18 to-black",
    aura: "bg-[radial-gradient(circle_at_76%_46%,rgba(181,146,85,.3),transparent_21rem),linear-gradient(145deg,rgba(122,17,26,.22),transparent_58%)]"
  },
  gnosticism: {
    Icon: Eye,
    sigil: "constellation",
    frame: "from-crimson/30 via-gold/14 to-black",
    aura: "bg-[radial-gradient(ellipse_at_76%_42%,rgba(181,146,85,.3),transparent_20rem),radial-gradient(circle_at_48%_58%,rgba(122,17,26,.28),transparent_24rem)]"
  },
  freemasonry: {
    Icon: Compass,
    sigil: "compass",
    frame: "from-limestone/24 via-gold/16 to-black",
    aura: "bg-[linear-gradient(90deg,rgba(181,146,85,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.08)_1px,transparent_1px)] bg-[size:34px_34px]"
  },
  mysticism: {
    Icon: Eye,
    sigil: "eye",
    frame: "from-crimson/24 via-gold/12 to-black",
    aura: "bg-[radial-gradient(ellipse_at_74%_42%,rgba(231,221,204,.18),transparent_16rem),radial-gradient(ellipse_at_74%_42%,rgba(181,146,85,.28),transparent_28rem)]"
  },
  philosophy: {
    Icon: Landmark,
    sigil: "columns",
    frame: "from-gold/22 via-stone/20 to-black",
    aura: "bg-[linear-gradient(90deg,transparent,rgba(181,146,85,.16)_44%,transparent_58%),radial-gradient(circle_at_74%_40%,rgba(231,221,204,.12),transparent_20rem)]"
  },
  "christian-mysticism": {
    Icon: Cross,
    sigil: "cross",
    frame: "from-gold/20 via-crimson/20 to-black",
    aura: "bg-[radial-gradient(circle_at_74%_42%,rgba(181,146,85,.28),transparent_20rem),linear-gradient(150deg,rgba(231,221,204,.1),transparent_48%,rgba(122,17,26,.16))]"
  },
  symbolism: {
    Icon: WandSparkles,
    sigil: "symbol",
    frame: "from-brass/24 via-crimson/16 to-black",
    aura: "bg-[radial-gradient(circle_at_72%_44%,rgba(181,146,85,.25),transparent_20rem),linear-gradient(135deg,rgba(181,146,85,.12),transparent_38%,rgba(122,17,26,.16))]"
  },
  "sacred-architecture": {
    Icon: SquareStack,
    sigil: "architecture",
    frame: "from-limestone/22 via-gold/14 to-black",
    aura: "bg-[linear-gradient(90deg,transparent_0_48%,rgba(181,146,85,.18)_48%_52%,transparent_52%),radial-gradient(circle_at_76%_52%,rgba(181,146,85,.22),transparent_24rem)]"
  },
  "western-esotericism": {
    Icon: Sparkles,
    sigil: "constellation",
    frame: "from-stone/30 via-crimson/16 to-black",
    aura: "bg-[radial-gradient(circle_at_76%_42%,rgba(181,146,85,.28),transparent_22rem),radial-gradient(circle_at_58%_62%,rgba(122,17,26,.24),transparent_20rem)]"
  }
} as const;

function TopicSigil({ kind }: { kind: string }) {
  if (kind === "tree") {
    return (
      <svg className="absolute right-8 top-8 h-64 w-52 text-gold/24" viewBox="0 0 100 128" aria-hidden="true">
        {[
          [50, 10, 28, 34],
          [50, 10, 72, 34],
          [28, 34, 50, 58],
          [72, 34, 50, 58],
          [28, 34, 28, 78],
          [72, 34, 72, 78],
          [28, 78, 50, 104],
          [72, 78, 50, 104],
          [50, 58, 50, 120],
          [28, 78, 72, 78]
        ].map(([x1, y1, x2, y2], index) => <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.1" />)}
        {[50, 28, 72, 50, 28, 72, 50, 50].map((x, index) => {
          const y = [10, 34, 34, 58, 78, 78, 104, 120][index];
          return <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="none" stroke="currentColor" strokeWidth="1.25" />;
        })}
      </svg>
    );
  }

  if (kind === "orbit" || kind === "constellation") {
    return (
      <svg className="absolute right-4 top-4 h-72 w-72 text-gold/18" viewBox="0 0 160 160" aria-hidden="true">
        <circle cx="80" cy="80" r="62" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="80" cy="80" r="42" fill="none" stroke="currentColor" strokeWidth=".8" />
        <ellipse cx="80" cy="80" rx="70" ry="22" fill="none" stroke="currentColor" strokeWidth=".8" transform="rotate(-24 80 80)" />
        <ellipse cx="80" cy="80" rx="70" ry="22" fill="none" stroke="currentColor" strokeWidth=".8" transform="rotate(32 80 80)" />
        {[24, 45, 68, 95, 121].map((x, index) => <circle key={x} cx={x} cy={[58, 102, 36, 118, 64][index]} r="2.5" fill="currentColor" />)}
      </svg>
    );
  }

  return (
    <svg className="absolute right-2 top-0 h-72 w-72 text-gold/12" viewBox="0 0 160 160" aria-hidden="true">
      <path d="M80 16 L132 80 L80 144 L28 80 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth=".9" />
      <path d="M24 80 H136 M80 24 V136" stroke="currentColor" strokeWidth=".8" />
      <circle cx="80" cy="80" r="8" fill="currentColor" opacity=".3" />
    </svg>
  );
}

export function TopicCoverArt({ topic }: { topic: Topic }) {
  const art = coverArt[topic.slug as keyof typeof coverArt] ?? coverArt["western-esotericism"];
  const Icon = art.Icon;

  return (
    <section className="relative isolate overflow-hidden rounded border border-gold/25 bg-black/78 shadow-aureate">
      <div className={`absolute inset-0 -z-30 bg-gradient-to-br ${art.frame}`} />
      <div className={`absolute inset-0 -z-20 ${art.aura} opacity-85`} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.92),rgba(8,8,8,.68)_54%,rgba(8,8,8,.34)),radial-gradient(circle_at_22%_18%,rgba(231,221,204,.08),transparent_24rem)]" />
      <div className="absolute inset-4 border border-gold/12" />
      <TopicSigil kind={art.sigil} />
      <div className="absolute right-10 top-1/2 hidden size-36 -translate-y-1/2 place-items-center rounded-full border border-gold/22 bg-black/28 text-gold/38 shadow-[0_0_60px_rgba(181,146,85,.13)] sm:grid" aria-hidden="true">
        <Icon size={78} strokeWidth={1.1} />
      </div>

      <div className="relative max-w-3xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <p className="text-xs uppercase tracking-[.32em] text-gold">Topic Archive</p>
        <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory sm:text-7xl">{topic.title}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-8 text-parchment">{topic.definition}</p>
      </div>
    </section>
  );
}
