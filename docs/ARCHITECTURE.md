# Aetherica Architecture

## Proposed Architecture

Aetherica is structured as a Next.js App Router site with server-rendered editorial pages, a persistent client-side audio player, RSS ingestion, Sanity editorial extensions, and Supabase/PostgreSQL application data.

- Next.js renders public pages, metadata, sitemaps, route handlers, and RSS preview sync.
- RSS remains canonical for GUID, audio URL, base title, base description, duration, and publication date.
- Sanity extends imported episodes with introductions, show notes, transcripts, topics, books, people, events, SEO, and corrections.
- Supabase stores import history, transcript segments, newsletter subscribers, search documents, playback progress, playlists, bookmarks, redirects, and future user profiles.
- Search starts with PostgreSQL full-text search and can later be swapped or mirrored into Meilisearch, Typesense, or Algolia.
- The persistent player lives in the root layout so route navigation does not restart playback.

## Implementation Plan

1. Phase 1: project setup, design system, schema, CMS models, settings, header, footer, homepage, responsive layout.
2. Phase 2: RSS ingestion, episode archive, episode pages, persistent player.
3. Phase 3: transcript ingestion, transcript rendering, timestamp navigation, transcript search.
4. Phase 4: hosts, guests, topics, library entities, editable social links.
5. Phase 5: event system, list, pages, monthly calendar, ICS export.
6. Phase 6: SEO, structured data, sitemaps, Open Graph, performance, accessibility review.
7. Phase 7: testing, error handling, documentation, deployment readiness.

## Required Environment Variables

See `.env.example`. Keep service-role keys server-only and never expose them through `NEXT_PUBLIC_` variables.

## Editorial Workflow

1. Configure `PODCAST_RSS_URL`.
2. Run RSS sync in preview mode.
3. Review created episode drafts.
4. Add editorial introduction, show notes, transcript, chapters, quotations, topics, books, people, and related content.
5. Preview pages.
6. Publish and verify sitemap/structured data.
