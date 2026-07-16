import { Clock3, Eye, Sparkles, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EpisodePlayButton } from "@/components/audio/EpisodePlayButton";
import type { Episode } from "@/lib/data/types";
import { formatDate } from "@/lib/format";

function splitEpisodeTitle(title: string) {
  const separators = [" — ", " – ", ": "];
  const separator = separators.find((item) => title.includes(item));
  if (!separator) {
    if (title.length > 56 && title.includes(",")) {
      const [primary, ...rest] = title.split(",");
      return { title: primary.trim(), subtitle: rest.join(",").trim() };
    }
    return { title, subtitle: "" };
  }
  const [primary, ...rest] = title.split(separator);
  return { title: primary.trim(), subtitle: rest.join(separator).trim() };
}

function episodeMeta(episode: Episode) {
  return [
    `Episode ${episode.number}`,
    episode.publishedAt ? formatDate(episode.publishedAt) : episode.publishedLabel,
    episode.duration
  ].filter(Boolean);
}

export function EpisodeCard({ episode }: { episode: Episode }) {
  const heading = splitEpisodeTitle(episode.title);

  return (
    <article className="group relative isolate overflow-hidden rounded border border-gold/25 bg-black/72 shadow-aureate transition duration-500 hover:border-gold/55 hover:shadow-[0_0_0_1px_rgba(181,146,85,.38),0_28px_90px_rgba(0,0,0,.58),0_0_70px_rgba(181,146,85,.12)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(181,146,85,.15),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(122,17,26,.2),transparent_30%),linear-gradient(180deg,rgba(8,8,8,.78),rgba(8,8,8,.94))]" />
      <div className="pointer-events-none absolute inset-3 -z-10 border border-gold/10 transition duration-500 group-hover:border-gold/20" />

      <div className="invisible max-h-0 -translate-y-4 overflow-hidden border-b border-gold/0 bg-obsidian opacity-0 transition-[max-height,opacity,transform,border-color,visibility] duration-700 ease-out motion-reduce:transition-none group-hover:visible group-hover:max-h-[48rem] group-hover:translate-y-0 group-hover:border-gold/15 group-hover:opacity-100 group-focus-within:visible group-focus-within:max-h-[48rem] group-focus-within:translate-y-0 group-focus-within:border-gold/15 group-focus-within:opacity-100">
      <Link href={`/episodes/${episode.slug}`} className="focus-ring relative block overflow-hidden">
        <div className="relative aspect-[21/9] min-h-[240px] w-full overflow-hidden md:min-h-[320px]">
          <Image
            src={episode.coverImage}
            alt=""
            width={1600}
            height={900}
            sizes="(min-width: 1280px) 1180px, 100vw"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl saturate-125 transition duration-700 group-hover:scale-125 group-hover:opacity-48"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(181,146,85,.16),transparent_34%),linear-gradient(90deg,rgba(8,8,8,.88),rgba(8,8,8,.18)_44%,rgba(8,8,8,.88)),linear-gradient(180deg,rgba(8,8,8,.18),rgba(8,8,8,.78))]" />
          <Image
            src={episode.coverImage}
            alt=""
            width={1600}
            height={900}
            sizes="(min-width: 1280px) 1040px, 92vw"
            className="absolute inset-0 m-auto h-[86%] w-[92%] rounded object-contain drop-shadow-[0_18px_44px_rgba(0,0,0,.72)] transition duration-700 group-hover:scale-[1.035] group-hover:drop-shadow-[0_20px_58px_rgba(181,146,85,.22)]"
          />
          <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-x-5 bottom-5 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-70" />
          <div className="absolute left-5 top-5 size-12 border-l border-t border-gold/35 transition duration-500 group-hover:size-16" />
          <div className="absolute right-5 top-5 size-12 border-r border-t border-gold/35 transition duration-500 group-hover:size-16" />
          <div className="absolute bottom-5 left-5 size-12 border-b border-l border-gold/35 transition duration-500 group-hover:size-16" />
          <div className="absolute bottom-5 right-5 size-12 border-b border-r border-gold/35 transition duration-500 group-hover:size-16" />
        </div>
      </Link>
      </div>

      <div className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-[10px] uppercase tracking-[.3em] text-gold">
            {episodeMeta(episode).join("  •  ")}
          </p>
          <h3 className="font-manuscript-title font-display text-4xl uppercase leading-none text-ivory sm:text-5xl">
            <Link href={`/episodes/${episode.slug}`} className="hover:text-gold">{heading.title}</Link>
          </h3>
          <p className="mx-auto mt-4 max-w-3xl font-display text-xl leading-snug text-parchment sm:text-2xl">
            {heading.subtitle || episode.subtitle}
          </p>
          <div className="mx-auto mt-7 flex max-w-2xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="size-2 rotate-45 border border-gold/70" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-3">
          <EpisodePlayButton episode={episode} label="Play Episode" />
          <Link href={`/episodes/${episode.slug}`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gold/50 px-4 text-sm font-semibold uppercase tracking-[.12em] text-ivory hover:bg-gold/10">
            <Eye size={16} />
            View Episode
          </Link>
          {episode.youtubeUrl ? (
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gold/50 px-4 text-sm font-semibold uppercase tracking-[.12em] text-ivory hover:bg-gold/10"
            >
              <Youtube size={16} />
              Watch on YouTube
            </a>
          ) : (
            <Link href={`/episodes/${episode.slug}#show-notes`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gold/50 px-4 text-sm font-semibold uppercase tracking-[.12em] text-ivory hover:bg-gold/10">
              <Sparkles size={16} />
              Show Notes
            </Link>
          )}
        </div>

        <div className="mt-7 flex justify-center text-xs uppercase tracking-[.22em] text-parchment">
          <span className="inline-flex items-center gap-2">
            <Clock3 size={16} className="text-gold" />
            {episode.duration || "Archive"}
          </span>
        </div>
      </div>
    </article>
  );
}
