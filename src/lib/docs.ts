import type { Dictionary, Locale } from "./i18n";

export interface DocPage {
  slug: string;
  group: keyof Dictionary["docs"]["groups"];
  title: Record<Locale, string>;
  keywords: string;
}

export const DOC_PAGES: DocPage[] = [
  { slug: "introduction", group: "start", title: { en: "Introduction", es: "Introducción" }, keywords: "install npm import result error" },
  { slug: "curp", group: "documents", title: { en: "CURP", es: "CURP" }, keywords: "renapo generate birth sex state" },
  { slug: "rfc", group: "documents", title: { en: "RFC", es: "RFC" }, keywords: "sat homoclave persona fisica moral" },
  { slug: "clabe", group: "documents", title: { en: "CLABE", es: "CLABE" }, keywords: "bank banco spei account cuenta" },
  { slug: "nss", group: "documents", title: { en: "NSS", es: "NSS" }, keywords: "imss social security seguro social" },
  {
    slug: "postal-codes",
    group: "formats",
    title: { en: "States & postal codes", es: "Estados y códigos postales" },
    keywords: "codigo postal cp inegi iso estado",
  },
  { slug: "phone", group: "formats", title: { en: "Phone numbers", es: "Teléfonos" }, keywords: "telefono lada e164 +52 044" },
  { slug: "words", group: "formats", title: { en: "Amounts in words", es: "Cantidad con letra" }, keywords: "pesos factura cheque letras" },
];

export function docHref(locale: Locale, slug: string) {
  return slug === "introduction" ? `/${locale}/docs` : `/${locale}/docs/${slug}`;
}
