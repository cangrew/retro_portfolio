import type { ProjectCategory } from "@/util/types";

const CATEGORY_CONFIG: Record<ProjectCategory, { label: string; text: string; border: string }> = {
  personal:     { label: "PERSONAL",     text: "text-retro-cyan",    border: "border-retro-cyan" },
  research:     { label: "RESEARCH",     text: "text-retro-magenta", border: "border-retro-magenta" },
  professional: { label: "PROFESSIONAL", text: "text-retro-amber",   border: "border-retro-amber" },
};

interface Props {
  category: ProjectCategory;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "sm" }: Props) {
  const { label, text, border } = CATEGORY_CONFIG[category];
  return (
    <span
      className={`font-pixel uppercase border px-1.5 py-0.5 ${text} ${border} ${
        size === "md" ? "text-pixel-xs" : "text-[9px] sm:text-[7px] leading-tight"
      }`}
    >
      {label}
    </span>
  );
}
