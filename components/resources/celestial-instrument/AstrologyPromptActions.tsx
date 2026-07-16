"use client";

import { Bot, Copy, ExternalLink } from "lucide-react";
import type { AstrologyAssistantContext } from "@/lib/astrology/types";

type Props = {
  tool: AstrologyAssistantContext["tool"];
  snapshot: unknown;
  prompts?: string[];
};

const defaultPrompts = [
  "Give a traditional astrology reading, but separate calculation from interpretation.",
  "Interpret this sky in relation to the episode theme.",
  "Create listener-friendly show notes from this timing."
];

export function AstrologyPromptActions({ tool, snapshot, prompts = defaultPrompts }: Props) {
  function buildContext(userPrompt: string): AstrologyAssistantContext {
    return { source: "celestial-instrument", tool, snapshot, userPrompt };
  }

  async function copyContext(userPrompt: string) {
    await navigator.clipboard.writeText(JSON.stringify(buildContext(userPrompt), null, 2));
  }

  function sendToOracle(userPrompt: string) {
    window.localStorage.setItem("aetherica-oracle-pending-context", JSON.stringify(buildContext(userPrompt), null, 2));
    window.location.assign("/admin/oracle");
  }

  return (
    <div className="grid gap-2" aria-label="Aetherica Oracle prompt actions">
      <p className="text-xs uppercase tracking-[.22em] text-gold">Ask the Oracle</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {prompts.map((prompt) => (
          <div key={prompt} className="flex items-stretch overflow-hidden rounded border border-gold/20 bg-black/35">
            <button className="flex min-h-11 flex-1 items-center gap-2 px-3 py-2 text-left text-xs leading-5 text-parchment hover:bg-gold/10 hover:text-ivory" type="button" onClick={() => sendToOracle(prompt)}>
              <Bot size={15} className="shrink-0 text-gold" />
              <span>{prompt}</span>
              <ExternalLink size={13} className="ml-auto shrink-0 text-gold" />
            </button>
            <button className="border-l border-gold/15 px-3 text-gold hover:bg-gold/10 hover:text-ivory" type="button" onClick={() => copyContext(prompt)} aria-label={`Copy Oracle context for: ${prompt}`}>
              <Copy size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
