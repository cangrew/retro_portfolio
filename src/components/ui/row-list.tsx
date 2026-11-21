"use client";

import type { ComponentPropsWithoutRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";



/** Arrow keys, j/k and Home/End move focus between the links in a list. */
export function onRowListKeyDown(e: KeyboardEvent<HTMLElement>) {
  const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"));
  const i = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (i === -1) return;
  let next = -1;
  if (e.key === "ArrowDown" || e.key === "j") next = (i + 1) % links.length;
  else if (e.key === "ArrowUp" || e.key === "k") next = (i - 1 + links.length) % links.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = links.length - 1;
  if (next === -1) return;
  e.preventDefault();
  links[next].focus();
}

export function RowList({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return <ul className={cn("flex flex-col", className)} onKeyDown={onRowListKeyDown} {...props} />;
}
