"use client";

import { LockIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { ResultCard } from "@/components/result-card";
import { analyze, detectKind, EXAMPLES, KINDS } from "@/lib/analyze";
import { useDictionary, useLocale } from "@/lib/use-dictionary";

export function Detector() {
  const t = useDictionary();
  const locale = useLocale();
  const [value, setValue] = useState(EXAMPLES.clabe);
  const kind = detectKind(value);
  const analysis = kind ? analyze(kind, value, t, locale) : null;

  return (
    <div className="rounded-xl border bg-background p-2 shadow-[0_1px_2px_rgb(0_0_0/4%),0_8px_24px_-12px_rgb(0_0_0/12%)]">
      <div className="rounded-lg border bg-muted/50 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <SparklesIcon className="size-4 text-muted-foreground" />
          {t.home.detectorTitle}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{t.home.detectorHint}</p>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t.home.detectorPlaceholder}
          aria-label={t.home.detectorTitle}
          spellCheck={false}
          autoComplete="off"
          className="mt-4 h-12 w-full rounded-lg border bg-background px-4 font-mono text-base outline-none transition-shadow focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        />
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs text-muted-foreground">{t.home.detectorTry}</span>
          {KINDS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setValue(EXAMPLES[example])}
              aria-pressed={kind === example}
              className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground aria-pressed:border-foreground aria-pressed:text-foreground"
            >
              {t.kinds[example]}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-44 p-2 pt-3" aria-live="polite">
        {analysis ? (
          <ResultCard analysis={analysis} value={value} />
        ) : (
          <p className="grid min-h-40 place-items-center rounded-lg border border-dashed px-6 text-center text-sm text-muted-foreground">
            {value.trim() ? t.home.detectorUnknown : t.home.detectorEmpty}
          </p>
        )}
      </div>
      <p className="flex items-center gap-1.5 px-3 pb-2 text-xs text-muted-foreground">
        <LockIcon className="size-3" />
        {t.home.detectorPrivacy}
      </p>
    </div>
  );
}
