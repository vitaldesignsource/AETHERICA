"use client";

import { Mail, MessageSquareText, Send } from "lucide-react";
import { useMemo, useState } from "react";

type ContactFormProps = {
  recipientEmail: string;
};

const inquiryTypes = [
  "Listener question",
  "Episode suggestion",
  "Guest suggestion",
  "Correction or source note",
  "Interview or collaboration",
  "General message"
];

function encodeMailto(value: string) {
  return encodeURIComponent(value);
}

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [inquiryType, setInquiryType] = useState(inquiryTypes[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [humanCheck, setHumanCheck] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = `[Aetherica] ${inquiryType}${name ? ` from ${name}` : ""}`;
    const body = [
      `Inquiry type: ${inquiryType}`,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      context ? `Episode/topic: ${context}` : "",
      "",
      message || "Write your message here."
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${recipientEmail}?subject=${encodeMailto(subject)}&body=${encodeMailto(body)}`;
  }, [context, email, inquiryType, message, name, recipientEmail]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (humanCheck.trim() !== "7") {
      setError("Please answer the human verification question before sending.");
      return;
    }
    setError("");
    window.location.href = mailtoHref;
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
      <div className="rounded border border-gold/20 bg-black/25 p-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Send a note</p>
            <p className="mt-1 text-sm leading-6 text-parchment">
              Listener questions, episode ideas, corrections, guest leads, and collaboration messages are directed to{" "}
              <button className="text-ivory underline decoration-gold/50 underline-offset-4" type="button" onClick={copyEmail}>
                {recipientEmail}
              </button>
              .
            </p>
            {copied ? <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">Email copied</p> : null}
          </div>
        </div>
      </div>

      <label className="block">
        <span className="text-sm uppercase tracking-[0.18em] text-gold">Message type</span>
        <select
          className="focus-ring mt-2 w-full rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory"
          value={inquiryType}
          onChange={(event) => setInquiryType(event.target.value)}
        >
          {inquiryTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm uppercase tracking-[0.18em] text-gold">Name</span>
          <input
            className="focus-ring mt-2 w-full rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory placeholder:text-parchment/50"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm uppercase tracking-[0.18em] text-gold">Email</span>
          <input
            className="focus-ring mt-2 w-full rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory placeholder:text-parchment/50"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm uppercase tracking-[0.18em] text-gold">Episode or topic</span>
        <input
          className="focus-ring mt-2 w-full rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory placeholder:text-parchment/50"
          value={context}
          onChange={(event) => setContext(event.target.value)}
          placeholder="Optional: episode title, guest, book, or subject"
        />
      </label>

      <label className="block">
        <span className="text-sm uppercase tracking-[0.18em] text-gold">Message</span>
        <textarea
          className="focus-ring mt-2 min-h-40 w-full resize-y rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory placeholder:text-parchment/50"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your listener question or message."
          required
        />
      </label>

      <label className="block">
        <span className="text-sm uppercase tracking-[0.18em] text-gold">Human verification</span>
        <input
          className="focus-ring mt-2 w-full rounded border border-gold/25 bg-black/40 px-3 py-3 text-ivory placeholder:text-parchment/50"
          value={humanCheck}
          onChange={(event) => setHumanCheck(event.target.value)}
          placeholder="What is 3 + 4?"
          inputMode="numeric"
          required
        />
      </label>
      {error ? <p className="rounded border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-parchment">{error}</p> : null}

      <div className="flex flex-col gap-3 border-t border-gold/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <a className="inline-flex items-center gap-2 text-sm text-parchment hover:text-ivory" href={`mailto:${recipientEmail}`}>
          <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
          {recipientEmail}
        </a>
        <button
          className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-crimson bg-crimson px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ivory transition hover:border-blood hover:bg-blood"
          type="submit"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Message
        </button>
      </div>
    </form>
  );
}
