import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PromptProps extends ComponentPropsWithoutRef<"span"> {
  user?: string;
  host?: string;
  path?: string;
  /** "$" for a user shell, "#" for root. */
  symbol?: "$" | "#" | ">";
}

/** An inline shell prompt: andres@arch:~/projects$ */
export function Prompt({
  user = "andres",
  host = "arch",
  path = "~",
  symbol = "$",
  className,
  ...props
}: PromptProps) {
  return (
    <span className={cn("whitespace-nowrap font-mono font-normal", className)} {...props}>
      <span className="text-ansi-green">
        {user}@{host}
      </span>
      <span className="text-fg-subtle">:</span>
      <span className="text-ansi-blue">{path}</span>
      <span className="text-fg-subtle">{symbol}</span>
    </span>
  );
}

const HEADING_SIZES = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
} as const;

export interface PromptHeadingProps extends Omit<ComponentPropsWithoutRef<"h1">, "children"> {
  level?: keyof typeof HEADING_SIZES;
  /** Working directory shown in the prompt. */
  path?: string;
  user?: string;
  host?: string;
  /** Show a blinking cursor after the heading text. */
  cursor?: boolean;
  /** The heading text, read like the command typed at the prompt. */
  children: ReactNode;
}

/**
 * A heading drawn as a shell command: a small prompt, then the heading text.
 * Screen readers hear only the heading text; the prompt is decoration.
 */
export function PromptHeading({
  level = 2,
  path,
  user,
  host,
  cursor = false,
  className,
  children,
  ...props
}: PromptHeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn(
        "flex flex-wrap items-baseline gap-x-3 gap-y-1 font-bold leading-tight tracking-tight text-fg",
        HEADING_SIZES[level],
        className,
      )}
      {...props}
    >
      <Prompt aria-hidden user={user} host={host} path={path} className="text-sm" />
      <span className="min-w-0">
        {children}
        {cursor && (
          <span aria-hidden className="ml-1 inline-block animate-blink font-normal text-accent">
            ▊
          </span>
        )}
      </span>
    </Tag>
  );
}
