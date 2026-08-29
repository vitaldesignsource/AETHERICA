type Stage = {
  latin: string;
  english: string;
  sign: string;
  body: string;
  /** Inline styles because the stage colours are the content, not theme tokens. */
  core: string;
  ring: string;
  glow: string;
};

const stages: Stage[] = [
  {
    latin: "Nigredo",
    english: "The Blackening",
    sign: "Putrefaction",
    body: "The matter is reduced, darkened, and allowed to rot. Nothing can be recombined that has not first been undone.",
    core: "radial-gradient(circle at 34% 30%, #2b2724, #050505 70%)",
    ring: "rgba(129,118,107,.55)",
    glow: "rgba(129,118,107,.28)"
  },
  {
    latin: "Albedo",
    english: "The Whitening",
    sign: "Ablution",
    body: "What survived the rot is washed. The lunar stage: clarity, separation of the pure from the impure, the first return of light.",
    core: "radial-gradient(circle at 34% 30%, #f4ecdd, #b6a894 72%)",
    ring: "rgba(231,221,204,.7)",
    glow: "rgba(231,221,204,.34)"
  },
  {
    latin: "Citrinitas",
    english: "The Yellowing",
    sign: "Xanthosis",
    body: "The yellowing. In the Greek sequence — melanosis, leukosis, xanthosis, iosis — this was a stage in its own right; most Latin texts drop it and run three colours to the red. Kept here because the four-part scheme is older, not because it is more common.",
    core: "radial-gradient(circle at 34% 30%, #e8c96a, #8e6a36 74%)",
    ring: "rgba(181,146,85,.8)",
    glow: "rgba(181,146,85,.4)"
  },
  {
    latin: "Rubedo",
    english: "The Reddening",
    sign: "Coagulation",
    body: "Spirit and body are wedded and fixed. The completed Stone — the point at which the work and the worker are said to coincide.",
    core: "radial-gradient(circle at 34% 30%, #b3242f, #520d12 72%)",
    ring: "rgba(122,17,26,.85)",
    glow: "rgba(122,17,26,.45)"
  }
];

export function MagnumOpusStages() {
  return (
    <section id="magnum-opus" className="relative isolate scroll-mt-24 overflow-hidden border-y border-gold/20 bg-black/55">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.96),rgba(43,8,12,.32)_46%,rgba(181,146,85,.12)_78%,rgba(8,8,8,.96))]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">Magnum Opus</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            The four stages of the Work
          </h2>
          <p className="mt-4 leading-8 text-parchment">
            The colour sequence that organises the European work. Most Latin texts run three colours — black,
            white, red; the four-part scheme here is the older Greek one. The sources describe it as work on
            matter in a vessel, in language saturated with death, marriage, and rebirth. Reading those colours
            as stages of the psyche is a later move — Atwood in 1850, Silberer in 1914, Jung in 1944 —
            productive, but belonging to the reception of alchemy rather than to its texts.
          </p>
        </div>

        {/* Rail sits behind the vessels and ties the four stages into one continuous operation. */}
        <div className="relative">
          <div
            className="opus-rail pointer-events-none absolute left-0 right-0 top-[54px] hidden h-px overflow-hidden bg-gradient-to-r from-transparent via-gold/30 to-transparent lg:block"
            aria-hidden
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stages.map((stage, index) => (
              <li key={stage.latin} className="opus-stage group relative">
                <div className="flex justify-center lg:justify-start">
                  <div
                    className="opus-stage__vessel relative h-[108px] w-[108px] rounded-full"
                    style={{
                      background: stage.core,
                      boxShadow: `0 0 0 1px ${stage.ring}, 0 0 46px ${stage.glow}, inset 0 6px 22px rgba(0,0,0,.55)`
                    }}
                    aria-hidden
                  />
                </div>

                <div className="mt-7 text-center lg:text-left">
                  <p className="text-[.7rem] uppercase tracking-[.2em] text-gold">
                    {String(index + 1).padStart(2, "0")} · {stage.sign}
                  </p>
                  <h3 className="font-cinzel-brand mt-2 text-2xl text-ivory">{stage.latin}</h3>
                  <p className="font-manuscript-title font-display text-lg italic text-gold">{stage.english}</p>
                  <p className="mt-3 text-sm leading-7 text-parchment/90">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
