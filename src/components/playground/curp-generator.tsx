"use client";

import { generateCurp, STATES, type Sex } from "mexico-utils";
import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { Field, inputClass, Panel } from "@/components/playground/field";
import { useDictionary } from "@/lib/use-dictionary";

const SEGMENTS = [
  { key: "initials", from: 0, to: 4, color: "var(--seg-1)" },
  { key: "date", from: 4, to: 10, color: "var(--seg-2)" },
  { key: "sex", from: 10, to: 11, color: "var(--seg-3)" },
  { key: "state", from: 11, to: 13, color: "var(--seg-4)" },
  { key: "consonants", from: 13, to: 16, color: "var(--seg-5)" },
  { key: "differentiator", from: 16, to: 17, color: "var(--seg-6)" },
  { key: "check", from: 17, to: 18, color: "var(--seg-7)" },
] as const;

export function CurpGenerator() {
  const t = useDictionary();
  const [form, setForm] = useState({
    name: "Andrés Manuel",
    firstLastName: "López",
    secondLastName: "Obrador",
    birthDate: "1953-11-13",
    sex: "male" as Sex,
    state: "TC",
  });
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  let curp: string | null = null;
  try {
    curp = generateCurp(form);
  } catch {
    curp = null;
  }

  return (
    <Panel title={t.playground.curpGenerator} text={t.playground.curpGeneratorText}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={t.playground.name}>
          <input value={form.name} onChange={update("name")} className={inputClass} autoComplete="off" />
        </Field>
        <Field label={t.playground.firstLastName}>
          <input value={form.firstLastName} onChange={update("firstLastName")} className={inputClass} autoComplete="off" />
        </Field>
        <Field label={t.playground.secondLastName}>
          <input value={form.secondLastName} onChange={update("secondLastName")} className={inputClass} autoComplete="off" />
        </Field>
        <Field label={t.playground.birthDate}>
          <input type="date" value={form.birthDate} onChange={update("birthDate")} className={inputClass} />
        </Field>
        <Field label={t.playground.sex}>
          <select value={form.sex} onChange={update("sex")} className={inputClass}>
            <option value="male">{t.values.male}</option>
            <option value="female">{t.values.female}</option>
            <option value="nonbinary">{t.values.nonbinary}</option>
          </select>
        </Field>
        <Field label={t.playground.state}>
          <select value={form.state} onChange={update("state")} className={inputClass}>
            {STATES.map((state) => (
              <option key={state.curp} value={state.curp}>
                {state.name}
              </option>
            ))}
            <option value="NE">{t.playground.bornAbroad}</option>
          </select>
        </Field>
      </div>

      <div className="mt-6 rounded-lg border bg-muted/40 p-4 sm:p-6">
        {curp ? (
          <>
            <div className="flex items-center gap-2">
              <div className="flex min-w-0 flex-1 flex-wrap font-mono text-2xl font-medium tracking-wider sm:text-4xl">
                {SEGMENTS.map((segment) => (
                  <span
                    key={segment.key}
                    style={{ color: segment.color, borderColor: segment.color }}
                    className="border-b-2 pb-1"
                    title={t.playground.segments[segment.key]}
                  >
                    {curp!.slice(segment.from, segment.to)}
                  </span>
                ))}
              </div>
              <CopyButton text={curp} />
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {SEGMENTS.map((segment) => (
                <li key={segment.key} className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: segment.color }} />
                  {t.playground.segments[segment.key]}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">{t.playground.differentiatorNote}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">{t.playground.fillIn}</p>
        )}
      </div>
    </Panel>
  );
}
