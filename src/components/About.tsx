import { Clock, GraduationCap, MapPin, Presentation, Trophy } from "lucide-react";
import { about, awards, education, profile, skills, teaching } from "@/lib/content";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        kicker="About"
        title={<>A bit <span className="text-gradient">about me</span></>}
      />

      <div className="mt-14 grid gap-4 md:grid-cols-6">
        {/* Bio */}
        <Reveal className="md:col-span-4">
          <Spotlight className="h-full rounded-3xl p-7 md:p-9">
            <p className="text-xl leading-relaxed text-text/90 md:text-2xl md:leading-relaxed">{about}</p>
          </Spotlight>
        </Reveal>

        {/* Local time */}
        <Reveal delay={0.06} className="md:col-span-2">
          <Spotlight className="h-full rounded-3xl p-7">
            <Clock className="size-5 text-accent" />
            <p className="mt-6 text-sm text-muted">My local time</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              <LocalTime timeZone={profile.timezone} />
            </p>
            <p className="mt-1 text-sm text-faint">PKT · UTC+5</p>
          </Spotlight>
        </Reveal>

        {/* Location — a radar ping over the grid */}
        <Reveal className="md:col-span-2">
          <Spotlight className="relative h-full min-h-[220px] overflow-hidden rounded-3xl p-7">
            <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
            <div aria-hidden="true" className="absolute right-10 top-10 grid place-items-center">
              <span className="absolute size-24 animate-ping rounded-full border border-accent-2/40 [animation-duration:2.4s]" />
              <span className="absolute size-12 rounded-full bg-accent-2/15" />
              <span className="relative size-3 rounded-full bg-accent-2 shadow-[0_0_20px_rgb(94_234_212)]" />
            </div>
            <div className="relative flex h-full flex-col justify-end">
              <MapPin className="size-5 text-accent-2" />
              <p className="mt-4 text-lg font-semibold">{profile.location}</p>
              <p className="font-mono text-xs text-faint">33.6° N, 73.0° E</p>
            </div>
          </Spotlight>
        </Reveal>

        {/* Education */}
        <Reveal delay={0.06} className="md:col-span-2">
          <Spotlight className="h-full rounded-3xl p-7">
            <GraduationCap className="size-5 text-accent" />
            <p className="mt-6 text-sm text-muted">{education.period}</p>
            <p className="mt-1 text-lg font-semibold leading-snug">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
          </Spotlight>
        </Reveal>

        {/* Awards */}
        <Reveal delay={0.12} className="md:col-span-2">
          <Spotlight className="h-full rounded-3xl p-7">
            <Trophy className="size-5 text-accent" />
            <p className="mt-6 text-sm text-muted">Recognition</p>
            <ul className="mt-2 space-y-3">
              {awards.map((a) => (
                <li key={a.title} className="font-medium leading-snug">
                  {a.title}
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>

        {/* Teaching */}
        <Reveal className="md:col-span-2">
          <Spotlight className="h-full rounded-3xl p-7">
            <Presentation className="size-5 text-accent" />
            <p className="mt-6 text-sm text-muted">Teaching</p>
            <p className="mt-1 text-lg font-semibold">{teaching.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{teaching.text}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {teaching.stack.map((t) => (
                <li key={t} className="rounded-md bg-accent/10 px-2 py-1 font-mono text-xs text-accent">
                  {t}
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>

        {/* Skills */}
        <Reveal delay={0.06} className="md:col-span-4">
          <Spotlight className="h-full rounded-3xl p-7 md:p-8">
            <p className="text-sm font-medium">Tech I work with</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group}>
                  <p className="font-mono text-xs text-faint">{s.group}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[13px] text-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
