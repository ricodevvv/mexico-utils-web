import Link from "next/link";
import { GithubStars } from "@/components/github-stars";
import { LocaleSwitch, NavLink, ThemeToggle } from "@/components/header-controls";
import { Logo } from "@/components/logo";
import { Search } from "@/components/search";
import { getDictionary, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const links = [
    { href: `/${locale}/docs`, label: t.nav.docs },
    { href: `/${locale}/playground`, label: t.nav.playground },
    { href: `/${locale}/banks`, label: t.nav.banks },
    { href: `/${locale}/states`, label: t.nav.states },
  ];
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold tracking-tight">
          <Logo />
          <span className="hidden sm:inline">mexico-utils</span>
        </Link>
        <nav className="hidden items-center md:flex">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Search />
          <GithubStars />
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </div>
      <nav className="-mt-1 flex overflow-x-auto px-2 pb-1.5 md:hidden">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
