import type { MDXComponents } from "mdx/types";
import { CopyablePre } from "@/components/copy-button";
import { Demo } from "@/components/demo";
import { cn } from "@/lib/utils";

const components: MDXComponents = {
  pre: ({ className, ...props }) => (
    <CopyablePre {...props} className={cn(className, "overflow-x-auto rounded-lg border bg-muted/50 px-4 py-3.5 font-mono text-[13px] leading-6")} />
  ),
  Demo,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
