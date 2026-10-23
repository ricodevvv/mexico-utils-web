import { NavItem } from "@/components/docs-nav-item";
import { DOC_PAGES, docHref } from "@/lib/docs";
import { getDictionary, type Locale } from "@/lib/i18n";

export function DocsNav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const groups = (["start", "documents", "formats"] as const).map((group) => ({
    title: t.docs.groups[group],
    items: DOC_PAGES.filter((page) => page.group === group).map((page) => ({ href: docHref(locale, page.slug), label: page.title[locale] })),
  }));
  groups.push({
    title: t.docs.groups.catalogs,
    items: [
      { href: `/${locale}/banks`, label: t.nav.banks },
      { href: `/${locale}/states`, label: t.nav.states },
    ],
  });
  return (
    <nav className="flex flex-col gap-6 text-sm">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">{group.title}</div>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <NavItem href={item.href}>{item.label}</NavItem>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
