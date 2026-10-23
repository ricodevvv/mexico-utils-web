import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { DOC_PAGES, docHref } from "@/lib/docs";
import { getDictionary, type Locale } from "@/lib/i18n";

/**
 * Renders a docs page from content/<locale>/<slug>.mdx, with links to the pages around it.
 */
export async function DocArticle({ locale, slug }: { locale: Locale; slug: string }) {
  const { default: Content } = await import(`@/content/${locale}/${slug}.mdx`);
  const t = getDictionary(locale);
  const index = DOC_PAGES.findIndex((page) => page.slug === slug);
  const previous = DOC_PAGES[index - 1];
  const next = DOC_PAGES[index + 1];
  return (
    <>
      <nav className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {DOC_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={docHref(locale, page.slug)}
            aria-current={page.slug === slug ? "page" : undefined}
            className="rounded-full border px-3 py-1 text-xs whitespace-nowrap text-muted-foreground aria-[current=page]:border-foreground aria-[current=page]:text-foreground"
          >
            {page.title[locale]}
          </Link>
        ))}
      </nav>
      <article className="prose-docs max-w-3xl">
        <Content />
      </article>
      <div className="mt-16 grid max-w-3xl gap-3 border-t pt-8 sm:grid-cols-2">
        {previous ? (
          <Link href={docHref(locale, previous.slug)} className="group rounded-lg border p-4 transition-colors hover:bg-muted/60">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeftIcon className="size-3" />
              {t.docs.previous}
            </span>
            <span className="mt-1 block font-medium">{previous.title[locale]}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={docHref(locale, next.slug)} className="group rounded-lg border p-4 text-right transition-colors hover:bg-muted/60">
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              {t.docs.next}
              <ArrowRightIcon className="size-3" />
            </span>
            <span className="mt-1 block font-medium">{next.title[locale]}</span>
          </Link>
        )}
      </div>
    </>
  );
}
