"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/components/audio/PlayerProvider";
import type { Episode } from "@/lib/data/types";

export function ChapterStartButton({
  episode,
  start,
  title
}: {
  episode: Episode;
  start: number;
  title: string;
}) {
  const { openPlayer, playEpisode } = usePlayer();
  const href = `/episodes/${episode.slug}?t=${start}`;

  if (!episode.audioUrl) {
    return (
      <a className="focus-ring rounded hover:text-gold" href={href}>
        {title}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="focus-ring inline-flex items-center gap-2 rounded text-left hover:text-gold"
      onClick={() => {
        window.history.replaceState(null, "", href);
        playEpisode(episode, start);
        openPlayer();
      }}
    >
      <Play size={16} className="shrink-0 text-gold" />
      <span>{title}</span>
    </button>
  );
}
