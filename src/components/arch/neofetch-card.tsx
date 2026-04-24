import ArchAsciiLogo from "./arch-ascii-logo";

const INFO_ROWS = [
  ["OS",     "Arch Linux x86_64"],
  ["WM",     "i3-gaps"],
  ["Shell",  "zsh"],
  ["Name",   "Andres Delgado"],
  ["Class",  "PhD Student"],
  ["School", "Univ. of Central Florida"],
  ["Focus",  "CXL / Arch. Security"],
  ["Status", "Researching"],
];

export default function NeofetchCard({ className = "" }: { className?: string }) {
  return (
    <div className={`retro-raised bg-retro-panel-alt p-4 ${className}`}>
      <div className="flex gap-4 items-start">
        <ArchAsciiLogo className="mt-1 shrink-0" />

        <div className="font-mono text-sm space-y-0.5 min-w-0">
          <div className="text-retro-green font-bold">andres@arch</div>
          <div className="text-retro-fg-dim">-----------</div>
          {INFO_ROWS.map(([label, value]) => (
            <div key={label} className="flex gap-1">
              <span className="text-retro-green shrink-0">{label}:</span>
              <span className="text-retro-fg truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
