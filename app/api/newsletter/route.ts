import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  consent: z.literal(true),
  sourcePage: z.string().max(200).optional()
});

export async function POST(request: Request) {
  const result = schema.safeParse(await request.json());
  if (!result.success) {
    return NextResponse.json({ error: "Invalid subscription request." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    provider: "placeholder",
    consentTimestamp: new Date().toISOString()
  });
}
