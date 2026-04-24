"use client";

interface MarqueeTickerProps {
  items: string[];
  speed?: "slow" | "med" | "fast";
  separator?: string;
  className?: string;
}

export default function MarqueeTicker({
  items,
  speed = "med",
  separator = " ★ ",
  className = "",
}: MarqueeTickerProps) {
  const animClass =
    speed === "slow" ? "animate-marquee-slow" :
    speed === "fast" ? "animate-marquee-fast" :
    "animate-marquee";

  const content = items.join(separator) + separator;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap retro-inset bg-retro-panel-alt py-1 px-2 ${className}`}
      aria-label="Ticker"
    >
      <div
        className={`inline-block ${animClass}`}
        style={{ willChange: "transform" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        <span className="font-mono text-sm text-retro-amber">{content}</span>
        <span aria-hidden="true" className="font-mono text-sm text-retro-amber">{content}</span>
      </div>
    </div>
  );
}
