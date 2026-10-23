import Link from "next/link";
import { Logo } from "@/components/logo";
import { AUTHOR_URL, getDictionary, GITHUB_URL, NPM_URL, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="size-5" />
          <span>
            {t.footer.made}{" "}
            <a href={AUTHOR_URL} className="text-foreground hover:underline" target="_blank" rel="noreferrer">
              ricodevvv
            </a>
            . {t.footer.license}
          </span>
        </div>
        <div className="flex gap-4 sm:ml-auto">
          <Link href={`/${locale}/docs`} className="hover:text-foreground">
            {t.nav.docs}
          </Link>
          <a href={GITHUB_URL} className="hover:text-foreground" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={NPM_URL} className="hover:text-foreground" target="_blank" rel="noreferrer">
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
