"use client";

import Image from "next/image";
import {
  AlertTriangle,
  BookOpen,
  BookmarkPlus,
  Check,
  ChevronDown,
  Compass,
  Download,
  Gauge,
  Link2,
  ListMusic,
  Loader2,
  Maximize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Share2,
  SkipForward,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type { ReactNode } from "react";
import type { Chapter, Episode } from "@/lib/data/types";
import {
  hermeticTreePaths,
  hermeticTreePositions,
  type HermeticTreeNodeId
} from "@/lib/data/hermeticTreeGeometry";
import { formatSeconds } from "@/lib/format";

type PlayerMode = "astrological" | "qabalistic";
type PlayerStatus = "idle" | "loading" | "ready" | "error";
type UpNext = { slug: string; title: string };
type PlayerPanel = "now-playing" | "chapters" | "notes" | "settings";

type BookmarkEntry = {
  id: string;
  position: number;
  title: string;
  note: string;
  createdAt: string;
};

type PlayerContextValue = {
  current: Episode | null;
  playEpisode: (episode: Episode, start?: number, upNext?: UpNext | null) => void;
  seek: (seconds: number) => void;
  openPlayer: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

const playerPanels: Array<[PlayerPanel, string, typeof Play]> = [
  ["now-playing", "Now Playing", Play],
  ["chapters", "Chapters", ListMusic],
  ["notes", "Notes", BookOpen],
  ["settings", "Settings", Gauge]
];

const speeds = [0.75, 1, 1.25, 1.5, 1.75, 2];
const nextSpeed = (value: number) => speeds[(speeds.indexOf(value) + 1) % speeds.length] ?? 1;

const zodiac = ["♈︎", "♉︎", "♊︎", "♋︎", "♌︎", "♍︎", "♎︎", "♏︎", "♐︎", "♑︎", "♒︎", "♓︎"];
const qabalisticNodes: Array<{ id: HermeticTreeNodeId; number: string; name: string; hebrew: string }> = [
  { id: "kether", number: "1", name: "Kether", hebrew: "כתר" },
  { id: "chokmah", number: "2", name: "Chokmah", hebrew: "חכמה" },
  { id: "binah", number: "3", name: "Binah", hebrew: "בינה" },
  { id: "daath", number: "11", name: "Da'ath", hebrew: "דעת" },
  { id: "chesed", number: "4", name: "Chesed", hebrew: "חסד" },
  { id: "gevurah", number: "5", name: "Gevurah", hebrew: "גבורה" },
  { id: "tiphareth", number: "6", name: "Tiphareth", hebrew: "תפארת" },
  { id: "netzach", number: "7", name: "Netzach", hebrew: "נצח" },
  { id: "hod", number: "8", name: "Hod", hebrew: "הוד" },
  { id: "yesod", number: "9", name: "Yesod", hebrew: "יסוד" },
  { id: "malkuth", number: "10", name: "Malkuth", hebrew: "מלכות" }
];

function readPlayerBookmarks() {
  if (typeof window === "undefined") return {};
  const saved = window.localStorage.getItem("aetherica-player-bookmarks");
  if (!saved) return {};
  try {
    return JSON.parse(saved) as Record<string, BookmarkEntry[]>;
  } catch {
    return {};
  }
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}

function activeChapter(chapters: Chapter[], position: number) {
  return chapters.reduce<Chapter | null>((active, chapter) => (chapter.start <= position ? chapter : active), null);
}

function activeSegment(episode: Episode | null, position: number) {
  if (!episode) return null;
  return episode.transcript.find((segment) => segment.start <= position && segment.end >= position) ?? null;
}

function transcriptPreview(episode: Episode | null) {
  if (!episode) return "Select an episode to open the temple player.";
  if (episode.transcript[0]?.text) return episode.transcript[0].text;
  return episode.description || episode.longIntroduction.split("\n")[0] || "Show notes will appear here.";
}

function safePlay(audio: HTMLAudioElement | null | undefined) {
  if (!audio) return;
  void audio.play().catch(() => {
    setTimeout(() => {
      void audio.play().catch(() => undefined);
    }, 120);
  });
}

function liveContext(episode: Episode | null, chapter: Chapter | null, position: number) {
  if (!episode) {
    return {
      topic: "Select an episode",
      person: "Aetherica",
      book: "The Commonplace Book",
      symbol: "Aether",
      definition: "The player will surface chapter, topic, book, and symbol context while audio plays.",
      related: "Search the spoken archive"
    };
  }

  const text = [chapter?.title, episode.title, episode.description, episode.longIntroduction].join(" ").toLowerCase();
  const topic = episode.topics.find((item) => text.includes(item.toLowerCase())) ?? episode.topics[0] ?? "Western Esotericism";
  const definitions: Record<string, string> = {
    Alchemy: "A language of transformation joining matter, symbol, discipline, and soul.",
    Theurgy: "Sacred action ordered toward divine participation and the transformation of the practitioner.",
    Hermeticism: "A family of philosophical and esoteric currents associated with Hermes Trismegistus.",
    Astrology: "A symbolic cosmology relating celestial order to earthly life and interpretation.",
    Kabbalah: "A Jewish mystical tradition and later esoteric reception centered on creation, emanation, and return.",
    Freemasonry: "An initiatic fraternity using architecture, tools, and ritual as moral symbolism.",
    Symbolism: "The disciplined study of images, correspondences, signs, rites, and meanings.",
    Mysticism: "Contemplative disciplines concerned with direct knowledge, union, and transformation."
  };
  const book = text.includes("agrippa")
    ? "Three Books of Occult Philosophy"
    : text.includes("qabalah") || text.includes("dion fortune")
      ? "The Mystical Qabalah"
      : text.includes("kybalion")
        ? "The Kybalion"
        : "A Formless Fire";
  const symbol = text.includes("tree") || text.includes("qabalah")
    ? "Tree of Life"
    : text.includes("color")
      ? "Flashing colors"
      : text.includes("planet") || text.includes("astrology")
        ? "Planetary order"
        : "Aether";

  return {
    topic,
    person: episode.guest || episode.hosts.join(" & "),
    book,
    symbol,
    definition: definitions[topic] ?? "A connected archive topic currently shaping this listening moment.",
    related: chapter ? `${chapter.title} at ${formatSeconds(chapter.start)}` : `${formatSeconds(position)} in ${episode.title}`
  };
}

function WheelPlayer({
  mode,
  playing,
  progress,
  onToggle
}: {
  mode: PlayerMode;
  playing: boolean;
  progress: number;
  onToggle: () => void;
}) {
  if (mode === "qabalistic") {
    return (
      <div className="relative mx-auto aspect-[5/9] w-full max-w-[23rem] overflow-hidden rounded border border-gold/35 bg-[radial-gradient(circle_at_50%_52%,rgba(181,146,85,.18),transparent_32%),linear-gradient(180deg,rgba(7,5,4,.96),rgba(18,12,8,.98))] shadow-aureate">
        <div className="pointer-events-none absolute inset-y-[1.5%] left-[44%] right-[44%] border-x border-gold/15 bg-gold/[.035]" />
        <div className="pointer-events-none absolute inset-y-[1.5%] left-[17%] w-[10%] border-x border-gold/10" />
        <div className="pointer-events-none absolute inset-y-[1.5%] right-[17%] w-[10%] border-x border-gold/10" />
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {hermeticTreePaths.map((path) => {
            const source = hermeticTreePositions[path.source];
            const target = hermeticTreePositions[path.target];
            return (
              <g key={path.id}>
                <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="rgba(0,0,0,.86)" strokeWidth="2.3" strokeLinecap="round" />
                <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="rgba(204,166,92,.84)" strokeWidth="1.08" strokeLinecap="round" />
              </g>
            );
          })}
        </svg>
        {qabalisticNodes.map(({ id, number, name, hebrew }) => {
          const coords = hermeticTreePositions[id];
          const isActive = id === "tiphareth";
          const isHidden = id === "daath";
          const content = (
            <>
              <span className="text-[clamp(.52rem,1.25vw,.68rem)] leading-none">{number}</span>
              <span className="font-display text-[clamp(.55rem,1.5vw,.78rem)] leading-tight">{name}</span>
              <span className="torah-hebrew-letter text-[clamp(.72rem,2vw,1.08rem)] leading-none" dir="rtl">{hebrew}</span>
              {isActive ? <span className="mt-0.5">{playing ? <Pause size={20} /> : <Play size={20} />}</span> : null}
            </>
          );
          const nodeClass = `absolute z-10 grid aspect-square -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border px-1 text-center shadow-aureate ${
            isActive
              ? "w-[20%] border-gold bg-gold text-obsidian shadow-[0_0_42px_rgba(181,146,85,.6)]"
              : isHidden
                ? "w-[13%] border-dashed border-limestone/45 bg-obsidian/88 text-limestone"
                : "w-[17%] border-gold/55 bg-obsidian/95 text-parchment"
          }`;
          if (isActive) {
            return (
              <button
                key={id}
                type="button"
                onClick={onToggle}
                className={`focus-ring ${nodeClass}`}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                aria-label={playing ? "Pause episode" : "Play episode"}
              >
                {content}
              </button>
            );
          }
          return (
            <div
              key={id}
              className={nodeClass}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {content}
            </div>
          );
        })}
        <div className="absolute inset-x-[12%] bottom-[.7%] z-20 h-1 overflow-hidden rounded-full bg-obsidian">
          <div className="h-full bg-gradient-to-r from-crimson to-gold" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full border border-gold/35 bg-charcoal shadow-aureate">
      <div className="absolute inset-4 rounded-full border border-brass/30" />
      <div className="absolute inset-14 rounded-full border border-gold/20" />
      <div className="absolute inset-24 rounded-full border border-crimson/35" />
      {zodiac.map((sign, index) => {
        const angle = (index / zodiac.length) * 360 - 90;
        return (
          <div
            key={sign}
            className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center before:absolute before:size-12 before:rounded-full before:bg-gold/10 before:blur-xl before:content-['']"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -220%) rotate(${-angle}deg)`
            }}
          >
            <span
              className="relative font-serif text-[3.35rem] leading-none text-gold"
              style={{
                textShadow:
                  "0 1px 0 rgba(255,255,255,.35), 0 2px 0 rgba(46,31,10,.9), 0 0 14px rgba(181,146,85,.78), 0 0 32px rgba(122,17,26,.55)"
              }}
            >
              {sign}
            </span>
          </div>
        );
      })}
      <div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,rgba(181,146,85,.35),transparent_42%),conic-gradient(from_0deg,rgba(122,17,26,.7),rgba(181,146,85,.2),rgba(122,17,26,.7))] opacity-75" />
      <Compass className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 text-gold/40" />
      <button
        type="button"
        onClick={onToggle}
        className="focus-ring absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-obsidian shadow-[0_0_42px_rgba(181,146,85,.72)]"
        aria-label={playing ? "Pause episode" : "Play episode"}
      >
        {playing ? <Pause size={34} /> : <Play size={34} />}
      </button>
      <div className="absolute inset-x-12 bottom-8 h-2 overflow-hidden rounded-full bg-obsidian">
        <div className="h-full bg-gradient-to-r from-crimson to-gold" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<Episode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<PlayerMode>("astrological");
  const [expanded, setExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<PlayerPanel>("now-playing");
  const [bookmarkNote, setBookmarkNote] = useState("");
  const [bookmarksByEpisode, setBookmarksByEpisode] = useState<Record<string, BookmarkEntry[]>>(readPlayerBookmarks);
  /** Distinguishes "nothing chosen yet" from "fetching" from "this episode will not play". */
  const [status, setStatus] = useState<PlayerStatus>("idle");
  /** Epoch ms at which playback should stop, or null when the sleep timer is off. */
  const [sleepEndsAt, setSleepEndsAt] = useState<number | null>(null);
  /** Whole minutes left, kept as state because Date.now() must not be read during render. */
  const [sleepRemaining, setSleepRemaining] = useState<number | null>(null);
  const [autoplayNext, setAutoplayNext] = useState(false);
  /** Where "play next" should go, supplied by whichever page started this episode. */
  const [upNext, setUpNext] = useState<UpNext | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const currentRef = useRef<Episode | null>(null);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const seek = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(seconds, audioRef.current.duration || seconds));
    audioRef.current.currentTime = next;
    setPosition(next);
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (playing) audio.pause();
    else safePlay(audio);
  }, [current, playing]);

  const playFrom = useCallback((seconds: number) => {
    seek(seconds);
    if (audioRef.current && current) safePlay(audioRef.current);
  }, [current, seek]);

  const playEpisode = useCallback((episode: Episode, start?: number, nextUp?: UpNext | null) => {
    if (!episode.audioUrl) return;
    setUpNext(nextUp ?? null);
    setStatus("loading");
    setCurrent((existing) => {
      const same = existing?.guid === episode.guid;
      requestAnimationFrame(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!same) audio.src = episode.audioUrl ?? "";
        const saved = Number(localStorage.getItem(`aetherica-progress:${episode.guid}`) ?? 0);
        audio.currentTime = start ?? saved;
        audio.playbackRate = speed;
        safePlay(audio);
      });
      return episode;
    });
  }, [speed]);

  const retry = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !current?.audioUrl) return;
    setStatus("loading");
    const at = audio.currentTime;
    audio.load();
    audio.currentTime = at;
    safePlay(audio);
  }, [current]);

  /** Absolute link to this exact moment, e.g. /episodes/slug?t=1234 */
  const shareUrl = useCallback(
    (seconds?: number) => {
      if (!current) return "";
      const base = `${window.location.origin}/episodes/${current.slug}`;
      return seconds === undefined ? base : `${base}?t=${Math.floor(seconds)}`;
    },
    [current]
  );

  const copyLink = useCallback(
    async (seconds: number | undefined, key: string) => {
      const url = shareUrl(seconds);
      if (!url) return;
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        return;
      }
      setCopied(key);
      window.setTimeout(() => setCopied((value) => (value === key ? null : value)), 2000);
    },
    [shareUrl]
  );

  /**
   * `ended` fires from a listener bound once per episode, so the autoplay behaviour is reached
   * through a ref rather than by re-binding the listener whenever the setting changes.
   */
  const endedRef = useRef<(() => void) | null>(null);
  const nextRef = useRef<(() => void) | null>(null);
  const goToNext = useCallback(() => {
    if (!upNext) return;
    // The full Episode (transcript, chapters) is far too heavy to hold in a client-side queue, so
    // the next episode is reached through its own page, which already has the data server-side.
    window.location.href = `/episodes/${upNext.slug}?autoplay=1`;
  }, [upNext]);

  useEffect(() => {
    nextRef.current = goToNext;
    endedRef.current = () => {
      if (autoplayNext && upNext) goToNext();
    };
  }, [autoplayNext, goToNext, upNext]);

  // Sleep timer. Held as an absolute deadline rather than a counter so it stays accurate when the
  // tab is backgrounded and timers are throttled. One timeout pauses playback; a slow interval
  // only exists to re-render the remaining-minutes readout.
  useEffect(() => {
    if (sleepEndsAt === null) return;
    const id = window.setTimeout(() => {
      audioRef.current?.pause();
      setSleepEndsAt(null);
      setSleepRemaining(null);
    }, Math.max(0, sleepEndsAt - Date.now()));
    return () => window.clearTimeout(id);
  }, [sleepEndsAt]);

  useEffect(() => {
    if (sleepEndsAt === null) return;
    const id = window.setInterval(
      () => setSleepRemaining(Math.max(0, Math.ceil((sleepEndsAt - Date.now()) / 60_000))),
      20_000
    );
    return () => window.clearInterval(id);
  }, [sleepEndsAt]);

  useEffect(() => {
    if (!expanded) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [expanded]);

  // Keyboard transport. Ignored while the reader is typing, so the bookmark note still works.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const audio = audioRef.current;
      if (!audio || !currentRef.current) return;

      switch (event.key) {
        case " ":
        case "k":
        case "K":
          event.preventDefault();
          if (audio.paused) safePlay(audio);
          else audio.pause();
          break;
        case "ArrowLeft":
          event.preventDefault();
          seek(audio.currentTime - 15);
          break;
        case "ArrowRight":
          event.preventDefault();
          seek(audio.currentTime + 30);
          break;
        case "j":
        case "J":
          event.preventDefault();
          seek(audio.currentTime - 15);
          break;
        case "l":
        case "L":
          event.preventDefault();
          seek(audio.currentTime + 30);
          break;
        case "m":
        case "M":
          event.preventDefault();
          setMuted((value) => !value);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seek]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedMode = window.localStorage.getItem("aetherica-player-mode");
      if (savedMode === "astrological" || savedMode === "qabalistic") setMode(savedMode);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
    audio.playbackRate = speed;
  }, [muted, speed, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setPosition(audio.currentTime);
      if (current) localStorage.setItem(`aetherica-progress:${current.guid}`, String(audio.currentTime));
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onDuration = () => setDuration(audio.duration || current?.durationSeconds || 0);
    // Episodes are hour-long remote MP3s. Without these the bar sits mute and motionless while a
    // file downloads, and a dead URL leaves a play button that simply never does anything.
    const onWaiting = () => setStatus("loading");
    const onCanPlay = () => setStatus("ready");
    const onPlaying = () => setStatus("ready");
    const onError = () => {
      setStatus("error");
      setPlaying(false);
    };
    const onEnded = () => {
      setPlaying(false);
      // Finished means finished: drop the saved position so the episode does not resume at its end.
      if (current) localStorage.removeItem(`aetherica-progress:${current.guid}`);
      endedRef.current?.();
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("stalled", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("stalled", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, [current]);

  // Metadata only depends on the episode. Registering it per-tick (the old code listed `position`
  // as a dependency, so this ran on every timeupdate) rebuilt MediaMetadata several times a second
  // and made lock-screen artwork flicker.
  useEffect(() => {
    if (!("mediaSession" in navigator) || !current) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: current.hosts.join(", "),
      album: "Aetherica Podcast",
      artwork: [{ src: current.coverImage, sizes: "512x512", type: "image/png" }]
    });
  }, [current]);

  // Handlers are registered once and read live values through the audio element, so they never
  // need re-binding. `seekto` is what lets the OS/lock-screen scrubber move the playhead.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    const rel = (delta: number) => () => {
      const audio = audioRef.current;
      if (audio) seek(audio.currentTime + delta);
    };
    const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
      ["play", () => safePlay(audioRef.current)],
      ["pause", () => audioRef.current?.pause()],
      ["seekbackward", rel(-15)],
      ["seekforward", rel(30)],
      ["seekto", (details) => {
        if (typeof details.seekTime === "number") seek(details.seekTime);
      }],
      ["nexttrack", () => nextRef.current?.()]
    ];
    for (const [action, handler] of handlers) {
      try {
        ms.setActionHandler(action, handler);
      } catch {
        // Safari throws on actions it does not implement rather than ignoring them.
      }
    }
    return () => {
      for (const [action] of handlers) {
        try {
          ms.setActionHandler(action, null);
        } catch {
          // same
        }
      }
    };
  }, [seek]);

  // Feeds the OS its own progress bar. Throttled to whole seconds so it is not written per tick.
  const lastPositionStateRef = useRef(-1);
  useEffect(() => {
    if (!("mediaSession" in navigator) || !navigator.mediaSession.setPositionState) return;
    const total = duration || current?.durationSeconds || 0;
    if (!total || !Number.isFinite(total)) return;
    const whole = Math.floor(position);
    if (whole === lastPositionStateRef.current) return;
    lastPositionStateRef.current = whole;
    try {
      navigator.mediaSession.setPositionState({
        duration: total,
        playbackRate: speed,
        position: Math.min(position, total)
      });
    } catch {
      // Some browsers reject a position state mid-seek; the next tick corrects it.
    }
  }, [position, duration, speed, current]);

  useEffect(() => {
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = playing ? "playing" : "paused";
  }, [playing]);

  const selectMode = (nextMode: PlayerMode) => {
    setMode(nextMode);
    localStorage.setItem("aetherica-player-mode", nextMode);
  };

  const saveBookmarks = (next: Record<string, BookmarkEntry[]>) => {
    setBookmarksByEpisode(next);
    localStorage.setItem("aetherica-player-bookmarks", JSON.stringify(next));
  };

  const addBookmark = () => {
    if (!current) return;
    const nextBookmark: BookmarkEntry = {
      id: crypto.randomUUID(),
      position,
      title: chapter?.title ?? current.title,
      note: bookmarkNote.trim(),
      createdAt: new Date().toISOString()
    };
    saveBookmarks({
      ...bookmarksByEpisode,
      [current.guid]: [nextBookmark, ...(bookmarksByEpisode[current.guid] ?? [])]
    });
    setBookmarkNote("");
    setActivePanel("notes");
  };

  const removeBookmark = (id: string) => {
    if (!current) return;
    saveBookmarks({
      ...bookmarksByEpisode,
      [current.guid]: (bookmarksByEpisode[current.guid] ?? []).filter((bookmark) => bookmark.id !== id)
    });
  };

  const progress = duration || current?.durationSeconds ? (position / (duration || current?.durationSeconds || 1)) * 100 : 0;
  const chapter = current ? activeChapter(current.chapters, position) : null;
  const segment = activeSegment(current, position);
  const context = liveContext(current, chapter, position);
  const bookmarks = current ? bookmarksByEpisode[current.guid] ?? [] : [];
  const templeBackdrop =
    mode === "astrological"
      ? "bg-[radial-gradient(circle_at_50%_42%,rgba(181,146,85,.24),transparent_34%),repeating-radial-gradient(circle_at_50%_44%,rgba(181,146,85,.16)_0_1px,transparent_1px_46px),conic-gradient(from_18deg_at_50%_44%,rgba(122,17,26,.36),rgba(181,146,85,.14),rgba(26,33,43,.44),rgba(122,17,26,.36)),linear-gradient(180deg,rgba(10,10,10,.88),rgba(8,8,8,.74))]"
      : "bg-[linear-gradient(90deg,rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.06)_1px,transparent_1px),radial-gradient(circle_at_50%_48%,rgba(181,146,85,.25),transparent_31%),linear-gradient(135deg,rgba(122,17,26,.26),rgba(8,8,8,.86)_48%,rgba(181,146,85,.16))]";
  const templeAccent =
    mode === "astrological"
      ? "before:absolute before:inset-8 before:rounded-full before:border before:border-gold/10 after:absolute after:inset-x-10 after:top-20 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gold/35 after:to-transparent"
      : "before:absolute before:inset-x-[18%] before:inset-y-10 before:border-x before:border-gold/10 after:absolute after:left-1/2 after:top-10 after:h-[calc(100%-5rem)] after:w-px after:bg-gradient-to-b after:from-gold/5 after:via-gold/35 after:to-gold/5";
  const value = useMemo(
    () => ({ current, playEpisode, seek, openPlayer: () => setExpanded(true) }),
    [current, playEpisode, seek]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />

      {expanded ? (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-obsidian/96 text-ivory backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Aetherica full audio player">
          {status === "error" ? (
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-crimson/50 bg-crimson/20 px-4 py-3 text-sm backdrop-blur" role="alert">
              <AlertTriangle size={16} className="shrink-0 text-crimson" />
              <span className="min-w-0 flex-1">This episode&rsquo;s audio could not be loaded.</span>
              <button type="button" onClick={retry} className="focus-ring shrink-0 rounded border border-gold/40 px-3 py-1 text-xs uppercase tracking-[.14em] text-gold hover:bg-gold/10">
                Try again
              </button>
            </div>
          ) : null}
          <div className="mx-auto grid min-h-svh max-w-[1800px] gap-0 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] xl:grid-cols-[72px_300px_minmax(420px,1fr)_320px] 2xl:grid-cols-[88px_360px_minmax(460px,1fr)_380px]">
            <nav className="hidden border-r border-gold/15 bg-black/35 px-3 py-6 xl:grid" aria-label="Player sections">
              {playerPanels.map(([panel, label, Icon]) => (
                <button
                  key={panel}
                  type="button"
                  className={`focus-ring grid place-items-center gap-2 rounded py-4 text-[11px] uppercase tracking-[.12em] ${
                    activePanel === panel ? "bg-gold/15 text-ivory" : "text-parchment hover:bg-gold/10 hover:text-ivory"
                  }`}
                  onClick={() => setActivePanel(panel)}
                  aria-pressed={activePanel === panel}
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <aside className="order-2 border-b border-gold/15 bg-black/30 p-5 lg:order-none lg:border-b-0 lg:border-r">
              <div className="mb-8 flex items-center justify-between gap-4">
                <Image src="/images/aetherica-logo-metallic.png" alt="Aetherica Podcast" width={260} height={126} className="h-auto w-48 drop-shadow-[0_0_16px_rgba(181,146,85,.48)]" />
                <button className="focus-ring hidden rounded p-2 text-parchment hover:bg-gold/10" onClick={() => setExpanded(false)} aria-label="Close full player">
                  <X />
                </button>
              </div>
              <p className="text-xs uppercase tracking-[.26em] text-crimson">Now Playing</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ivory">{current?.title ?? "Select an episode"}</h2>
              <p className="mt-4 text-sm text-gold">{current?.guest ? `with ${current.guest}` : current?.hosts.join(" & ")}</p>
              {current?.coverImage ? (
                <Image src={current.coverImage} alt="" width={520} height={520} className="mt-6 aspect-video w-full rounded bg-obsidian object-contain shadow-aureate" />
              ) : null}
              <blockquote className="mt-6 border-l border-gold/40 pl-4 text-lg leading-8 text-parchment">
                {transcriptPreview(current)}
              </blockquote>
              <div className="mt-6 rounded border border-gold/20 bg-black/28 p-4">
                <p className="text-xs uppercase tracking-[.22em] text-gold">Support the current</p>
                <p className="mt-2 text-sm leading-6 text-parchment">
                  Help sustain Aetherica, future archive tools, transcripts, and long-form conversations by supporting the Patreon.
                </p>
                <a
                  href="https://www.patreon.com/aetherica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded border border-gold/40 bg-gold/10 px-4 py-3 text-xs uppercase tracking-[.18em] text-gold hover:bg-gold/20 hover:text-ivory"
                >
                  Support on Patreon
                </a>
              </div>
            </aside>

            <section className={`relative isolate order-1 overflow-hidden border-b border-gold/15 p-4 sm:p-5 lg:order-none lg:border-b-0 lg:border-r ${templeBackdrop} ${templeAccent}`}>
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_0_42%,rgba(0,0,0,.48)_78%)]" aria-hidden="true" />
              <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded border border-gold/25 bg-black/30 p-1">
                  {(["astrological", "qabalistic"] as const).map((playerMode) => (
                    <button
                      key={playerMode}
                      type="button"
                      onClick={() => selectMode(playerMode)}
                      className={`focus-ring rounded px-4 py-2 text-sm capitalize ${mode === playerMode ? "bg-crimson text-ivory" : "text-parchment hover:text-ivory"}`}
                    >
                      {playerMode}
                    </button>
                  ))}
                </div>
                <button className="focus-ring rounded p-2 text-parchment hover:bg-gold/10" onClick={() => setExpanded(false)} aria-label="Close full player">
                  <X />
                </button>
              </div>

              <div className="relative z-10">
                <WheelPlayer mode={mode} playing={playing} progress={progress} onToggle={togglePlayback} />
              </div>

              <div className="relative z-10 mx-auto mt-6 max-w-3xl">
                <div className="mb-2 flex justify-between text-sm text-gold">
                  <span>{formatSeconds(position)}</span>
                  <span>{formatSeconds(duration || current?.durationSeconds || 0)}</span>
                </div>
                <input
                  className="w-full accent-gold"
                  aria-label="Seek playback position"
                  type="range"
                  min={0}
                  max={duration || current?.durationSeconds || 1}
                  value={position}
                  onChange={(event) => seek(Number(event.target.value))}
                  disabled={!current}
                />
                <div className="mt-6 grid grid-cols-5 items-center gap-3">
                  <button className="focus-ring rounded-full border border-gold/30 p-4 text-parchment hover:bg-gold/10" onClick={() => seek(Math.max(0, position - 15))} aria-label="Skip backward 15 seconds">
                    <RotateCcw />
                    <span className="sr-only">15 seconds</span>
                  </button>
                  <button className="focus-ring rounded-full border border-gold/30 p-4 text-parchment hover:bg-gold/10" onClick={() => seek(Math.max(0, position - 30))} aria-label="Skip backward 30 seconds">
                    -30
                  </button>
                  <button className="focus-ring grid size-20 place-items-center justify-self-center rounded-full bg-gold text-obsidian shadow-[0_0_34px_rgba(181,146,85,.56)]" onClick={togglePlayback} aria-label={playing ? "Pause episode" : "Play episode"} disabled={!current}>
                    {playing ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  <button className="focus-ring rounded-full border border-gold/30 p-4 text-parchment hover:bg-gold/10" onClick={() => seek(position + 30)} aria-label="Skip forward 30 seconds">
                    +30
                  </button>
                  <button className="focus-ring rounded-full border border-gold/30 p-4 text-parchment hover:bg-gold/10" onClick={() => seek(position + 15)} aria-label="Skip forward 15 seconds">
                    <RotateCw />
                    <span className="sr-only">15 seconds</span>
                  </button>
                </div>
              </div>
            </section>

            <aside className="order-3 bg-black/30 p-5 lg:col-span-2 lg:order-none xl:col-span-1">
              {activePanel === "now-playing" ? (
                <>
                  <h2 className="text-sm uppercase tracking-[.26em] text-crimson">Currently Being Discussed</h2>
                  <div className="mt-4 grid gap-3 rounded border border-gold/15 bg-obsidian/55 p-4">
                    {[
                      ["Current topic", context.topic],
                      ["Person", context.person],
                      ["Book", context.book],
                      ["Relevant symbol", context.symbol],
                      ["Definition", context.definition],
                      ["Related moment", context.related]
                    ].map(([label, detail]) => (
                      <div key={label}>
                        <p className="text-[11px] uppercase tracking-[.16em] text-gold">{label}</p>
                        <p className="mt-1 text-sm leading-6 text-parchment">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <h2 className="mt-8 text-sm uppercase tracking-[.26em] text-crimson">Transcript Preview</h2>
                  <p className="mt-4 leading-7 text-parchment">{segment?.text ?? transcriptPreview(current)}</p>

                  <button
                    type="button"
                    className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded border border-gold/35 px-4 py-3 text-parchment hover:bg-gold/10"
                    onClick={addBookmark}
                    disabled={!current}
                  >
                    <BookmarkPlus size={18} />
                    Bookmark This Moment
                  </button>
                </>
              ) : null}

              {activePanel === "chapters" ? (
                <>
                  <h2 className="text-sm uppercase tracking-[.26em] text-crimson">Episode Chapters</h2>
                  <div className="mt-4 grid max-h-[72vh] gap-2 overflow-y-auto pr-1">
                    {current?.chapters.length ? (
                      current.chapters.map((item, index) => (
                        <button
                          key={`${item.start}-${item.title}`}
                          className={`focus-ring flex items-center justify-between rounded border px-3 py-3 text-left text-sm ${
                            chapter?.start === item.start ? "border-crimson bg-crimson/20 text-ivory" : "border-gold/15 text-parchment hover:bg-gold/10"
                          }`}
                          onClick={() => playFrom(item.start)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="grid size-8 place-items-center rounded-full border border-gold/30 text-xs">{index + 1}</span>
                            {item.title}
                          </span>
                          <span className="text-gold">{formatSeconds(item.start)}</span>
                        </button>
                      ))
                    ) : (
                      <p className="text-parchment">Chapters will appear here when attached to the episode.</p>
                    )}
                  </div>
                </>
              ) : null}

              {activePanel === "notes" ? (
                <>
                  <h2 className="text-sm uppercase tracking-[.26em] text-crimson">Bookmarks</h2>
                  <label className="mt-4 grid gap-2 text-sm text-parchment">
                    Note for {formatSeconds(position)}
                    <textarea
                      className="focus-ring min-h-24 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory"
                      value={bookmarkNote}
                      onChange={(event) => setBookmarkNote(event.target.value)}
                      placeholder="Add why this moment matters..."
                    />
                  </label>
                  <button
                    type="button"
                    className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-4 py-3 font-semibold text-obsidian hover:bg-ivory"
                    onClick={addBookmark}
                    disabled={!current}
                  >
                    <BookmarkPlus size={18} />
                    Add Bookmark
                  </button>
                  <div className="mt-5 grid max-h-[52vh] gap-3 overflow-y-auto pr-1">
                    {bookmarks.length ? (
                      bookmarks.map((bookmark) => (
                        <article key={bookmark.id} className="rounded border border-gold/15 bg-obsidian/55 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <button type="button" className="focus-ring text-left text-sm font-semibold text-ivory hover:text-gold" onClick={() => playFrom(bookmark.position)}>
                              {formatSeconds(bookmark.position)} · {bookmark.title}
                            </button>
                            <span className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                className="focus-ring rounded p-1 text-parchment hover:bg-gold/15 hover:text-gold"
                                onClick={() => copyLink(bookmark.position, bookmark.id)}
                                aria-label={`Copy link to ${formatSeconds(bookmark.position)}`}
                              >
                                {copied === bookmark.id ? <Check size={16} className="text-gold" /> : <Link2 size={16} />}
                              </button>
                              <button type="button" className="focus-ring rounded p-1 text-parchment hover:bg-crimson/20 hover:text-ivory" onClick={() => removeBookmark(bookmark.id)} aria-label="Remove bookmark">
                                <X size={16} />
                              </button>
                            </span>
                          </div>
                          {bookmark.note ? <p className="mt-2 text-sm leading-6 text-parchment">{bookmark.note}</p> : null}
                        </article>
                      ))
                    ) : (
                      <p className="text-parchment">Bookmarks you add for this episode will appear here.</p>
                    )}
                  </div>
                </>
              ) : null}

              {activePanel === "settings" ? (
                <>
                  <h2 className="text-sm uppercase tracking-[.26em] text-crimson">Settings</h2>
                  <div className="mt-5 grid gap-4">
                    <label className="grid gap-2 text-sm text-parchment">
                      Speed
                      <select className="focus-ring rounded border border-gold/25 bg-obsidian px-3 py-2 text-ivory" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                        {speeds.map((item) => (
                          <option key={item} value={item}>
                            {item.toFixed(2)}x
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm text-parchment">
                      Volume
                      <span className="flex items-center gap-3">
                        <button type="button" className="focus-ring rounded p-2 text-gold" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Unmute" : "Mute"}>
                          {muted ? <VolumeX /> : <Volume2 />}
                        </button>
                        <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-full accent-gold" aria-label="Volume" />
                      </span>
                    </label>
                    <label className="grid gap-2 text-sm text-parchment">
                      Sleep timer
                      <select
                        className="focus-ring rounded border border-gold/25 bg-obsidian px-3 py-2 text-ivory"
                        value={sleepRemaining ?? 0}
                        onChange={(event) => {
                          const minutes = Number(event.target.value);
                          setSleepEndsAt(minutes > 0 ? Date.now() + minutes * 60_000 : null);
                          setSleepRemaining(minutes > 0 ? minutes : null);
                        }}
                      >
                        <option value={0}>Off</option>
                        {[5, 10, 15, 30, 45, 60].map((minutes) => (
                          <option key={minutes} value={minutes}>
                            {minutes} minutes
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex items-start justify-between gap-3 text-sm text-parchment">
                      <span className="min-w-0 flex-1">
                        Autoplay next episode
                        {upNext ? (
                          // Episode titles run long; two lines is enough to identify one.
                          <span className="mt-1 line-clamp-2 block text-xs text-limestone" title={upNext.title}>
                            Up next: {upNext.title}
                          </span>
                        ) : (
                          <span className="mt-1 block text-xs text-limestone">No following episode for this one.</span>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="mt-0.5 size-5 shrink-0 accent-gold"
                        checked={autoplayNext}
                        onChange={(event) => setAutoplayNext(event.target.checked)}
                      />
                    </label>

                    <div className="grid gap-2">
                      <button
                        type="button"
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/35 px-4 py-3 text-parchment hover:bg-gold/10 disabled:opacity-50"
                        onClick={() => copyLink(undefined, "episode")}
                        disabled={!current}
                      >
                        {copied === "episode" ? <Check size={18} className="text-gold" /> : <Share2 size={18} />}
                        {copied === "episode" ? "Link copied" : "Copy episode link"}
                      </button>
                      <button
                        type="button"
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/35 px-4 py-3 text-parchment hover:bg-gold/10 disabled:opacity-50"
                        onClick={() => copyLink(position, "moment")}
                        disabled={!current}
                      >
                        {copied === "moment" ? <Check size={18} className="text-gold" /> : <Link2 size={18} />}
                        {copied === "moment" ? "Link copied" : `Copy link at ${formatSeconds(position)}`}
                      </button>
                      {current?.audioUrl ? (
                        <a
                          className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/35 px-4 py-3 text-parchment hover:bg-gold/10"
                          href={current.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download size={18} />
                          Download audio
                        </a>
                      ) : null}
                      {upNext ? (
                        <button
                          type="button"
                          className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/35 px-4 py-3 text-parchment hover:bg-gold/10"
                          onClick={goToNext}
                        >
                          <SkipForward size={18} />
                          Play next episode
                        </button>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}
            </aside>
          </div>
        </div>
      ) : null}

      <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-obsidian/95 px-3 py-3 backdrop-blur" aria-label="Persistent audio player">
        {/* A failed load used to leave a play button that silently did nothing. */}
        {status === "error" ? (
          <div className="mx-auto mb-2 flex max-w-7xl items-center gap-3 rounded border border-crimson/50 bg-crimson/15 px-3 py-2 text-sm text-ivory" role="alert">
            <AlertTriangle size={16} className="shrink-0 text-crimson" />
            <span className="min-w-0 flex-1">This episode&rsquo;s audio could not be loaded.</span>
            <button type="button" onClick={retry} className="focus-ring shrink-0 rounded border border-gold/40 px-3 py-1 text-xs uppercase tracking-[.14em] text-gold hover:bg-gold/10">
              Try again
            </button>
          </div>
        ) : null}
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button
            type="button"
            className="focus-ring grid size-12 shrink-0 place-items-center rounded-full bg-gold text-obsidian disabled:opacity-60"
            aria-label={playing ? "Pause episode" : "Play episode"}
            onClick={togglePlayback}
            disabled={!current}
          >
            {status === "loading" && !playing ? (
              <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            ) : playing ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-ivory">{current?.title ?? "Select an episode to begin"}</p>
              <span className="hidden rounded border border-gold/25 px-2 py-0.5 text-[10px] uppercase tracking-[.16em] text-gold sm:inline">
                {mode}
              </span>
            </div>
            <div className="player-scrubber relative py-1.5">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-gold/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-150 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
              <input
                className="player-range relative w-full"
                aria-label="Seek playback position"
                type="range"
                min={0}
                max={duration || current?.durationSeconds || 1}
                value={position}
                onChange={(event) => seek(Number(event.target.value))}
                disabled={!current}
              />
            </div>
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-limestone">
              <span>
                {formatSeconds(position)} / {formatSeconds(duration || current?.durationSeconds || 0)}
              </span>
              {status === "loading" ? <span className="text-gold">buffering…</span> : null}
              {sleepRemaining !== null ? (
                <span className="inline-flex items-center gap-1 text-gold">
                  <Moon size={11} aria-hidden="true" />
                  {sleepRemaining}m
                </span>
              ) : null}
              {chapter ? <span className="truncate">· {chapter.title}</span> : null}
            </p>
          </div>
          <button type="button" className="focus-ring rounded p-2 text-parchment" aria-label="Skip backward 15 seconds" onClick={() => seek(Math.max(0, position - 15))}>
            <RotateCcw size={18} />
          </button>
          <button type="button" className="focus-ring rounded p-2 text-parchment" aria-label="Skip forward 30 seconds" onClick={() => seek(position + 30)}>
            <RotateCw size={18} />
          </button>
          <button
            type="button"
            className="focus-ring hidden min-w-14 rounded border border-gold/25 px-2 py-1 text-xs tabular-nums text-gold hover:bg-gold/10 sm:block"
            aria-label={`Playback speed, currently ${speed} times. Click to change.`}
            onClick={() => setSpeed(nextSpeed(speed))}
          >
            {speed}&times;
          </button>
          <button type="button" className="focus-ring rounded border border-gold/35 p-2 text-gold hover:bg-gold/10" aria-label="Open full player" onClick={() => setExpanded(true)} disabled={!current}>
            <Maximize2 size={18} />
          </button>
          <button type="button" className="focus-ring hidden rounded p-2 text-parchment md:block" aria-label="Player mode" onClick={() => selectMode(mode === "astrological" ? "qabalistic" : "astrological")}>
            <ChevronDown size={18} />
          </button>
        </div>
      </aside>
    </PlayerContext.Provider>
  );
}
