export type SocialLink = { label: string; url: string };

export type Topic = {
  slug: string;
  title: string;
  definition: string;
  overview: string;
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  imageUrl?: string;
  imageAlt?: string;
  shortBio: string;
  longBio: string;
  studyAreas: string[];
  socials: SocialLink[];
  books?: Book[];
};

export type GuestProfile = Person & {
  profileType: "host" | "guest";
  relatedGuests?: string[];
};

export type Book = {
  title: string;
  subtitle?: string;
  publisher?: string;
  status?: string;
  coverImage?: string;
  sourceUrl: string;
  description: string;
};

export type Chapter = {
  title: string;
  start: number;
  summary?: string;
  keywords?: string[];
  quotations?: string[];
};

export type TranscriptSegment = {
  id: string;
  speaker: string;
  start: number;
  end: number;
  text: string;
  section: string;
  sequence: number;
};

export type Episode = {
  slug: string;
  guid: string;
  number: number;
  season: number;
  title: string;
  subtitle: string;
  guest: string;
  hosts: string[];
  publishedAt?: string;
  publishedLabel?: string;
  duration: string;
  durationSeconds: number;
  description: string;
  longIntroduction: string;
  topics: string[];
  coverImage: string;
  audioUrl?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  descriptionSource?: string;
  chapters: Chapter[];
  transcript: TranscriptSegment[];
  demo: boolean;
};

export type EventItem = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: string;
  startDate: string;
  endDate: string;
  timeZone: string;
  location: string;
  status: "upcoming" | "past" | "cancelled" | "postponed";
  speakers: string[];
  registrationUrl?: string;
  ticketUrl?: string;
  sourceUrl?: string;
  imageUrl?: string;
  demo: boolean;
};

export type ListeningPathStep = {
  title: string;
  summary: string;
  episodeSlug?: string;
  chapterStart?: number;
  bookTitle?: string;
  prompt: string;
};

export type ListeningPath = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  topics: string[];
  steps: ListeningPathStep[];
};

export type TimelinePoint = {
  year: string;
  title: string;
  summary: string;
  topic: string;
  episodeSlug?: string;
};
