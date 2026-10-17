"use client";

import type { ComponentPropsWithoutRef, PointerEvent } from "react";

// A div whose glowing border follows the cursor (styles in .spotlight).
export default function Spotlight({ className = "", onPointerMove, ...rest }: ComponentPropsWithoutRef<"div">) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  };
  return <div className={`spotlight ${className}`} onPointerMove={move} {...rest} />;
}
