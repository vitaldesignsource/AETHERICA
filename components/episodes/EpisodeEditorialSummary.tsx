import type { ReactNode } from "react";

type EditorialBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function sentenceGroups(text: string) {
  const sentences = text.match(/[^.!?]+(?:[.!?]+[\"”']?|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [text];
  if (sentences.length < 4) return [text];

  const groups: string[] = [];
  for (let index = 0; index < sentences.length; index += 2) {
    groups.push(sentences.slice(index, index + 2).join(" "));
  }
  return groups;
}

function editorialBlocks(text: string): EditorialBlock[] {
  const normalized = text
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+•\s+/g, "\n• ")
    .trim();
  if (!normalized) return [];

  const explicitParagraphs = normalized.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const paragraphs = explicitParagraphs.length === 1 ? sentenceGroups(explicitParagraphs[0]) : explicitParagraphs;

  return paragraphs.flatMap<EditorialBlock>((paragraph) => {
    const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
    const listItems = lines
      .filter((line) => /^(?:[-*]|•)\s+/.test(line))
      .map((line) => line.replace(/^(?:[-*]|•)\s+/, ""));
    const proseLines = lines.filter((line) => !/^(?:[-*]|•)\s+/.test(line));

    if (listItems.length) {
      const blocks: EditorialBlock[] = [];
      if (proseLines.length) blocks.push({ type: "paragraph", text: proseLines.join(" ") });
      blocks.push({ type: "list", items: listItems });
      return blocks;
    }

    return [{ type: "paragraph", text: lines.join(" ") }];
  });
}

function escapeExpression(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function emphasizedText(text: string, terms: string[]): ReactNode[] {
  const normalizedTerms = [...new Set(terms.map((term) => term.trim()).filter((term) => term.length > 3))]
    .sort((a, b) => b.length - a.length)
    .slice(0, 10);

  if (!normalizedTerms.length) return [text];

  const termPattern = new RegExp(`(${normalizedTerms.map(escapeExpression).join("|")})`, "gi");
  return text.split(termPattern).map((part, index) => {
    const isEmphasis = normalizedTerms.some((term) => term.toLowerCase() === part.toLowerCase());
    return isEmphasis ? (
      <em key={`${part}-${index}`} className="font-display text-[1.05em] font-medium text-[#dda63f]">
        {part}
      </em>
    ) : part;
  });
}

export function EpisodeEditorialSummary({
  text,
  emphasisTerms = [],
  eyebrow,
  maxParagraphs,
  compact = false
}: {
  text: string;
  emphasisTerms?: string[];
  eyebrow?: string;
  maxParagraphs?: number;
  compact?: boolean;
}) {
  const blocks = editorialBlocks(text).slice(0, maxParagraphs);
  if (!blocks.length) return null;

  return (
    <div className={`episode-editorial-summary ${compact ? "episode-editorial-summary--compact" : ""}`}>
      <span className="episode-editorial-summary__rail" aria-hidden="true" />
      {eyebrow ? <p className="mb-5 text-[10px] uppercase tracking-[.28em] text-gold">{eyebrow}</p> : null}
      <div className="space-y-5 sm:space-y-7">
        {blocks.map((block, index) => block.type === "list" ? (
          <ul key={`list-${index}`} className="grid gap-3 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item} className="relative border-l border-gold/35 pl-4 leading-7 text-parchment">
                {emphasizedText(item, emphasisTerms)}
              </li>
            ))}
          </ul>
        ) : (
          <p
            key={`paragraph-${index}`}
            className={`${index === 0 && !compact ? "text-[1.2rem] sm:text-[1.42rem]" : "text-[1.05rem] sm:text-[1.16rem]"} max-w-[76ch] font-display leading-[1.72] text-parchment`}
          >
            {emphasizedText(block.text, emphasisTerms)}
          </p>
        ))}
      </div>
    </div>
  );
}
