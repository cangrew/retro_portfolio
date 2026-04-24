"use client";

export default function CrtOverlay() {
  return (
    <div
      id="crt-overlay"
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none animate-scanline-flicker"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0,0,0,0.14) 0px,
          rgba(0,0,0,0.14) 1px,
          transparent 1px,
          transparent 3px
        )`,
        mixBlendMode: "multiply",
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
