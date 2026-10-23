import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BankTable } from "@/components/bank-table";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/banks">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.banks.title, description: t.banks.subtitle };
}

export default async function BanksPage({ params }: PageProps<"/[lang]/banks">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-[-0.045em]">{t.banks.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{t.banks.subtitle}</p>
      <BankTable />
    </div>
  );
}
