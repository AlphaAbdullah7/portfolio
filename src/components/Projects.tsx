import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/content";
import { GithubIcon } from "./brand-icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Spotlight from "./Spotlight";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        kicker="Selected work"
        title={<>Things I&apos;ve <span className="text-gradient">built and shipped</span></>}
        intro="A couple of projects I'm proud of — each one live, so you can try it yourself."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: Readonly<{ project: Project }>) {
  return (
    <Spotlight className="group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1">
      {/* Whole card opens the case study; action links sit above it. */}
      {p.caseStudy && (
        <Link href={p.caseStudy} aria-label={`Open ${p.name} case study`} className="absolute inset-0 z-10 rounded-3xl" />
      )}

      <div className="relative m-2 aspect-[16/11] overflow-hidden rounded-2xl border border-line bg-surface-2">
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.name} preview`}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover object-[center_30%] transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <PhoneArt />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs font-medium backdrop-blur-md">
          {p.kind}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4 md:p-8 md:pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
          {p.note && <span className="mt-1.5 shrink-0 font-mono text-xs text-faint">{p.note}</span>}
        </div>
        <p className="mt-3 leading-relaxed text-muted">{p.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li key={t} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="relative z-20 mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
          {p.caseStudy && (
            <Link href={p.caseStudy} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text">
              View case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text">
              Live demo <ArrowUpRight className="size-4" />
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text">
              <GithubIcon className="size-4" /> Code
            </a>
          )}
        </div>
      </div>
    </Spotlight>
  );
}

// Stylised app screens for projects without a screenshot.
function PhoneArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 overflow-hidden bg-[radial-gradient(80%_80%_at_30%_10%,rgb(139_141_255/0.25),transparent_60%),radial-gradient(70%_70%_at_90%_100%,rgb(94_234_212/0.15),transparent_60%)]">
      <div className="grid-bg absolute inset-0 opacity-60" />
      {[0, 1].map((n) => (
        <div
          key={n}
          className={`relative h-[78%] w-[30%] max-w-[150px] rounded-[22px] border border-white/15 bg-bg/90 p-2.5 shadow-2xl transition-transform duration-700 ${
            n === 0 ? "-rotate-6 group-hover:-rotate-3" : "translate-y-6 rotate-6 group-hover:rotate-3"
          }`}
        >
          <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-white/15" />
          <div className="h-[22%] rounded-xl bg-gradient-to-br from-accent to-accent-2 opacity-90" />
          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded bg-white/20" />
            <div className="h-1.5 w-1/2 rounded bg-white/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="aspect-square rounded-lg bg-white/[0.06]" />
            ))}
          </div>
          <div className="absolute inset-x-2.5 bottom-2.5 h-5 rounded-lg bg-white/90" />
        </div>
      ))}
    </div>
  );
}
