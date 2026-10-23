import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

/**
 * Highlights code at build time with light and dark themes switched by CSS.
 */
export async function Code({ code, lang = "ts", className }: { code: string; lang?: string; className?: string }) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
  return (
    <div
      className={cn("overflow-x-auto font-mono text-[13px] leading-6 [&_pre]:outline-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
