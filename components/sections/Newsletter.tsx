"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  consent: z.boolean().refine(Boolean, "Consent is required.")
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, sourcePage: window.location.pathname })
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <section className="bg-burgundy/55 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[.28em] text-gold">Newsletter</p>
          <h2 className="mt-3 font-display text-4xl text-ivory">Join the Circle</h2>
          <p className="mt-4 text-parchment">Receive new episodes, archive notes, event notices, and editorial dispatches.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="temple-border grid gap-4 rounded p-5" noValidate>
          <label className="grid gap-2 text-sm text-parchment">
            Email address
            <input className="focus-ring min-h-12 rounded border border-gold/25 bg-obsidian px-3 text-ivory" type="email" {...register("email")} />
            {errors.email ? <span className="text-sm text-red-200" role="alert">{errors.email.message}</span> : null}
          </label>
          <label className="flex gap-3 text-sm text-parchment">
            <input className="mt-1 accent-gold" type="checkbox" {...register("consent")} />
            <span>I agree to receive emails from Aetherica. Unsubscribe links and privacy details will be included in every message.</span>
          </label>
          {errors.consent ? <span className="text-sm text-red-200" role="alert">{errors.consent.message}</span> : null}
          <button className="focus-ring min-h-12 rounded bg-gold px-5 font-semibold text-obsidian hover:bg-ivory" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
          <div aria-live="polite" className="text-sm text-parchment">
            {status === "success" ? "You are subscribed. Welcome to the circle." : null}
            {status === "error" ? "The form could not be submitted. Please try again." : null}
          </div>
        </form>
      </div>
    </section>
  );
}
