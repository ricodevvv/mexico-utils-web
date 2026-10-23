"use client";

import { BANKS } from "mexico-utils";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDictionary } from "@/lib/use-dictionary";

const ROWS = Object.entries(BANKS).sort(([a], [b]) => a.localeCompare(b));

function plain(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function BankTable() {
  const t = useDictionary();
  const [query, setQuery] = useState("");
  const wanted = plain(query.trim());
  const rows = ROWS.filter(([code, name]) => !wanted || code.includes(wanted) || plain(name).includes(wanted));
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
          <SearchIcon className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.banks.search}
            aria-label={t.banks.search}
            className="h-full flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <span className="text-sm whitespace-nowrap text-muted-foreground tabular-nums">
          {rows.length} {t.banks.count}
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr className="border-b">
              <th className="w-24 px-4 py-2.5 font-medium">{t.banks.code}</th>
              <th className="px-4 py-2.5 font-medium">{t.banks.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map(([code, name]) => (
              <tr key={code} className="transition-colors hover:bg-muted/40">
                <td className="px-4 py-2.5 font-mono text-[13px]">{code}</td>
                <td className="px-4 py-2.5">{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted-foreground">{t.banks.none}</p>}
      </div>
    </div>
  );
}
