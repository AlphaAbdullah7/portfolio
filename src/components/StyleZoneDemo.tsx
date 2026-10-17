"use client";

import { ArrowUpRight, Monitor, Play, RotateCw, Smartphone, Tablet } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Live StyleZone demo with a device switcher. The iframe renders at each
 * device's logical size (so the app's real breakpoints fire) and is scaled
 * with a CSS transform to fit the stage. It mounts on click so the heavy
 * bundle and free-tier backend wake-up aren't paid on every visit.
 */

const DEVICES = {
  mobile: { label: "Mobile", w: 390, h: 844, Icon: Smartphone },
  tablet: { label: "Tablet", w: 834, h: 1112, Icon: Tablet },
  desktop: { label: "Desktop", w: 1440, h: 900, Icon: Monitor },
} as const;

type DeviceKey = keyof typeof DEVICES;

const CHROME_H = 40;
const PAD = 28;

export default function StyleZoneDemo({
  appUrl,
  password,
  accounts,
}: Readonly<{ appUrl: string; password: string; accounts: { role: string; email: string }[] }>) {
  const [device, setDevice] = useState<DeviceKey>("mobile");
  const [launched, setLaunched] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [avail, setAvail] = useState({ w: 0, h: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAvail({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const d = DEVICES[device];
  const scaleW = avail.w > 0 ? (avail.w - PAD) / d.w : 1;
  const scaleH = avail.h > 0 ? (avail.h - CHROME_H - PAD) / d.h : 1;
  const scale = Math.max(0.1, Math.min(1, scaleW, scaleH));
  const vw = Math.round(d.w * scale);
  const vh = Math.round(d.h * scale);
  const host = appUrl.replace(/^https?:\/\//, "");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Preview device" className="inline-flex rounded-xl border border-line bg-surface p-1">
          {(Object.keys(DEVICES) as DeviceKey[]).map((key) => {
            const { Icon, label } = DEVICES[key];
            const active = key === device;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDevice(key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active ? "bg-text text-bg" : "text-muted hover:text-text"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {launched && (
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text"
            >
              <RotateCw className="size-4" /> Reload
            </button>
          )}
          <a href={appUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text">
            Open full app <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative flex h-[68vh] max-h-[780px] min-h-[460px] items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface"
      >
        <div aria-hidden="true" className="grid-bg absolute inset-0" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]" />

        {launched ? (
          <div className="relative overflow-hidden rounded-xl border border-line-2 bg-surface-2 shadow-2xl" style={{ width: vw }}>
            <div className="flex items-center gap-2 border-b border-line px-3" style={{ height: CHROME_H }}>
              <span className="flex gap-1.5">
                <i className="size-2.5 rounded-full bg-[#ff5f57]" />
                <i className="size-2.5 rounded-full bg-[#febc2e]" />
                <i className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[11px] text-muted">{host}</span>
            </div>
            <div style={{ width: vw, height: vh }} className="overflow-hidden bg-white">
              <iframe
                key={reloadKey}
                src={appUrl}
                title="StyleZone live app"
                width={d.w}
                height={d.h}
                allow="camera; microphone; geolocation; clipboard-write; encrypted-media"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ transform: `scale(${scale})`, transformOrigin: "top left", border: 0 }}
              />
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setLaunched(true)} className="group relative flex flex-col items-center gap-5 text-center">
            <span className="grid size-18 place-items-center rounded-full bg-text text-bg shadow-[0_0_60px_-10px_rgb(139_141_255/0.9)] transition-transform group-hover:scale-105">
              <Play className="size-7 translate-x-0.5 fill-current" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Launch live demo</span>
              <span className="mt-1 block max-w-xs text-sm text-muted">
                Loads the real app in an embedded window. First load may take a few seconds while the free-tier backend wakes up.
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface px-5 py-4">
        <span className="text-sm font-medium">Demo logins</span>
        {accounts.map((a) => (
          <Cred key={a.email} label={a.role} value={a.email} />
        ))}
        <Cred label="Password" value={password} />
        <span className="text-xs text-faint">Test data · Stripe in test mode</span>
      </div>
    </div>
  );
}

function Cred({ label, value }: Readonly<{ label: string; value: string }>) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="inline-flex items-center gap-2 text-sm"
      title={`Copy ${label}`}
    >
      <span className="text-muted">{label}:</span>
      <span className="rounded-md border border-line bg-white/[0.04] px-2 py-0.5 font-mono text-[13px] hover:border-accent/50">{value}</span>
      <span className="font-mono text-[11px] text-faint">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
