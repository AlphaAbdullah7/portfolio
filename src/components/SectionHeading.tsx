import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  intro,
}: Readonly<{ kicker: string; title: ReactNode; intro?: string }>) {
  return (
    <Reveal className="max-w-2xl">
      <p className="inline-flex items-center gap-2 font-mono text-[13px] text-accent">
        <span className="h-px w-6 bg-accent/60" />
        {kicker}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
