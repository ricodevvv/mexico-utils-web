"use client";

import { BANKS, generateClabe } from "mexico-utils";
import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { Field, inputClass, Panel } from "@/components/playground/field";
import { useDictionary } from "@/lib/use-dictionary";

export function ClabeGenerator() {
  const t = useDictionary();
  const [bank, setBank] = useState("012");
  const [plaza, setPlaza] = useState("180");
  const [account, setAccount] = useState("01234567890");
  let clabe: string | null = null;
  try {
    clabe = generateClabe(bank, plaza || "0", account || "0");
  } catch {
    clabe = null;
  }
  const digits = (event: React.ChangeEvent<HTMLInputElement>, max: number) => event.target.value.replace(/\D/g, "").slice(0, max);

  return (
    <Panel title={t.playground.clabeGenerator}>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr_2fr]">
        <Field label={t.playground.bank}>
          <select value={bank} onChange={(event) => setBank(event.target.value)} className={inputClass}>
            {Object.entries(BANKS).map(([code, name]) => (
              <option key={code} value={code}>
                {code} · {name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.playground.plaza}>
          <input value={plaza} onChange={(event) => setPlaza(digits(event, 3))} inputMode="numeric" className={`${inputClass} font-mono`} />
        </Field>
        <Field label={t.playground.account}>
          <input value={account} onChange={(event) => setAccount(digits(event, 11))} inputMode="numeric" className={`${inputClass} font-mono`} />
        </Field>
      </div>
      {clabe && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/40 px-4 py-3 font-mono text-lg tracking-wider">
          <span className="flex-1">
            {clabe.slice(0, 17)}
            <span className="text-success">{clabe[17]}</span>
          </span>
          <CopyButton text={clabe} />
        </div>
      )}
    </Panel>
  );
}
