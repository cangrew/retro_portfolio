type DividerVariant = "stars" | "ascii" | "pixel-line" | "wave";

interface PixelDividerProps {
  variant?: DividerVariant;
  className?: string;
}

const CONTENT: Record<Exclude<DividerVariant, "pixel-line">, string> = {
  stars: "★ · ★ · ★ · ★ · ★ · ★ · ★ · ★ · ★ · ★ · ★ · ★ · ★",
  ascii: "════════════════ ◆ ════════════════",
  wave:  "〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜",
};

export default function PixelDivider({
  variant = "stars",
  className = "",
}: PixelDividerProps) {
  if (variant === "pixel-line") {
    return (
      <div
        className={`h-1 w-full ${className}`}
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--retro-green) 0px, var(--retro-green) 8px, var(--retro-cyan) 8px, var(--retro-cyan) 16px)",
        }}
      />
    );
  }

  return (
    <p
      className={`text-center text-retro-fg-dim font-mono py-3 select-none ${className}`}
      aria-hidden="true"
    >
      {CONTENT[variant]}
    </p>
  );
}
