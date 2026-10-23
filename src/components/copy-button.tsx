"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/use-dictionary";

export function CopyButton({ text, getText, className }: { text?: string; getText?: () => string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useDictionary();
  return (
    <button
      type="button"
      aria-label={copied ? t.common.copied : t.common.copy}
      onClick={async () => {
        await navigator.clipboard.writeText(text ?? getText?.() ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={cn(
        "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
    </button>
  );
}

export function CopyablePre(props: React.ComponentProps<"pre">) {
  const [node, setNode] = useState<HTMLPreElement | null>(null);
  return (
    <div className="group relative">
      <pre ref={setNode} {...props} />
      <CopyButton getText={() => node?.innerText ?? ""} className="absolute top-2.5 right-2.5 bg-background opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
    </div>
  );
}
