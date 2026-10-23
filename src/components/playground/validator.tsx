"use client";

import { useState } from "react";
import { Field, inputClass, Panel } from "@/components/playground/field";
import { ResultCard } from "@/components/result-card";
import { analyze, EXAMPLES, type Kind } from "@/lib/analyze";
import { useDictionary, useLocale } from "@/lib/use-dictionary";

export function Validator({ kind }: { kind: Kind }) {
  const t = useDictionary();
  const locale = useLocale();
  const [value, setValue] = useState(EXAMPLES[kind]);
  return (
    <Panel title={`${t.playground.validate} ${t.kinds[kind]}`}>
      <div className="flex items-end gap-2">
        <Field label={t.playground.input} className="flex-1">
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            autoComplete="off"
            className={`${inputClass} font-mono`}
          />
        </Field>
        <button
          type="button"
          onClick={() => setValue(EXAMPLES[kind])}
          className="h-10 rounded-lg border px-3 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
        >
          {t.playground.example}
        </button>
      </div>
      <ResultCard analysis={analyze(kind, value, t, locale)} value={value} className="mt-4" />
    </Panel>
  );
}
