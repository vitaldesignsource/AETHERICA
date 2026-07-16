import { NextResponse } from "next/server";
import { z } from "zod";
import { oracleModes } from "@/lib/oracle/actions";
import { buildOraclePrompt, oracleSystemPrompt } from "@/lib/oracle/prompts";
import { buildOracleSiteIndexSummary } from "@/lib/oracle/siteIndex";

export const runtime = "nodejs";

const oracleRequestSchema = z.object({
  message: z.string().trim().min(1).max(24000),
  context: z.string().max(80000).optional().default(""),
  mode: z.enum(oracleModes).default("Site Architect")
});

function isAuthorized(request: Request) {
  const configuredPassword = process.env.ORACLE_ADMIN_PASSWORD;
  if (!configuredPassword) return true;
  const providedPassword = request.headers.get("x-oracle-admin-password");
  return providedPassword === configuredPassword;
}

function extractResponseText(payload: unknown) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  if (typeof payload === "object" && payload !== null && "output" in payload && Array.isArray(payload.output)) {
    return payload.output
      .flatMap((item) => {
        if (typeof item !== "object" || item === null || !("content" in item) || !Array.isArray(item.content)) return [];
        return item.content.map((contentItem: unknown) => {
          if (
            typeof contentItem === "object" &&
            contentItem !== null &&
            "text" in contentItem &&
            typeof contentItem.text === "string"
          ) {
            return contentItem.text;
          }
          return "";
        });
      })
      .filter(Boolean)
      .join("\n\n");
  }

  return "";
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Oracle access denied. Check ORACLE_ADMIN_PASSWORD and the password entered in the dashboard." },
      { status: 401 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Add it to your local environment to activate the Aetherica Site Oracle."
      },
      { status: 503 }
    );
  }

  const parsed = oracleRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "The Oracle request was malformed.", details: parsed.error.flatten() }, { status: 400 });
  }

  const model = process.env.ORACLE_MODEL ?? "gpt-4.1-mini";
  const input = buildOraclePrompt({
    mode: parsed.data.mode,
    action: parsed.data.message,
    context: parsed.data.context,
    siteIndex: buildOracleSiteIndexSummary()
  });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: oracleSystemPrompt,
      input,
      temperature: 0.7,
      max_output_tokens: 3000
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: "The Oracle could not complete the request.", detail: detail.slice(0, 1200) },
      { status: response.status }
    );
  }

  const payload = (await response.json()) as unknown;
  const text = extractResponseText(payload);
  return NextResponse.json({
    text: text || "The Oracle returned an empty response. Try a more specific request or provide more context.",
    model
  });
}
