import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[.28em] text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl text-ivory">This chamber is sealed.</h1>
      <p className="mt-4 text-parchment">The page was not found, or it has not been published yet.</p>
      <Link className="focus-ring mt-8 inline-flex rounded bg-gold px-5 py-3 font-semibold text-obsidian" href="/">Return home</Link>
    </main>
  );
}
