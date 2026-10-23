import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocArticle } from "@/components/doc-article";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/docs">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).docs.title };
}

export default async function DocsIndex({ params }: PageProps<"/[lang]/docs">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <DocArticle locale={lang} slug="introduction" />;
}
