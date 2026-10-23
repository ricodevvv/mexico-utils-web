import type { Metadata } from "next";
import { STATES } from "mexico-utils";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/states">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.states.title, description: t.states.subtitle };
}

function range([from, to]: [number, number]) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return from === to ? `${pad(from)}xxx` : `${pad(from)}xxx–${pad(to)}xxx`;
}

export default async function StatesPage({ params }: PageProps<"/[lang]/states">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-[-0.045em]">{t.states.title}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{t.states.subtitle}</p>
      <div className="mt-10 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr className="border-b">
              <th className="px-4 py-2.5 font-medium">{t.states.name}</th>
              <th className="px-4 py-2.5 font-medium">{t.states.curp}</th>
              <th className="px-4 py-2.5 font-medium">{t.states.inegi}</th>
              <th className="px-4 py-2.5 font-medium">{t.states.iso}</th>
              <th className="px-4 py-2.5 font-medium">{t.states.postal}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {STATES.map((state) => (
              <tr key={state.inegi} className="transition-colors hover:bg-muted/40">
                <td className="px-4 py-2.5 font-medium">{state.name}</td>
                <td className="px-4 py-2.5 font-mono text-[13px]">{state.curp}</td>
                <td className="px-4 py-2.5 font-mono text-[13px]">{state.inegi}</td>
                <td className="px-4 py-2.5 font-mono text-[13px]">{state.iso}</td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-muted-foreground">{range(state.postalPrefixes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
