"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/audio/PlayerProvider";
import type { Episode } from "@/lib/data/types";

/**
 * Opens the player from the URL: `?t=1234` starts at that second, `?autoplay=1` starts playing.
 * Both are how a shared timestamp link and the autoplay-next hand-off arrive.
 *
 * The episode object stays server-rendered and is handed in as a prop, so no episode catalogue
 * is shipped to the browser to make this work.
 */
export function EpisodeDeepLink({
  episode,
  upNext
}: {
  episode: Episode;
  upNext?: { slug: string; title: string } | null;
}) {
  const { playEpisode, openPlayer } = usePlayer();
  // A deep link should fire once for the page, not again on every re-render.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const params = new URLSearchParams(window.location.search);
    const rawTime = params.get("t");
    const autoplay = params.get("autoplay") === "1";
    const seconds = rawTime === null ? null : Number(rawTime);
    const hasTime = seconds !== null && Number.isFinite(seconds) && seconds >= 0;
    if (!hasTime && !autoplay) return;

    started.current = true;
    playEpisode(episode, hasTime ? seconds : undefined, upNext ?? null);
    // A timestamp link is a request to look at a moment, so show the full player for it.
    if (hasTime) openPlayer();
  }, [episode, openPlayer, playEpisode, upNext]);

  return null;
}
