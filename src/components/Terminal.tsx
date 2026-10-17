"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { experience, openEmail, profile, projects, skills } from "@/lib/content";

type Line = { id: number; node: ReactNode };

const PROMPT = (
  <span className="shrink-0 select-none whitespace-pre">
    <span className="text-accent-2">abdullah</span>
    <span className="text-faint">@</span>
    <span className="text-accent">portfolio</span>
    <span className="text-faint"> ~ $ </span>
  </span>
);

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const COMMANDS: Record<string, { desc: string; run: () => ReactNode }> = {
  help: {
    desc: "list commands",
    run: () => (
      <div className="grid grid-cols-[7rem_1fr] gap-x-3">
        {Object.entries(COMMANDS).map(([k, v]) => (
          <div key={k} className="contents">
            <span className="text-accent">{k}</span>
            <span className="text-muted">{v.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    desc: "who is this?",
    run: () => (
      <span>
        {profile.name} — {profile.title}, {profile.location}.
      </span>
    ),
  },
  projects: {
    desc: "selected work",
    run: () => {
      go("work");
      return (
        <ul>
          {projects.map((p) => (
            <li key={p.name}>
              <span className="text-accent-2">▸ {p.name}</span> <span className="text-faint">— {p.kind}</span>
            </li>
          ))}
        </ul>
      );
    },
  },
  experience: {
    desc: "where I've worked",
    run: () => {
      go("experience");
      return (
        <ul>
          {experience.map((r) => (
            <li key={r.org}>
              <span className="text-text">{r.title}</span> <span className="text-faint">@ {r.org} · {r.period}</span>
            </li>
          ))}
        </ul>
      );
    },
  },
  skills: {
    desc: "tech I use",
    run: () => (
      <ul>
        {skills.map((s) => (
          <li key={s.group}>
            <span className="text-accent">{s.group.toLowerCase()}</span>
            <span className="text-faint">: </span>
            {s.items.join(", ")}
          </li>
        ))}
      </ul>
    ),
  },
  contact: {
    desc: "get in touch",
    run: () => {
      go("contact");
      return (
        <span>
          Scrolling you to the contact section — or{" "}
          <button type="button" onClick={openEmail} className="text-accent-2 underline underline-offset-2">
            open your mail app
          </button>
          .
        </span>
      );
    },
  },
  resume: {
    desc: "view my resume",
    run: () => {
      window.open(profile.resume, "_blank");
      return <span>Opening resume…</span>;
    },
  },
  github: {
    desc: "open GitHub",
    run: () => {
      window.open(profile.github, "_blank", "noopener");
      return <span>Opening GitHub…</span>;
    },
  },
  "sudo hire-me": {
    desc: "you know you want to",
    run: () => {
      go("contact");
      return <span className="text-emerald-400">✓ Permission granted. Scrolling you to my inbox…</span>;
    },
  },
  clear: { desc: "clear the screen", run: () => null },
};

const BOOT: { cmd: string; out: () => ReactNode }[] = [
  { cmd: "whoami", out: COMMANDS.whoami.run },
  { cmd: "skills", out: COMMANDS.skills.run },
];

export default function Terminal() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (node: ReactNode) => setLines((l) => [...l, { id: idRef.current++, node }]);
  const echo = (cmd: string) =>
    push(
      <span>
        {PROMPT}
        {cmd}
      </span>,
    );

  // Boot sequence: type a couple of commands, then hand over to the visitor.
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      for (const step of BOOT) {
        if (!reduce) {
          await sleep(500);
          for (let i = 1; i <= step.cmd.length && !cancelled; i++) {
            setTyping(step.cmd.slice(0, i));
            await sleep(70);
          }
          await sleep(250);
        }
        if (cancelled) return;
        setTyping("");
        echo(step.cmd);
        push(step.out());
      }
      if (!cancelled) {
        push(
          <span className="text-faint">
            Type <span className="text-accent">help</span> to see what else I can do.
          </span>,
        );
        setBooted(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, typing]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = value.trim().toLowerCase();
    setValue("");
    setHIdx(-1);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    echo(cmd);
    const c = COMMANDS[cmd];
    push(c ? c.run() : <span className="text-rose-400">command not found: {cmd}. Try <span className="text-accent">help</span>.</span>);
  };

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/20 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-line-2 bg-[#0b0d13]/90 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-faint">abdullah@portfolio — zsh</span>
        </div>

        {/* Clicking anywhere in the window focuses the prompt, like a real terminal. */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="h-[340px] cursor-text overflow-y-auto p-5 font-mono text-[13px] leading-relaxed text-text/90 [scrollbar-color:rgb(255_255_255/0.12)_transparent] [scrollbar-width:thin]"
        >
          <div aria-live="polite" className="space-y-1.5">
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}
          </div>

          {!booted ? (
            <div className="mt-1.5">
              {PROMPT}
              {typing}
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
            </div>
          ) : (
            <form onSubmit={submit} className="mt-1.5 flex items-center">
              {PROMPT}
              <label htmlFor="term-input" className="sr-only">
                Terminal command
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" && history.length) {
                    e.preventDefault();
                    const i = Math.min(hIdx + 1, history.length - 1);
                    setHIdx(i);
                    setValue(history[i]);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const i = hIdx - 1;
                    setHIdx(Math.max(i, -1));
                    setValue(i >= 0 ? history[i] : "");
                  }
                }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="type help"
                className="no-ring min-w-0 flex-1 bg-transparent text-text caret-accent outline-none placeholder:text-faint/60"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
