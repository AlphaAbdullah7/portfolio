"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000 * 15);
  return () => clearInterval(id);
};

export default function LocalTime({ timeZone }: Readonly<{ timeZone: string }>) {
  const time = useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(new Date()),
    () => "—",
  );
  return <span suppressHydrationWarning>{time}</span>;
}
