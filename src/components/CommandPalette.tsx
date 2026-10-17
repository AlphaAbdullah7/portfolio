"use client";

import { ArrowUpRight, Briefcase, Copy, FileText, FolderGit2, Home, Mail, Search, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { copyEmail, openEmail, profile } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./brand-icons";

export const OPEN_PALETTE = "open-command-palette";

type Action = { id: string; label: string; group: string; icon: ReactNode; run: () => void; hint?: string };

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const actions = useMemo<Action[]>(
    () => [
      { id: "top", label: "Home", group: "Navigate", icon: <Home />, run: () => scrollTo("top") },
      { id: "work", label: "Projects", group: "Navigate", icon: <FolderGit2 />, run: () => scrollTo("work") },
      { id: "exp", label: "Experience", group: "Navigate", icon: <Briefcase />, run: () => scrollTo("experience") },
      { id: "about", label: "About", group: "Navigate", icon: <User />, run: () => scrollTo("about") },
      { id: "contact", label: "Contact", group: "Navigate", icon: <Mail />, run: () => scrollTo("contact") },
      {
        id: "copy",
        label: "Copy email address",
        group: "Actions",
        icon: <Copy />,
        run: () => {
          copyEmail().then(
            () => setToast("Email copied to clipboard"),
            () => openEmail(),
          );
        },
      },
      { id: "mail", label: "Send an email", group: "Actions", icon: <Mail />, run: openEmail },
      { id: "resume", label: "View resume", group: "Actions", icon: <FileText />, run: () => window.open(profile.resume, "_blank") },
      { id: "gh", label: "GitHub", group: "Links", icon: <GithubIcon />, run: () => window.open(profile.github, "_blank", "noopener") },
      { id: "li", label: "LinkedIn", group: "Links", icon: <LinkedinIcon />, run: () => window.open(profile.linkedin, "_blank", "noopener") },
    ],
    [],
  );

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      clearTimeout(t);
      setQuery("");
      setActive(0);
      lastFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const choose = (a: Action | undefined) => {
    if (!a) return;
    setOpen(false);
    a.run();
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-2 bg-surface/95 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i) => (i + 1) % Math.max(filtered.length, 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  choose(filtered[active]);
                }
              }}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 text-faint" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="no-ring h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
                />
                <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-faint">esc</kbd>
              </div>

              <ul role="listbox" className="max-h-[360px] overflow-y-auto p-2 [scrollbar-color:rgb(255_255_255/0.12)_transparent] [scrollbar-width:thin]">
                {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-faint">No results for “{query}”</li>}
                {filtered.map((a, i) => {
                  const header = a.group !== lastGroup ? a.group : null;
                  lastGroup = a.group;
                  return (
                    <li key={a.id}>
                      {header && <p className="px-3 pb-1.5 pt-3 text-xs font-medium text-faint">{header}</p>}
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => choose(a)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors [&_svg]:size-4 ${
                          i === active ? "bg-white/[0.07] text-text" : "text-muted"
                        }`}
                      >
                        <span className={i === active ? "text-accent" : "text-faint"}>{a.icon}</span>
                        <span className="flex-1">{a.label}</span>
                        {a.hint && <span className="font-mono text-xs text-faint">{a.hint}</span>}
                        {a.group === "Links" && <ArrowUpRight className="text-faint" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-faint">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> select</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl border border-line-2 bg-surface px-4 py-2.5 text-sm shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
