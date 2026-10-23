import { cn } from "@/lib/utils";

export const inputClass =
  "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-shadow focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function Panel({ title, text, children }: { title: string; text?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-background">
      <header className="border-b px-5 py-4">
        <h2 className="font-semibold tracking-tight">{title}</h2>
        {text && <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
