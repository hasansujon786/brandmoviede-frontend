"use client"

import { cn } from "@/lib/utils";

// -----------------------
// Example usage:
// <HighlightNthWord title="Sugo Summer 2025" n={2} />
// -----------------------

export interface HighlightNthWordProps {
  title: string;
  n?: number; // 1-based
  className?: string;
  highlightClassName?: string;
  separator?: string | RegExp;
}

const defaultHighlightClass = "text-primary";

export default function HighlightNthWord({
  title,
  n = 2,
  className = "",
  highlightClassName = defaultHighlightClass,
  separator = /\s+/,
}: HighlightNthWordProps) {
  if (typeof title !== "string" || !Number.isInteger(n) || n < 1) return null;

  const parts = title.split(separator);

  // If the requested word doesn't exist, return fallback or plain title
  if (parts.length < n) {
    console.warn(
      `HighlightNthWord: requested word ${n} but title has only ${parts.length} words.`,
    );
    return <h1 className={className}>{title}</h1>;
  }

  const highlighted = parts[n - 1];
  const before = parts.slice(0, n - 1).join(" ");
  const after = parts.slice(n).join(" ");

  return (
    <h1 className={cn("font-heading text-heading-200", className)} aria-label={title}>
      {before && <>{before} </>}
      <span className={highlightClassName}>{highlighted}</span>
      {after && <> {after}</>}
    </h1>
  );
}
