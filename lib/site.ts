/**
 * `??` only falls back on null/undefined, but .env.example ships these keys present-and-empty
 * (CONTACT_EMAIL=), so an unset value arrives as "" and defeats the default. That left the contact
 * form reading "directed to ." with no address, and an empty SITE_URL would make the
 * `new URL(...)` in the root layout's metadataBase throw outright.
 */
function envOr(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export const siteConfig = {
  name: "Aetherica Podcast",
  shortName: "Aetherica",
  tagline: "Esoteric Wisdom. Timeless Truth.",
  description:
    "Welcome to the Astral Garden where we explore the hidden architecture of philosophy, esotericism, religion, history, and the Western Esoteric Tradition.",
  url: envOr(process.env.SITE_URL, "http://localhost:3000"),
  contactEmail: envOr(process.env.CONTACT_EMAIL, "LOGOS@aethericapodcast.com"),
  socialLinks: [
    ["YouTube", process.env.YOUTUBE_CHANNEL_URL],
    ["Instagram", process.env.INSTAGRAM_URL],
    ["Patreon", "https://www.patreon.com/aetherica"],
    ["X", process.env.X_URL],
    ["Facebook", process.env.FACEBOOK_URL],
    ["TikTok", process.env.TIKTOK_URL],
    ["Spotify", process.env.SPOTIFY_URL],
    ["Apple Podcasts", process.env.APPLE_PODCASTS_URL],
    ["Substack", process.env.SUBSTACK_URL],
    ["Pinterest", process.env.PINTEREST_URL],
    ["Membership", process.env.MEMBERSHIP_URL],
    ["RSS Directory", process.env.RSS_DIRECTORY_URL],
    ["RSS", process.env.PODCAST_RSS_URL]
  ].filter((link): link is [string, string] => Boolean(link[1]))
};

export const navItems = [
  ["Home", "/"],
  ["Episodes", "/episodes"],
  ["Explore", "/archive"],
  ["Topics", "/topics"],
  ["Guests", "/guests"],
  ["Paths", "/paths"],
  ["Resources", "/resources"],
  ["Hosts", "/hosts"],
  ["Events", "/events"],
  ["Ask Aetherica", "/search"],
  ["My Archive", "/library"],
  ["About", "/about"],
  ["Contact", "/contact"]
] as const;
