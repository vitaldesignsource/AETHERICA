"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/components/audio/PlayerProvider";
import type { Episode } from "@/lib/data/types";

export function EpisodePlayButton({ episode, start = 0, label = "Play" }: { episode: Episode; start?: number; label?: string }) {
  const { openPlayer, playEpisode } = usePlayer();
  if (!episode.audioUrl) return null;

  return (
    <button
      type="button"
      className="focus-ring inline-flex min-h-11 items-center gap-2 rounded bg-gold px-4 py-2 text-sm font-semibold text-obsidian hover:bg-ivory"
      onClick={() => {
        playEpisode(episode, start);
        openPlayer();
      }}
    >
      <Play size={16} />
      {label}
    </button>
  );
}
