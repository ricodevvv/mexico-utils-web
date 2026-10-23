"use client";

import { BookOpenIcon, FlaskConicalIcon, LandmarkIcon, MapIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { KINDS } from "@/lib/analyze";
import { DOC_PAGES, docHref } from "@/lib/docs";
import { useDictionary, useLocale } from "@/lib/use-dictionary";

export function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useDictionary();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 items-center gap-2 rounded-md border bg-muted px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-52 sm:px-2.5 whitespace-nowrap"
      >
        <SearchIcon className="size-4" />
        <span className="hidden flex-1 truncate text-left sm:inline">{t.nav.search}</span>
        <kbd className="hidden rounded border bg-background px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t.nav.search} description={t.nav.search}>
        <CommandInput placeholder={t.nav.search} />
        <CommandList>
          <CommandEmpty>{t.nav.searchEmpty}</CommandEmpty>
          <CommandGroup heading={t.nav.docs}>
            {DOC_PAGES.map((page) => (
              <CommandItem key={page.slug} value={`${page.title[locale]} ${page.keywords}`} onSelect={() => go(docHref(locale, page.slug))}>
                <BookOpenIcon />
                {page.title[locale]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t.nav.playground}>
            {KINDS.map((kind) => (
              <CommandItem key={kind} value={`playground ${t.kinds[kind]}`} onSelect={() => go(`/${locale}/playground?tool=${kind}`)}>
                <FlaskConicalIcon />
                {t.kinds[kind]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t.docs.groups.catalogs}>
            <CommandItem value={`${t.nav.banks} banks bancos clabe`} onSelect={() => go(`/${locale}/banks`)}>
              <LandmarkIcon />
              {t.nav.banks}
            </CommandItem>
            <CommandItem value={`${t.nav.states} states estados inegi iso`} onSelect={() => go(`/${locale}/states`)}>
              <MapIcon />
              {t.nav.states}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
