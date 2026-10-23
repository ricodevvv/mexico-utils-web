"use client";

import { amountToWords, type Currency } from "mexico-utils";
import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { Field, inputClass, Panel } from "@/components/playground/field";
import { useDictionary } from "@/lib/use-dictionary";

export function AmountWords() {
  const t = useDictionary();
  const [amount, setAmount] = useState("1234.50");
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [letterCase, setLetterCase] = useState<"upper" | "lower">("upper");
  let words: string | null = null;
  try {
    words = amount.trim() ? amountToWords(amount, { currency, case: letterCase }) : null;
  } catch {
    words = null;
  }

  return (
    <Panel title={t.modules.words.title} text={t.modules.words.text}>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
        <Field label={t.playground.amount}>
          <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" className={`${inputClass} font-mono`} />
        </Field>
        <Field label={t.playground.currency}>
          <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className={inputClass}>
            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>
        <Field label={t.playground.letterCase}>
          <select value={letterCase} onChange={(event) => setLetterCase(event.target.value as "upper" | "lower")} className={inputClass}>
            <option value="upper">{t.playground.upper}</option>
            <option value="lower">{t.playground.lower}</option>
          </select>
        </Field>
      </div>
      <div className="mt-4 flex min-h-20 items-start gap-2 rounded-lg border bg-muted/40 px-4 py-3">
        {words ? (
          <>
            <p className="flex-1 font-mono text-sm leading-6">{words}</p>
            <CopyButton text={words} />
          </>
        ) : (
          <p className="text-sm text-destructive">{t.errors.amount}</p>
        )}
      </div>
    </Panel>
  );
}
