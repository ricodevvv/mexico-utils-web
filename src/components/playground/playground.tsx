"use client";

import { usePathname, useRouter } from "next/navigation";
import { AmountWords } from "@/components/playground/amount-words";
import { ClabeGenerator } from "@/components/playground/clabe-generator";
import { CurpGenerator } from "@/components/playground/curp-generator";
import { Validator } from "@/components/playground/validator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KINDS, type Kind } from "@/lib/analyze";
import { useDictionary } from "@/lib/use-dictionary";

export function Playground({ initial }: { initial: Kind }) {
  const t = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Tabs
      defaultValue={initial}
      onValueChange={(value) => router.replace(`${pathname}?tool=${value}`, { scroll: false })}
      className="gap-6"
    >
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <TabsList variant="line" className="h-10 w-max gap-1 border-b sm:w-full sm:justify-start">
          {KINDS.map((kind) => (
            <TabsTrigger key={kind} value={kind} className="px-3">
              {t.kinds[kind]}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {KINDS.map((kind) => (
        <TabsContent key={kind} value={kind} className="flex flex-col gap-6">
          {kind === "curp" && <CurpGenerator />}
          {kind === "amount" ? <AmountWords /> : <Validator kind={kind} />}
          {kind === "clabe" && <ClabeGenerator />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
