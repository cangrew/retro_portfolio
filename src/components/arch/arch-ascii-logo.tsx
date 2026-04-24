export default function ArchAsciiLogo({ className = "" }: { className?: string }) {
  return (
    <pre
      aria-label="Arch Linux logo"
      className={`text-retro-green font-mono leading-none select-none text-xs ${className}`}
    >
      {`      /\\
     /  \\
    /\\   \\
   /  __  \\
  / /    \\ \\
 /_/      \\_\\`}
    </pre>
  );
}
