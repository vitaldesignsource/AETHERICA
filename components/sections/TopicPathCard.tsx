import {
  Church,
  Compass,
  Cross,
  Eclipse,
  Eye,
  Flame,
  FlaskConical,
  KeyRound,
  Landmark,
  Network,
  Orbit,
  ScrollText,
  Shapes,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import type { Topic } from "@/lib/data/types";

const topicArtwork = {
  alchemy: {
    Icon: FlaskConical,
    label: "Alchemical vessel",
    glow: "from-gold/24 via-crimson/18 to-transparent",
    etching: "bg-[radial-gradient(ellipse_at_72%_20%,rgba(181,146,85,.22),transparent_32%),linear-gradient(135deg,rgba(181,146,85,.14),transparent_42%,rgba(122,17,26,.12))]"
  },
  theurgy: {
    Icon: Flame,
    label: "Consecrated flame",
    glow: "from-crimson/28 via-gold/20 to-transparent",
    etching: "bg-[radial-gradient(ellipse_at_74%_22%,rgba(122,17,26,.34),transparent_34%),linear-gradient(145deg,rgba(181,146,85,.12),transparent_52%,rgba(231,221,204,.05))]"
  },
  hermeticism: {
    Icon: ScrollText,
    label: "Hermetic manuscript",
    glow: "from-brass/24 via-gold/14 to-transparent",
    etching: "bg-[linear-gradient(115deg,rgba(181,146,85,.16),transparent_28%),repeating-linear-gradient(0deg,rgba(181,146,85,.1)_0_1px,transparent_1px_16px)]"
  },
  astrology: {
    Icon: Orbit,
    label: "Astrological orbit",
    glow: "from-stone/28 via-gold/16 to-transparent",
    etching: "bg-[radial-gradient(circle_at_72%_30%,rgba(181,146,85,.2),transparent_30%),conic-gradient(from_20deg_at_78%_30%,rgba(181,146,85,.16),transparent,rgba(122,17,26,.16),transparent)]"
  },
  kabbalah: {
    Icon: Network,
    label: "Tree of Life lattice",
    glow: "from-gold/20 via-crimson/16 to-transparent",
    etching: "bg-[radial-gradient(circle_at_76%_28%,rgba(181,146,85,.22),transparent_28%),linear-gradient(160deg,rgba(181,146,85,.13),transparent_48%,rgba(122,17,26,.12))]"
  },
  gnosticism: {
    Icon: Eye,
    label: "Gnostic eye",
    glow: "from-crimson/22 via-gold/18 to-transparent",
    etching: "bg-[radial-gradient(ellipse_at_76%_28%,rgba(181,146,85,.24),transparent_30%),linear-gradient(150deg,rgba(122,17,26,.18),transparent_45%,rgba(231,221,204,.06))]"
  },
  freemasonry: {
    Icon: Compass,
    label: "Compass and temple plan",
    glow: "from-limestone/20 via-gold/14 to-transparent",
    etching: "bg-[linear-gradient(90deg,rgba(181,146,85,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.08)_1px,transparent_1px)] bg-[size:28px_28px]"
  },
  mysticism: {
    Icon: Eclipse,
    label: "Union of luminaries",
    glow: "from-crimson/20 via-gold/12 to-transparent",
    etching: "bg-[radial-gradient(ellipse_at_76%_28%,rgba(231,221,204,.13),transparent_22%),radial-gradient(ellipse_at_76%_28%,rgba(181,146,85,.22),transparent_42%)]"
  },
  philosophy: {
    Icon: Landmark,
    label: "Classical column",
    glow: "from-gold/18 via-stone/18 to-transparent",
    etching: "bg-[linear-gradient(90deg,transparent,rgba(181,146,85,.12)_46%,transparent_54%),linear-gradient(140deg,rgba(231,221,204,.06),transparent_50%)]"
  },
  "christian-mysticism": {
    Icon: Cross,
    label: "Rose cross",
    glow: "from-crimson/24 via-gold/16 to-transparent",
    etching: "bg-[radial-gradient(ellipse_at_74%_26%,rgba(122,17,26,.26),transparent_32%),linear-gradient(150deg,rgba(181,146,85,.12),transparent_50%)]"
  },
  symbolism: {
    Icon: Shapes,
    label: "Sigil forms",
    glow: "from-gold/20 via-stone/16 to-transparent",
    etching: "bg-[radial-gradient(circle_at_74%_26%,rgba(181,146,85,.2),transparent_28%),linear-gradient(120deg,rgba(231,221,204,.06),transparent_46%,rgba(122,17,26,.1))]"
  },
  "sacred-architecture": {
    Icon: Church,
    label: "Temple elevation",
    glow: "from-limestone/22 via-gold/14 to-transparent",
    etching: "bg-[linear-gradient(90deg,rgba(181,146,85,.1)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.07)_1px,transparent_1px)] bg-[size:22px_22px]"
  },
  "western-esotericism": {
    Icon: KeyRound,
    label: "Key to the current",
    glow: "from-brass/24 via-crimson/14 to-transparent",
    etching: "bg-[radial-gradient(circle_at_74%_28%,rgba(181,146,85,.22),transparent_30%),linear-gradient(155deg,rgba(122,17,26,.14),transparent_52%)]"
  }
} as const;

function KabbalahLattice() {
  return (
    <svg className="h-20 w-auto text-gold/34 transition duration-500 group-hover:text-gold/55" viewBox="0 0 100 128" aria-hidden="true">
      {[
        [50, 10, 27, 34],
        [50, 10, 73, 34],
        [27, 34, 50, 58],
        [73, 34, 50, 58],
        [27, 34, 27, 78],
        [73, 34, 73, 78],
        [27, 78, 50, 102],
        [73, 78, 50, 102],
        [50, 58, 50, 118],
        [27, 78, 73, 78]
      ].map(([x1, y1, x2, y2], index) => (
        <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.4" />
      ))}
      {[50, 27, 73, 50, 27, 73, 50].map((x, index) => {
        const y = [10, 34, 34, 58, 78, 78, 102][index];
        return <circle key={`${x}-${y}`} cx={x} cy={y} r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

export function TopicPathCard({ topic }: { topic: Topic }) {
  const artwork = topicArtwork[topic.slug as keyof typeof topicArtwork] ?? {
    Icon: Sparkles,
    label: "Archive symbol",
    glow: "from-gold/18 via-crimson/12 to-transparent",
    etching: "bg-[linear-gradient(135deg,rgba(181,146,85,.12),transparent_48%,rgba(122,17,26,.12))]"
  };
  const Icon = artwork.Icon;

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group focus-ring relative isolate flex min-h-[228px] flex-col overflow-hidden rounded border border-gold/25 bg-black/76 p-6 shadow-aureate transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_0_0_1px_rgba(181,146,85,.34),0_28px_80px_rgba(0,0,0,.5)]"
      aria-label={`Explore ${topic.title}`}
    >
      <div className={`absolute inset-0 -z-20 ${artwork.etching} opacity-75 transition duration-500 group-hover:opacity-100`} />
      <div className={`absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b ${artwork.glow} opacity-90`} />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(181,146,85,.08))]" />
      <div className="absolute inset-3 -z-10 border border-gold/10 transition duration-500 group-hover:border-gold/20" />

      <div className="relative z-10 flex justify-end" aria-hidden="true">
        {topic.slug === "kabbalah" ? (
          <KabbalahLattice />
        ) : (
          <div className="grid size-20 place-items-center rounded-full border border-gold/20 bg-black/32 text-gold/40 transition duration-500 group-hover:scale-105 group-hover:border-gold/40 group-hover:text-gold/65">
            <Icon size={40} strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <h3 className="font-manuscript-title font-display text-3xl leading-none text-ivory transition duration-300 group-hover:text-gold">{topic.title}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-parchment">{topic.definition}</p>
      </div>
    </Link>
  );
}
