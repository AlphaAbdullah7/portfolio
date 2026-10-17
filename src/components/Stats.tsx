import { marquee, stats } from "@/lib/content";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-6xl px-6">
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4 [&>div]:bg-bg">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 p-6 md:p-8">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="marquee-mask mt-16 overflow-hidden" aria-label="Technologies I use">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((t, i) => (
            <li
              key={`${t}-${i}`}
              aria-hidden={i >= marquee.length}
              className="whitespace-nowrap rounded-full border border-line bg-white/[0.02] px-5 py-2 font-mono text-sm text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
