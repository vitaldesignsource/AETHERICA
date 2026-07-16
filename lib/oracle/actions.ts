export const oracleModes = [
  "Site Architect",
  "Episode Producer",
  "Esoteric Research Librarian",
  "SEO Strategist",
  "Brand Voice Editor",
  "Interactive Instrument Designer",
  "Codex Prompt Builder"
] as const;

export type OracleMode = (typeof oracleModes)[number];

export type OracleQuickAction = {
  label: string;
  prompt: string;
  outputType: string;
};

export const oracleQuickActions: OracleQuickAction[] = [
  {
    label: "Analyze Current Site",
    outputType: "Strategic audit",
    prompt:
      "Analyze the current Aetherica site structure and suggest improvements for clarity, content depth, SEO, internal linking, visual hierarchy, symbolic coherence, and future expansion."
  },
  {
    label: "Improve Page Copy",
    outputType: "Copy-ready website text",
    prompt:
      "Rewrite and improve the provided page copy in the Aetherica voice. Make it more elegant, scholarly, mystical, clear, refined, and website-ready. Preserve accuracy and avoid generic filler."
  },
  {
    label: "Generate Article",
    outputType: "Article plan",
    prompt:
      "Create a full article plan and opening section for the provided topic. Include title options, SEO title, meta description, slug, outline, introduction, key sections, image ideas, internal link suggestions, related glossary terms, and FAQ ideas."
  },
  {
    label: "Create Episode Page",
    outputType: "Episode package",
    prompt:
      "Turn the provided podcast transcript or notes into a full episode page with title, subtitle, summary, timestamps, key themes, guest highlights, quotes, reading list, SEO metadata, clip suggestions, and social post copy."
  },
  {
    label: "Extract Clips from Transcript",
    outputType: "Clip slate",
    prompt:
      "Analyze the provided transcript and identify the strongest short-form video clip moments. Include timestamp ranges, clip titles, hook text, caption text, on-screen title ideas, and why each clip would work."
  },
  {
    label: "Build SEO Metadata",
    outputType: "SEO asset pack",
    prompt:
      "Generate SEO title, meta description, slug, keywords, schema suggestions, FAQ ideas, search intent notes, and internal linking opportunities for the provided page or topic."
  },
  {
    label: "Suggest Internal Links",
    outputType: "Link map",
    prompt:
      "Suggest relevant internal links between this content and other Aetherica topics. Organize them by direct relevance, symbolic relevance, and user journey relevance."
  },
  {
    label: "Create Image Prompts",
    outputType: "Image prompt set",
    prompt:
      "Create cinematic image-generation prompts for this page or episode. Use a refined Aetherica visual style: dark, scholarly, mystical, symbolic, architectural, atmospheric, elegant, and serious."
  },
  {
    label: "Create Codex Prompt",
    outputType: "Codex-ready build prompt",
    prompt:
      "Turn this idea into a complete Codex development prompt with goals, context, components, style, behavior, implementation details, technical requirements, edge cases, and acceptance criteria."
  },
  {
    label: "Plan Interactive Instrument",
    outputType: "Instrument blueprint",
    prompt:
      "Design an interactive website instrument for this concept. Include purpose, user interface, data model, modes, interactions, animations, symbolic logic, accessibility, implementation plan, and future expansion ideas."
  },
  {
    label: "Add Glossary Entry",
    outputType: "Glossary entry",
    prompt:
      "Create a polished glossary entry for this term, including definition, historical context, related traditions, symbolic meaning, related Aetherica pages, suggested links, and source notes."
  },
  {
    label: "Generate Reading List",
    outputType: "Reading list",
    prompt:
      "Create a serious reading list for this topic, organized into beginner, intermediate, advanced, primary sources, and modern scholarship. Explain why each category matters."
  },
  {
    label: "Create Content Cluster",
    outputType: "Topical authority map",
    prompt:
      "Create a content cluster for this topic with pillar pages, supporting articles, glossary terms, episodes, internal links, SEO opportunities, visual assets, and future interactive instruments."
  }
];

export const noteCategories = [
  "Site Ideas",
  "Article Ideas",
  "Instrument Ideas",
  "Episode Tasks",
  "SEO Tasks",
  "Design Notes",
  "Glossary Terms",
  "Codex Prompts"
] as const;

export type OracleNoteCategory = (typeof noteCategories)[number];

