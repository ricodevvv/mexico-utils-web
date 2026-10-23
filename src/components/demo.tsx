"use client";

import { useState } from "react";
import { ResultCard } from "@/components/result-card";
import { analyze, EXAMPLES, type Kind } from "@/lib/analyze";
import { useDictionary, useLocale } from "@/lib/use-dictionary";

/**
 * A small live demo of one validator, meant to sit inside a docs page.
 */
export function Demo({ kind, value }: { kind: Kind; value?: string }) {
  const t = useDictionary();
  const locale = useLocale();
  const [input, setInput] = useState(value ?? EXAMPLES[kind]);
  return (
    <div className="not-prose rounded-xl border bg-muted/40 p-3">
      <div className="mb-2 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">{t.docs.tryIt}</div>
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        aria-label={t.kinds[kind]}
        spellCheck={false}
        autoComplete="off"
        className="h-10 w-full rounded-lg border bg-background px-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
      />
      <ResultCard analysis={analyze(kind, input, t, locale)} value={input} className="mt-2" />
    </div>
  );
}
