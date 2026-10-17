import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Spotlight from "@/components/Spotlight";
import StyleZoneDemo from "@/components/StyleZoneDemo";
import { profile, stylezoneDemo } from "@/lib/content";

export const metadata: Metadata = {
  title: `StyleZone — Case study · ${profile.name}`,
  description:
    "A cross-platform salon-booking platform — one codebase running native iOS, Android, and web. Built end-to-end: design system, API, and database. Try the live demo.",
};

const TECH = [
  "TypeScript",
  "React Native (Expo)",
  "React Native Web",
  "Tamagui",
  "Node / Express",
  "MongoDB Atlas",
  "Atlas Search",
  "Stripe",
  "Cloudinary",
];

const CLIENT_FEATURES = [
  "Browse & search salons",
  "Filter by service, price & location",
  "View services and provider portfolios",
  "Book appointments",
  "Pay with Stripe",
  "Manage bookings",
];

const PROVIDER_FEATURES = [
  "Manage a service catalog (active / inactive)",
  "Set weekly availability",
  "Build a portfolio",
  "Connect Stripe for payouts",
  "Track appointments",
];

const BUILD = [
  "Monorepo (pnpm + Turborepo): an Expo client, an Express API, and shared packages — a UI design system, types, services, and validation.",
  "One codebase → iOS, Android, and web via react-native-web, with .native / .web platform shims for native-only dependencies (Stripe, maps).",
  "A custom Tamagui design system: tokens → atoms → molecules → organisms, documented in Storybook.",
  "Size-based responsiveness — the same components flow from phone to desktop through media breakpoints, not device forks.",
  "Backend on Express + Mongoose with MongoDB Atlas, full-text discovery via Atlas Search, JWT auth, Stripe (payments + Connect), and a Cloudinary image pipeline.",
  "Deployed across free tiers: web on Vercel (static SPA), API on Render, database on Atlas, with uptime monitoring for keep-alive.",
];

const HIGHLIGHTS = [
  "Shipped a single UI source to three platforms without forking components.",
  "Built a token-driven, size-responsive design system instead of hardcoding layouts.",
  "Made discovery typo-tolerant with Atlas Search rather than naive regex matching.",
  "Modeled real domain rules — single-slot availability, and inactive services hidden from search and booking.",
];

export default function StyleZoneCaseStudy() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 -z-10 h-[700px]" />
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/#work" className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted hover:text-text">
          <ArrowLeft className="size-4" /> Back to work
        </Link>
        <Link href="/" className="text-sm font-medium">
          {profile.name}
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-16">
        <Reveal>
          <p className="font-mono text-[13px] text-accent">Personal project · Full-stack · Cross-platform</p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-[-0.05em]">StyleZone</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
            A unisex beauty &amp; grooming booking platform — one codebase running native iOS, Android, and web. Designed and built end-to-end.
          </p>
          <a
            href={stylezoneDemo.appUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-text px-6 font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Open full app <ArrowUpRight className="size-4" />
          </a>
          <ul className="mt-8 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <li key={t} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <Reveal>
          <StyleZoneDemo appUrl={stylezoneDemo.appUrl} password={stylezoneDemo.password} accounts={stylezoneDemo.accounts} />
          <p className="mt-4 text-sm text-faint">
            The real app, embedded. Switch device sizes to watch the layout adapt — the app sees each viewport and reflows for real.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Overview" title="A two-sided booking product" />
        <Reveal>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            StyleZone is a two-sided booking product: clients discover salons and book appointments; providers manage their services,
            availability, and payments. Built solo to take a real product from data model and design system all the way to a deployed,
            cross-platform app.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            { title: "For clients", items: CLIENT_FEATURES },
            { title: "For providers", items: PROVIDER_FEATURES },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Spotlight className="h-full rounded-3xl p-7">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <ul className="mt-5 space-y-3">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-2" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Architecture" title="How it's built" />
        <ol className="mt-12 grid gap-3">
          {BUILD.map((b, i) => (
            <Reveal key={b} delay={i * 0.05}>
              <li className="flex gap-5 rounded-2xl border border-line bg-white/[0.02] p-5 md:p-6">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="leading-relaxed text-muted">{b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Highlights" title="Engineering highlights" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h} delay={i * 0.06}>
              <Spotlight className="flex h-full gap-4 rounded-2xl p-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgb(139_141_255)]" />
                <p className="leading-relaxed">{h}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 border-t border-line px-6 py-10">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
          <ArrowLeft className="size-4" /> Back to portfolio
        </Link>
        <a href={stylezoneDemo.appUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text">
          Live app <ArrowUpRight className="size-4" />
        </a>
      </div>
    </main>
  );
}
