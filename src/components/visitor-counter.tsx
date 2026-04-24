"use client";

import { useEffect, useState } from "react";

const BASE_COUNT = 31337;

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("fake_visits");
    const visits = stored ? parseInt(stored, 10) + 1 : BASE_COUNT;
    sessionStorage.setItem("fake_visits", String(visits));
    setCount(visits);
  }, []);

  const display =
    count === null ? "------" : String(count).padStart(6, "0");

  return (
    <div className="retro-raised bg-retro-panel-alt inline-flex items-center gap-2 px-3 py-1">
      <span className="font-pixel text-pixel-xs text-retro-fg-dim">VISITORS:</span>
      <span
        className="font-vt text-vt-lg text-retro-amber"
        style={{ textShadow: "0 0 6px var(--retro-amber)" }}
        suppressHydrationWarning
      >
        {display}
      </span>
    </div>
  );
}
