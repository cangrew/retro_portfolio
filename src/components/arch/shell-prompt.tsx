interface ShellPromptProps {
  user?: string;
  host?: string;
  path?: string;
  className?: string;
}

export default function ShellPrompt({
  user = "andres",
  host = "arch",
  path = "~",
  className = "",
}: ShellPromptProps) {
  return (
    <span className={`font-mono text-sm select-none ${className}`}>
      <span className="text-retro-green">{user}@{host}</span>
      <span className="text-retro-fg-dim">:</span>
      <span className="text-retro-cyan">{path}</span>
      <span className="text-retro-fg">$ </span>
    </span>
  );
}
