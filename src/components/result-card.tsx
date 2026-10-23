"use client";

import { CheckIcon, XIcon } from "lucide-react";
import type { Analysis } from "@/lib/analyze";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/use-dictionary";

export function ResultCard({ analysis, value, className }: { analysis: Analysis; value: string; className?: string }) {
  const t = useDictionary();
  return (
    <div className={cn("rounded-lg border bg-background", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3">
        <span className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {t.kinds[analysis.kind]}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-sm">{value.trim()}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            analysis.valid ? "bg-success-soft text-success" : "bg-danger-soft text-destructive",
          )}
        >
          {analysis.valid ? <CheckIcon className="size-3" /> : <XIcon className="size-3" />}
          {analysis.valid ? t.common.valid : t.common.invalid}
        </span>
      </div>
      {analysis.valid ? (
        <dl className="divide-y">
          {analysis.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-4 px-4 py-2.5 text-sm">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={cn("min-w-0 break-words", row.mono && "font-mono text-[13px]")}>{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="px-4 py-3 text-sm text-destructive">{analysis.error}</p>
      )}
    </div>
  );
}
