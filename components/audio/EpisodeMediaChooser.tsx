"use client";

import { Headphones, Play, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { EpisodePlayButton } from "@/components/audio/EpisodePlayButton";
import type { Episode } from "@/lib/data/types";

function startFromLocation() {
  if (typeof window === "undefined") return 0;
  return Number(new URLSearchParams(window.location.search).get("t") ?? 0) || 0;
}

export function EpisodeMediaChooser({ episode }: { episode: Episode }) {
  const [active, setActive] = useState<"audio" | "video">(episode.audioUrl ? "audio" : "video");
  const start = startFromLocation();
  const videoSrc = useMemo(() => {
    if (!episode.youtubeVideoId) return "";
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1"
    });
    if (start > 0) params.set("start", String(Math.floor(start)));
    return `https://www.youtube.com/embed/${episode.youtubeVideoId}?${params.toString()}`;
  }, [episode.youtubeVideoId, start]);

  if (!episode.audioUrl && !episode.youtubeVideoId) return null;

  return (
    <section className="temple-border mt-8 rounded p-4" aria-label="Episode media player">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-gold">Choose playback</p>
          <h2 className="mt-1 font-display text-2xl text-ivory">Audio or video</h2>
        </div>
        <div className="inline-flex rounded border border-gold/25 bg-obsidian p-1">
          {episode.audioUrl ? (
            <button
              type="button"
              className={`focus-ring inline-flex items-center gap-2 rounded px-4 py-2 text-sm ${active === "audio" ? "bg-gold text-obsidian" : "text-parchment hover:text-ivory"}`}
              onClick={() => setActive("audio")}
            >
              <Headphones size={16} />
              Audio
            </button>
          ) : null}
          {episode.youtubeVideoId ? (
            <button
              type="button"
              className={`focus-ring inline-flex items-center gap-2 rounded px-4 py-2 text-sm ${active === "video" ? "bg-gold text-obsidian" : "text-parchment hover:text-ivory"}`}
              onClick={() => setActive("video")}
            >
              <Video size={16} />
              Video
            </button>
          ) : null}
        </div>
      </div>

      {active === "audio" ? (
        <div className="mt-5 rounded border border-gold/15 bg-black/20 p-5">
          <p className="max-w-2xl leading-7 text-parchment">
            Open the Aetherica audio player with chapter controls, bookmarks, notes, speed, and the live research panel.
          </p>
          <div className="mt-4">
            <EpisodePlayButton episode={episode} start={start} />
          </div>
        </div>
      ) : null}

      {active === "video" && episode.youtubeVideoId ? (
        <div className="mt-5 overflow-hidden rounded border border-gold/20 bg-black shadow-aureate">
          <iframe
            className="aspect-video w-full"
            src={videoSrc}
            title={`${episode.title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/15 p-3">
            <p className="text-sm text-parchment">Video playback uses the public YouTube embed for this episode.</p>
            <a
              href={episode.youtubeUrl ?? `https://www.youtube.com/watch?v=${episode.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded border border-gold/40 px-3 py-2 text-sm text-ivory hover:bg-gold/10"
            >
              <Play size={16} />
              Open on YouTube
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
