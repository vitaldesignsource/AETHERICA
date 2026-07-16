# Aetherica Podcast

Production-ready foundation for the Aetherica Podcast website: a premium esoteric media archive with RSS ingestion, editorial content models, persistent audio playback, event pages, transcript-ready episode pages, SEO utilities, and database migrations.

## Local Development

1. Copy `.env.example` to `.env.local`.
2. Fill in `SITE_URL` and any verified platform URLs.
3. Leave unknown URLs blank. Do not invent RSS, social, host, or credential values.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

## Checks

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

## Private Site Oracle

The internal Aetherica Site Oracle lives at `/admin/oracle`. It is an owner-facing assistant dashboard for page copy, episode packages, SEO assets, Codex prompts, image prompts, interactive-instrument plans, internal-link maps, and project notes.

Required environment variable:

```bash
OPENAI_API_KEY=
```

Optional environment variables:

```bash
ORACLE_MODEL=gpt-4.1-mini
ORACLE_ADMIN_PASSWORD=
```

If `ORACLE_ADMIN_PASSWORD` is set, enter the same password in the Oracle dashboard before sending a request. The OpenAI key is used only by the server route at `/api/oracle/chat` and is never exposed to the frontend. Do not link `/admin/oracle` publicly unless this tool is intentionally made public later.

## RSS Synchronization

Set `PODCAST_RSS_URL`, then run:

```bash
npm run rss:sync
```

The current implementation parses and previews feed items. Production sync should upsert by GUID, record `rss_sync_runs`, preserve human-edited CMS fields, and log retryable errors in `rss_sync_errors`.

To refresh the static RSS audio seed used by the local archive/player:

```bash
npm run rss:content
```

## YouTube Episode Metadata

Public Aetherica YouTube episode metadata can be refreshed with:

```bash
npm run youtube:sync
```

The script reads the public Aetherica channel page, pulls public watch-page descriptions, parses timestamp chapters, and writes `content/youtube-episodes.json` for editorial review. This is not a replacement for the canonical podcast RSS feed; it is an enrichment source for YouTube descriptions, thumbnails, chapters, and watch links.

Guest episodes can be enriched from the public Aetherica Guests playlist configured in `AETHERICA_GUEST_PLAYLIST_URL`.

To import a manually supplied list of YouTube iframe embeds:

```bash
npm run youtube:import-embeds -- path/to/pasted-text.txt
```

## Ike Events / Projects

Ike Baker's public events/projects feed can be refreshed with:

```bash
npm run events:sync
```

The script writes `content/ike-events.json`, which powers the local Events pages and source links.

## Deployment

The project is Vercel-compatible. Configure environment variables in Vercel, connect Supabase and Sanity, run migrations, and verify `/sitemap.xml`, `/robots.txt`, `/api/rss/sync`, newsletter submission, and ICS downloads.

## Demo Content

Seeded content is clearly marked as demo content. It must be replaced or reviewed before launch. No biographies, locations, RSS feeds, credentials, or social URLs are fabricated.
