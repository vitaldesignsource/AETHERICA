import type { Episode, EventItem, ListeningPath } from "@/lib/data/types";

export type LivingArchiveSlideType =
  | "episode"
  | "path"
  | "ask-aetherica"
  | "event"
  | "weekly-mystery"
  | "topic"
  | "guest";

export type LivingArchiveTheme = "crimson" | "gold" | "celestial" | "alchemical" | "stone";

export type LivingArchiveMetadata = {
  label: string;
  value: string;
};

export type LivingArchiveAction = {
  label: string;
  href: string;
};

export type LivingArchiveSlide = {
  id: string;
  type: LivingArchiveSlideType;
  eyebrow?: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  visualStyle?: "episode-art" | "temple-corridor" | "archive-lens" | "crimson-hall" | "manuscript-table";
  symbol?: string;
  theme?: LivingArchiveTheme;
  metadata?: LivingArchiveMetadata[];
  primaryAction: LivingArchiveAction;
  secondaryAction?: LivingArchiveAction;
  audioAction?: {
    episode: Episode;
    start?: number;
    label?: string;
  };
  preview?: {
    prompt?: string;
    resultTitle?: string;
    speaker?: string;
    timestamp?: string;
    relatedText?: string;
  };
  source?: {
    episode?: Episode;
    event?: EventItem;
    path?: ListeningPath;
  };
  active?: boolean;
  startsAt?: string;
  endsAt?: string;
};
