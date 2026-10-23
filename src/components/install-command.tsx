import { CopyButton } from "@/components/copy-button";

export function InstallCommand() {
  return (
    <div className="flex h-11 items-center gap-3 rounded-lg border bg-background pr-1.5 pl-4 font-mono text-sm">
      <span className="text-muted-foreground select-none">$</span>
      <span>npm i mexico-utils</span>
      <CopyButton text="npm i mexico-utils" className="ml-auto" />
    </div>
  );
}
