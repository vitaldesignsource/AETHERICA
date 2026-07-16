"use client";

import { CalendarPlus, Eye, Play, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePlayer } from "@/components/audio/PlayerProvider";
import type { LivingArchiveSlide } from "./types";

const slideIcons = {
  "ask-aetherica": Search,
  event: CalendarPlus,
  "weekly-mystery": Sparkles,
  episode: Eye,
  path: Eye,
  topic: Eye,
  guest: Eye
} satisfies Record<LivingArchiveSlide["type"], typeof Eye>;

const themeFrame: Record<NonNullable<LivingArchiveSlide["theme"]>, string> = {
  crimson: "from-crimson/60 via-gold/18 to-black/80",
  gold: "from-gold/34 via-brass/22 to-black/80",
  celestial: "from-stone/50 via-gold/14 to-black/82",
  alchemical: "from-burgundy/66 via-gold/18 to-black/82",
  stone: "from-limestone/18 via-crimson/24 to-black/84"
};

const visualOverlays: Record<NonNullable<LivingArchiveSlide["visualStyle"]>, string> = {
  "episode-art": "bg-[radial-gradient(circle_at_72%_48%,rgba(181,146,85,.18),transparent_30%),linear-gradient(90deg,rgba(8,8,8,.95),rgba(8,8,8,.68)_56%,rgba(8,8,8,.82))]",
  "temple-corridor": "bg-[radial-gradient(ellipse_at_78%_44%,rgba(181,146,85,.24),transparent_34%),radial-gradient(circle_at_86%_72%,rgba(122,17,26,.26),transparent_24%),linear-gradient(90deg,rgba(8,8,8,.96),rgba(8,8,8,.74)_52%,rgba(8,8,8,.45))]",
  "archive-lens": "bg-[radial-gradient(circle_at_76%_45%,rgba(181,146,85,.3),transparent_18%),radial-gradient(circle_at_80%_45%,rgba(42,54,72,.28),transparent_33%),linear-gradient(90deg,rgba(8,8,8,.96),rgba(8,8,8,.78)_54%,rgba(8,8,8,.5))]",
  "crimson-hall": "bg-[radial-gradient(ellipse_at_78%_40%,rgba(122,17,26,.38),transparent_30%),radial-gradient(circle_at_86%_72%,rgba(181,146,85,.18),transparent_24%),linear-gradient(90deg,rgba(8,8,8,.97),rgba(8,8,8,.77)_54%,rgba(20,6,8,.52))]",
  "manuscript-table": "bg-[radial-gradient(circle_at_78%_58%,rgba(181,146,85,.28),transparent_22%),radial-gradient(ellipse_at_82%_36%,rgba(122,17,26,.24),transparent_34%),linear-gradient(90deg,rgba(8,8,8,.97),rgba(8,8,8,.78)_52%,rgba(36,25,14,.5))]"
};

function PortalPhotographicTreatment({ style }: { style: NonNullable<LivingArchiveSlide["visualStyle"]> }) {
  if (style === "episode-art") return null;

  return (
    <div className="pointer-events-none absolute inset-y-8 right-6 hidden w-[42%] overflow-hidden rounded border border-gold/20 bg-black/28 shadow-[inset_0_0_80px_rgba(0,0,0,.82),0_24px_70px_rgba(0,0,0,.5)] lg:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.08),transparent_22%,rgba(181,146,85,.12)_42%,transparent_58%),radial-gradient(circle_at_50%_50%,rgba(181,146,85,.2),transparent_38%)]" />
      {style === "temple-corridor" ? (
        <>
          <div className="absolute inset-x-[18%] top-0 h-full border-x border-gold/18" />
          <div className="absolute inset-x-[30%] top-0 h-full border-x border-gold/14" />
          <div className="absolute bottom-0 left-1/2 h-[80%] w-[44%] -translate-x-1/2 rounded-t-full border border-gold/28 bg-[radial-gradient(ellipse_at_50%_58%,rgba(181,146,85,.3),transparent_42%),linear-gradient(180deg,rgba(122,17,26,.24),rgba(0,0,0,.58))]" />
        </>
      ) : null}
      {style === "archive-lens" ? (
        <>
          <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
          <div className="absolute left-1/2 top-1/2 aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/18 blur-sm" />
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom bg-gold/20" style={{ transform: `translate(-50%, -100%) rotate(${index * 36}deg)` }} />
          ))}
        </>
      ) : null}
      {style === "crimson-hall" ? (
        <>
          <div className="absolute inset-y-0 left-[18%] w-8 bg-gradient-to-r from-black/60 via-gold/16 to-black/60" />
          <div className="absolute inset-y-0 right-[18%] w-8 bg-gradient-to-r from-black/60 via-gold/16 to-black/60" />
          <div className="absolute inset-x-[20%] top-12 h-24 rounded-full border-t border-gold/30" />
          <div className="absolute bottom-8 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-crimson/38 blur-2xl" />
        </>
      ) : null}
      {style === "manuscript-table" ? (
        <>
          <div className="absolute bottom-10 left-1/2 h-[46%] w-[72%] -translate-x-1/2 rotate-[-4deg] rounded border border-gold/25 bg-[linear-gradient(135deg,rgba(231,221,204,.24),rgba(181,146,85,.08))] shadow-[0_20px_50px_rgba(0,0,0,.55)]" />
          <div className="absolute bottom-24 left-[30%] h-20 w-20 rounded-full bg-gold/22 blur-2xl" />
          <div className="absolute bottom-20 right-[25%] h-32 w-px bg-gradient-to-t from-gold/55 to-transparent" />
        </>
      ) : null}
    </div>
  );
}

function PortalAudioButton({ slide }: { slide: LivingArchiveSlide }) {
  const player = usePlayer();
  if (!slide.audioAction) return null;

  return (
    <button
      type="button"
      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[.12em] text-obsidian transition hover:bg-ivory"
      onClick={(event) => {
        event.stopPropagation();
        player.playEpisode(slide.audioAction!.episode, slide.audioAction!.start);
        player.openPlayer();
      }}
    >
      <Play size={16} />
      {slide.audioAction.label ?? "Play Episode"}
    </button>
  );
}

function titleScaleClass(title: string) {
  if (title.length > 88) return "text-[clamp(1.65rem,2.7vw,3.05rem)] leading-[1]";
  if (title.length > 58) return "text-[clamp(1.85rem,3.1vw,3.45rem)] leading-[.98]";
  return "text-[clamp(2.35rem,5vw,5.35rem)] leading-[.92]";
}

function descriptionClass(description: string, longContent: boolean) {
  const scale = description.length > 230 ? "text-sm leading-6 sm:text-base" : "text-base leading-7 sm:text-lg";
  return longContent ? `${scale} [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden` : scale;
}

export function LivingArchiveSlide({
  slide,
  index,
  activeIndex,
  total,
  onSelect,
  dragActive
}: {
  slide: LivingArchiveSlide;
  index: number;
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
  dragActive: boolean;
}) {
  const offset = index - activeIndex;
  const visible = Math.abs(offset) <= 1;
  const isActive = offset === 0;
  const Icon = slideIcons[slide.type];
  const theme = slide.theme ?? "crimson";
  const visualStyle = slide.visualStyle ?? "episode-art";
  const longContent = slide.title.length > 82 || slide.description.length > 260;

  return (
    <motion.article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${slide.title}`}
      className={`absolute left-1/2 top-0 h-full w-[88%] max-w-[980px] -translate-x-1/2 sm:w-[72%] lg:w-[66%] ${
        isActive ? "z-20" : "z-10 cursor-pointer"
      } ${visible ? "" : "pointer-events-none"}`}
      initial={false}
      animate={{
        x: `calc(-50% + ${offset * 72}%)`,
        y: isActive ? 0 : 18,
        scale: isActive ? 1 : 0.88,
        rotateY: isActive ? 0 : offset < 0 ? 11 : -11,
        opacity: visible ? (isActive ? 1 : 0.48) : 0
      }}
      transition={{ type: "spring", stiffness: 92, damping: 26, mass: 1.15 }}
      onClick={() => {
        if (!isActive && !dragActive) onSelect(index);
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="group relative h-full overflow-hidden rounded border border-gold/35 bg-obsidian shadow-[0_28px_120px_rgba(0,0,0,.7)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.055),transparent_20%,rgba(181,146,85,.06)_42%,transparent_62%),repeating-linear-gradient(90deg,rgba(255,255,255,.025)_0_1px,transparent_1px_7px)] opacity-70" />
        <div className={`absolute inset-0 bg-gradient-to-br ${themeFrame[theme]} opacity-80`} />
        <div className="absolute inset-[10px] border border-gold/18" />
        <div className="absolute inset-[18px] rounded-sm border border-black/60 shadow-[inset_0_0_0_1px_rgba(181,146,85,.22),inset_0_0_90px_rgba(0,0,0,.82)]" />
        <div className="absolute left-5 top-5 size-14 border-l border-t border-gold/45" />
        <div className="absolute right-5 top-5 size-14 border-r border-t border-gold/45" />
        <div className="absolute bottom-5 left-5 size-14 border-b border-l border-gold/45" />
        <div className="absolute bottom-5 right-5 size-14 border-b border-r border-gold/45" />

        {slide.image ? (
          <>
            <Image
              src={slide.image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 1280px) 760px, (min-width: 768px) 72vw, 88vw"
              className="object-cover opacity-22 blur-sm saturate-125 transition duration-700 group-hover:scale-105 group-hover:opacity-30"
            />
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              width={900}
              height={900}
              priority={index === 0}
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 34vw, 62vw"
              className={`absolute bottom-8 right-6 hidden max-h-[62%] w-[38%] rounded-sm object-contain opacity-75 drop-shadow-[0_20px_46px_rgba(0,0,0,.84)] lg:block ${
                visualStyle === "episode-art" ? "" : "mix-blend-screen saturate-125"
              }`}
            />
          </>
        ) : null}

        <PortalPhotographicTreatment style={visualStyle} />
        <div className={`absolute inset-0 ${visualOverlays[visualStyle]}`} />
        <div className={`relative flex h-full flex-col justify-center p-6 sm:p-8 lg:p-12 ${longContent ? "gap-2 lg:justify-start lg:py-10" : ""}`}>
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex min-h-11 items-center gap-3 rounded-full border border-gold/35 bg-black/42 px-4 text-xs uppercase tracking-[.22em] text-gold backdrop-blur">
              <Icon size={16} />
              {slide.eyebrow ?? slide.type}
            </div>
            <h3 className={`font-manuscript-title max-w-[15ch] [text-wrap:balance] font-display text-ivory ${titleScaleClass(slide.title)}`}>{slide.title}</h3>
            <p className={`mt-4 max-w-xl text-parchment ${descriptionClass(slide.description, longContent)}`}>{slide.description}</p>
          </div>

          {slide.preview ? (
            <div className="mt-5 max-w-xl rounded border border-gold/25 bg-black/48 p-4 backdrop-blur">
              <p className="text-sm italic text-ivory">&ldquo;{slide.preview.prompt}&rdquo;</p>
              <div className="mt-3 grid gap-1 text-sm text-parchment">
                <span className="text-gold">{slide.preview.resultTitle}</span>
                <span>{slide.preview.speaker} · {slide.preview.timestamp}</span>
                <span>{slide.preview.relatedText}</span>
              </div>
            </div>
          ) : null}

          {slide.metadata?.length ? (
            <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              {slide.metadata.map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded border border-gold/20 bg-black/38 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-[.18em] text-gold">{item.label}</dt>
                  <dd className="mt-1 text-sm text-ivory">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className={`${longContent ? "mt-4" : "mt-7"} flex flex-col gap-3 sm:flex-row sm:flex-wrap`}>
            <PortalAudioButton slide={slide} />
            <Link
              href={slide.primaryAction.href}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded bg-ivory px-5 py-2.5 text-sm font-semibold uppercase tracking-[.12em] text-obsidian transition hover:bg-gold"
              onClick={(event) => event.stopPropagation()}
            >
              <Eye size={16} />
              {slide.primaryAction.label}
            </Link>
            {slide.secondaryAction ? (
              <Link
                href={slide.secondaryAction.href}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gold/50 bg-black/36 px-5 py-2.5 text-sm font-semibold uppercase tracking-[.12em] text-ivory transition hover:bg-gold/10"
                onClick={(event) => event.stopPropagation()}
              >
                {slide.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        {!isActive ? <div className="absolute inset-0 bg-black/30" aria-hidden="true" /> : null}
      </div>
    </motion.article>
  );
}
