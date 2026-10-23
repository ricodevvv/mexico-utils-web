import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocArticle } from "@/components/doc-article";
import { DOC_PAGES } from "@/lib/docs";
import { isLocale, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => DOC_PAGES.filter((page) => page.slug !== "introduction").map((page) => ({ lang, slug: page.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/docs/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = DOC_PAGES.find((p) => p.slug === slug);
  if (!isLocale(lang) || !page) return {};
  return { title: page.title[lang] };
}

export default async function DocPage({ params }: PageProps<"/[lang]/docs/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !DOC_PAGES.some((page) => page.slug === slug && slug !== "introduction")) notFound();
  return <DocArticle locale={lang} slug={slug} />;
}
