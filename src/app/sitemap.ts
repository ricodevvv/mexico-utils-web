import type { MetadataRoute } from "next";
import { DOC_PAGES, docHref } from "@/lib/docs";
import { LOCALES } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  const paths = ["", "/playground", "/banks", "/states"];
  return LOCALES.flatMap((locale) => [
    ...paths.map((path) => ({ url: `${base}/${locale}${path}` })),
    ...DOC_PAGES.map((page) => ({ url: `${base}${docHref(locale, page.slug)}` })),
  ]);
}
