/*
 * Kept out of row-list.tsx ("use client") so server components get the
 * strings themselves, not client references.
 */

/**
 * Rows in a TUI list: links that fill the row, a chrome hover and an accent
 * selection. Use the class names on a <Link> or <a> inside a RowList.
 */
export const rowClass =
  "group -mx-2 flex min-w-0 items-baseline gap-x-3 px-2 py-2 text-sm text-fg no-underline outline-none hover:bg-chrome hover:no-underline focus-visible:bg-accent focus-visible:text-accent-fg";
/** Secondary text in a row; turns accent-fg when the row is selected. */
export const rowMuted = "text-fg-muted group-focus-visible:text-accent-fg";
/** Metadata in a row: dates, counts. */
export const rowSubtle = "text-fg-subtle group-focus-visible:text-accent-fg";

