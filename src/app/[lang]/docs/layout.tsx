import { notFound } from "next/navigation";
import { DocsNav } from "@/components/docs-nav";
import { isLocale } from "@/lib/i18n";

export default async function DocsLayout({ children, params }: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-4 sm:px-6">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-52 shrink-0 overflow-y-auto py-10 lg:block">
        <DocsNav locale={lang} />
      </aside>
      <div className="min-w-0 flex-1 py-10 lg:py-14">{children}</div>
    </div>
  );
}
