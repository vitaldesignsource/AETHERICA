create extension if not exists "pgcrypto";

create table if not exists rss_sync_runs (
  id uuid primary key default gen_random_uuid(),
  feed_url text not null,
  status text not null check (status in ('preview','success','error','retrying')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  imported_count integer not null default 0,
  updated_count integer not null default 0,
  error_count integer not null default 0
);

create table if not exists rss_sync_errors (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references rss_sync_runs(id) on delete cascade,
  guid text,
  message text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  guid text not null unique,
  slug text not null unique,
  title text not null,
  base_description text,
  audio_url text not null,
  audio_mime_type text,
  publication_date timestamptz,
  duration_seconds integer,
  episode_number integer,
  season_number integer,
  explicit_rating text,
  cover_image_url text,
  rss_payload jsonb not null default '{}'::jsonb,
  cms_payload jsonb not null default '{}'::jsonb,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists transcript_segments (
  id uuid primary key default gen_random_uuid(),
  episode_id uuid not null references podcast_episodes(id) on delete cascade,
  speaker text,
  start_time numeric not null,
  end_time numeric,
  text text not null,
  section text,
  sequence integer not null,
  review_status text not null default 'unreviewed'
);

create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists listening_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profiles(id) on delete cascade,
  anonymous_id text,
  episode_id uuid not null references podcast_episodes(id) on delete cascade,
  position_seconds numeric not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  check ((user_id is not null) or (anonymous_id is not null))
);

create table if not exists saved_episodes (
  user_id uuid references user_profiles(id) on delete cascade,
  episode_id uuid references podcast_episodes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, episode_id)
);

create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profiles(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists playlist_items (
  playlist_id uuid references playlists(id) on delete cascade,
  episode_id uuid references podcast_episodes(id) on delete cascade,
  position integer not null,
  primary key (playlist_id, episode_id)
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references user_profiles(id) on delete cascade,
  episode_id uuid references podcast_episodes(id) on delete cascade,
  timestamp_seconds numeric,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists search_documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid,
  title text not null,
  body text not null,
  url text not null,
  metadata jsonb not null default '{}'::jsonb,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,'')), 'B')
  ) stored
);

create index if not exists search_documents_vector_idx on search_documents using gin(search_vector);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent_at timestamptz not null,
  source_page text,
  provider text not null default 'placeholder',
  created_at timestamptz not null default now()
);

create table if not exists event_calendar_downloads (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  destination_path text not null,
  permanent boolean not null default true
);
