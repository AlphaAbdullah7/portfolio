"use client";

import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { OPEN_PALETTE } from "./CommandPalette";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
      />
      {/* Same container as the page sections, so the pill's edges line up with the content. */}
      <div className="mx-auto max-w-6xl px-6">
      <nav
        aria-label="Main"
        className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-line-2 bg-bg/75 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.8)]"
            : "border-line bg-white/[0.03]"
        }`}
      >
        <a href="#top" className="rounded-lg px-2 py-1.5 text-[15px] font-semibold tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                className={`relative z-10 block rounded-lg px-4 py-2 text-sm transition-colors ${
                  active === l.id ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-muted transition-colors hover:border-line-2 hover:text-text lg:flex"
            aria-label="Open command palette"
          >
            <Search className="size-4" />
            <kbd className="font-mono text-xs">Ctrl K</kbd>
          </button>
          <a
            href="#contact"
            className="hidden rounded-lg bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 sm:block"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-muted hover:text-text md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-6 top-20 rounded-2xl border border-line bg-surface/95 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base text-muted hover:bg-white/5 hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
