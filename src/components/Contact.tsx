"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { copyEmail, openEmail, profile } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await copyEmail();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      openEmail();
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-20 text-center md:px-16 md:py-28">
          <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute left-1/2 top-full -z-10 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[120px]" />

          <p className="font-mono text-[13px] text-accent">Contact</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
            Let&apos;s build something <span className="text-gradient">great together.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            I&apos;m open to full-time roles and freelance projects. Tell me about what you&apos;re working on — I&apos;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openEmail}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-text px-6 font-medium text-bg shadow-[0_8px_30px_-6px_rgb(139_141_255/0.6)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" /> Send me an email
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-line-2 bg-white/[0.03] px-5 font-medium text-muted transition-colors hover:text-text"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy email"}</span>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm">
            {[
              { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="size-4" /> },
              { href: profile.github, label: "GitHub", icon: <GithubIcon className="size-4" /> },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-muted transition-colors hover:border-line-2 hover:text-text"
              >
                {l.icon} {l.label} <ArrowUpRight className="size-3.5" />
              </a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-muted transition-colors hover:border-line-2 hover:text-text"
            >
              <FileText className="size-4" /> Resume <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-faint sm:flex-row">
        <p>© {profile.name}</p>
        <p>Designed & built with Next.js and Tailwind CSS</p>
      </footer>
    </section>
  );
}
