"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { shellPath } from "./site-map";

/**
 * The current path as a shell would print it ("~/projects"). On the server a
 * not-found page renders as "/_not-found" while the browser has the real URL,
 * so the span remounts once after hydration (a new key) instead of React
 * flagging the difference as a hydration error.
 */
export function PathLabel({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <span key={mounted ? "client" : "server"} className={className} aria-hidden={ariaHidden} suppressHydrationWarning>
      {shellPath(pathname)}
    </span>
  );
}
