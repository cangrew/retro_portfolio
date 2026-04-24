import NeonButton from "@/components/neon-button";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Win95-style error dialog */}
        <div className="retro-raised bg-[var(--retro-panel)]">
          {/* Title bar */}
          <div className="retro-titlebar flex items-center justify-between px-2 py-1 select-none">
            <span className="font-pixel text-pixel-xs text-white">Error</span>
            <button className="retro-raised bg-[var(--retro-panel)] font-pixel text-pixel-xs text-retro-fg leading-none px-1">
              X
            </button>
          </div>

          {/* Dialog body */}
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-4">
              {/* Error icon */}
              <div className="shrink-0 w-10 h-10 retro-raised bg-[var(--retro-panel)] flex items-center justify-center">
                <span className="font-pixel text-retro-magenta" style={{ fontSize: "18px" }}>✕</span>
              </div>
              <div className="space-y-1 font-mono text-sm text-retro-fg leading-relaxed">
                <p className="font-pixel text-pixel-xs text-retro-fg mb-2">FILE NOT FOUND</p>
                <p>The file or directory</p>
                <p className="text-retro-amber font-mono text-xs">C:\PAGES\{"{requested-path}"}</p>
                <p>does not exist.</p>
                <p className="text-retro-fg-dim text-xs mt-2">Error code: 0x80070002</p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: "repeating-linear-gradient(90deg,#39ff14 0,#39ff14 4px,transparent 4px,transparent 8px)" }}
            />

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <NeonButton href="/" color="green">[OK]</NeonButton>
              <NeonButton href="/" color="cyan">[GO HOME]</NeonButton>
            </div>
          </div>
        </div>

        <p className="font-mono text-xs text-retro-fg-dim text-center mt-4">
          Press any key to continue... or just click OK
        </p>
      </div>
    </main>
  );
}
