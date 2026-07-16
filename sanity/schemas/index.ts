export const schemas = [
  {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
      { name: "title", type: "string" },
      { name: "description", type: "text" },
      { name: "socialLinks", type: "array", of: [{ type: "reference", to: [{ type: "socialLink" }] }] }
    ]
  },
  {
    name: "socialLink",
    title: "Social Link",
    type: "document",
    fields: [
      { name: "label", type: "string" },
      { name: "url", type: "url" },
      { name: "platform", type: "string" }
    ]
  },
  {
    name: "episode",
    title: "Episode",
    type: "document",
    fields: [
      { name: "guid", type: "string", readOnly: true },
      { name: "title", type: "string" },
      { name: "slug", type: "slug", options: { source: "title" } },
      { name: "longIntroduction", type: "array", of: [{ type: "block" }] },
      { name: "showNotes", type: "array", of: [{ type: "block" }] },
      { name: "chapters", type: "array", of: [{ type: "chapter" }] },
      { name: "transcript", type: "array", of: [{ type: "transcriptSegment" }] },
      { name: "hosts", type: "array", of: [{ type: "reference", to: [{ type: "host" }] }] },
      { name: "guests", type: "array", of: [{ type: "reference", to: [{ type: "guest" }] }] },
      { name: "topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }] },
      { name: "books", type: "array", of: [{ type: "reference", to: [{ type: "book" }] }] },
      { name: "people", type: "array", of: [{ type: "reference", to: [{ type: "historicalPerson" }] }] },
      { name: "events", type: "array", of: [{ type: "reference", to: [{ type: "event" }] }] },
      { name: "relatedEpisodes", type: "array", of: [{ type: "reference", to: [{ type: "episode" }] }] },
      { name: "seo", type: "seoSettings" }
    ]
  },
  {
    name: "chapter",
    title: "Chapter",
    type: "object",
    fields: [
      { name: "title", type: "string" },
      { name: "startTime", type: "number" }
    ]
  },
  {
    name: "transcriptSegment",
    title: "Transcript Segment",
    type: "object",
    fields: [
      { name: "speaker", type: "string" },
      { name: "startTime", type: "number" },
      { name: "endTime", type: "number" },
      { name: "text", type: "text" },
      { name: "section", type: "string" },
      { name: "reviewStatus", type: "string" }
    ]
  },
  ...["host", "guest", "topic", "tradition", "book", "historicalPerson", "organization", "event", "venue", "article", "quotation", "redirect"].map((name) => ({
    name,
    title: name.replace(/([A-Z])/g, " $1"),
    type: "document",
    fields: [
      { name: "title", type: "string" },
      { name: "slug", type: "slug", options: { source: "title" } },
      { name: "description", type: "text" },
      { name: "seo", type: "seoSettings" }
    ]
  })),
  {
    name: "seoSettings",
    title: "SEO Settings",
    type: "object",
    fields: [
      { name: "title", type: "string" },
      { name: "description", type: "text" },
      { name: "image", type: "image" },
      { name: "canonicalPath", type: "string" }
    ]
  }
];
