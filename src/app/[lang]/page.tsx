import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Code } from "@/components/code";
import { Detector } from "@/components/detector";
import { InstallCommand } from "@/components/install-command";
import { Button } from "@/components/ui/button";
import { getDictionary, isLocale } from "@/lib/i18n";

const SNIPPETS = {
  curp: `parseCurp("LOOA531113HTCPBN07")?.birthDate
// "1953-11-13"`,
  rfc: `parseRfc("EKU9003173C9")?.type
// "company"`,
  clabe: `parseClabe("002010077777777771")?.bank
// { code: "002", name: "Banamex" }`,
  nss: `parseNss("72795608040")?.birthYear
// 1956`,
  postal: `stateFromPostalCode("42800")?.name
// "Hidalgo"`,
  phone: `formatPhone("+52 1 773 152 1627")
// "773 152 1627"`,
  words: `amountToWords(21)
// "VEINTIÚN PESOS 00/100 M.N."`,
} as const;

const SLUGS: Record<keyof typeof SNIPPETS, string> = {
  curp: "curp",
  rfc: "rfc",
  clabe: "clabe",
  nss: "nss",
  postal: "postal-codes",
  phone: "phone",
  words: "words",
};

const ERROR_SNIPPET = {
  en: `const result = checkCurp(input);

if (!result.ok) {
  // "format" | "date" | "state" | "check-digit"
  setError(messages[result.error]);
}`,
  es: `const result = checkCurp(input);

if (!result.ok) {
  // "format" | "date" | "state" | "check-digit"
  setError(mensajes[result.error]);
}`,
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:pt-24 lg:pb-28">
          <div>
            <Link
              href={`/${lang}/docs`}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex h-2 w-4 overflow-hidden rounded-[2px]" aria-hidden="true">
                <span className="flex-1 bg-[#006847]" />
                <span className="flex-1 bg-white ring-1 ring-black/5 ring-inset" />
                <span className="flex-1 bg-[#ce1126]" />
              </span>
              {t.home.badge}
            </Link>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              {t.home.title}
              <br />
              <span className="text-muted-foreground">{t.home.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{t.home.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href={`/${lang}/docs`} />} className="h-11 px-5">
                {t.home.getStarted}
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href={`/${lang}/playground`} />} className="h-11 px-5">
                {t.home.playground}
              </Button>
            </div>
            <div className="mt-8 max-w-sm">
              <InstallCommand />
            </div>
          </div>
          <Detector />
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          {t.home.stats.map((stat, index) => (
            <div key={stat.label} className={`px-4 py-8 sm:px-6 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} sm:border-l sm:first:border-l-0`}>
              <div className="text-3xl font-semibold tracking-tight tabular-nums">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">{t.home.modulesTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{t.home.modulesSubtitle}</p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(SNIPPETS) as (keyof typeof SNIPPETS)[]).map((key) => (
            <Link key={key} href={`/${lang}/docs/${SLUGS[key]}`} className="group flex min-w-0 flex-col bg-background p-6 transition-colors hover:bg-muted/60">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold tracking-tight">{t.modules[key].title}</h3>
                <ArrowRightIcon className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.modules[key].text}</p>
              <Code code={SNIPPETS[key]} className="mt-5 rounded-lg border bg-muted/50 px-3 py-2.5 text-xs leading-5" />
            </Link>
          ))}
          <div className="flex min-w-0 flex-col justify-center bg-background p-6 lg:col-span-2">
            <p className="text-sm text-muted-foreground">{t.home.ctaText}</p>
            <Link href={`/${lang}/docs`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-link hover:underline">
              {t.home.readDocs}
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-balance">{t.home.errorTitle}</h2>
            <p className="mt-3 max-w-lg text-lg text-muted-foreground">{t.home.errorText}</p>
          </div>
          <Code code={ERROR_SNIPPET[lang]} className="rounded-xl border bg-background p-5" />
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">{t.home.ctaTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.home.ctaText}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <div className="sm:w-64">
              <InstallCommand />
            </div>
            <Button size="lg" nativeButton={false} render={<Link href={`/${lang}/docs`} />} className="h-11 px-5">
              {t.home.getStarted}
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
