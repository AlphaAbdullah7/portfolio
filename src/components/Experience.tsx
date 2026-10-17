import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

export default function Experience() {
  return (
    <section id="experience" className="relative border-y border-line bg-surface/40 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Experience"
          title={<>Where I&apos;ve <span className="text-gradient">worked</span></>}
        />

        <ol className="relative mt-16 space-y-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-accent before:via-line-2 before:to-transparent md:before:left-[calc(25%+7px)]">
          {experience.map((r, i) => (
            <li key={r.org} className="relative grid gap-4 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-7 size-[15px] rounded-full border-2 md:left-[25%] ${
                  i === 0 ? "border-accent bg-accent/30 shadow-[0_0_16px_rgb(139_141_255/0.8)]" : "border-line-2 bg-bg"
                }`}
              />
              <Reveal className="md:pt-6 md:text-right md:pr-6">
                <p className="font-mono text-sm text-muted">{r.period}</p>
              </Reveal>
              <Reveal delay={0.08} className="md:col-span-3 md:pl-10">
                <Spotlight className="rounded-2xl p-6 md:p-7">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {r.title} <span className="text-muted">· {r.org}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5 leading-relaxed text-muted">
                    {r.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {r.stack.map((t) => (
                      <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {r.link && (
                    <a
                      href={r.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text"
                    >
                      {r.link.label} <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
