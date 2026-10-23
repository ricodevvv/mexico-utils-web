import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playground } from "@/components/playground/playground";
import { KINDS, type Kind } from "@/lib/analyze";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/playground">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.playground.title, description: t.playground.subtitle };
}

export default async function PlaygroundPage({ params, searchParams }: PageProps<"/[lang]/playground">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { tool } = await searchParams;
  const t = getDictionary(lang);
  const initial = KINDS.includes(tool as Kind) ? (tool as Kind) : "curp";
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-[-0.045em]">{t.playground.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{t.playground.subtitle}</p>
      <div className="mt-10">
        <Playground key={initial} initial={initial} />
      </div>
    </div>
  );
}
