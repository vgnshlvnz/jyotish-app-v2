"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sanskrit } from "@/components/Sanskrit";
import { cn } from "@/lib/utils";

export interface DetailTab {
  id: string;
  label: string;
  /** Optional Sanskrit subtitle shown below the label (e.g. "Identity / Swarupa"). */
  sanskritLabel?: string;
  content: React.ReactNode;
}

interface DetailTabsProps {
  tabs: readonly DetailTab[];
  /** Initial tab id. Defaults to the first tab. */
  defaultTab?: string;
}

/**
 * Tabs wrapper used by every detail page. Visual rhythm is identical across
 * the three domains; only the labels change. On mobile the tab bar scrolls
 * horizontally instead of wrapping.
 */
export function DetailTabs({ tabs, defaultTab }: DetailTabsProps) {
  const initialTab = defaultTab ?? tabs[0]?.id;
  if (!initialTab) return null;
  return (
    <Tabs defaultValue={initialTab} className="w-full">
      <ScrollArea className="w-full">
        <TabsList
          className={cn(
            "h-auto w-max rounded-xl gap-1 p-1.5 mb-1",
          )}
        >
          {tabs.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="flex flex-col items-start gap-0 px-4 py-2 text-left"
            >
              <span className="text-sm font-medium leading-tight">{t.label}</span>
              {t.sanskritLabel ? (
                <Sanskrit className="text-[10px] not-italic text-muted-foreground">
                  {t.sanskritLabel}
                </Sanskrit>
              ) : null}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tabs.map((t) => (
        <TabsContent key={t.id} value={t.id}>
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

/**
 * Section wrapper used inside tab content for grouping label-value rows.
 */
export function DetailSection({
  title,
  sanskritTitle,
  description,
  children,
  className,
}: {
  title?: string;
  sanskritTitle?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title ? (
            <h2 className="font-display text-2xl font-light text-foreground">
              {title}
              {sanskritTitle ? (
                <Sanskrit className="ml-3 text-base not-italic text-muted-foreground">
                  {sanskritTitle}
                </Sanskrit>
              ) : null}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Two-column-on-desktop label/value list inside a tab.
 */
export function DetailRows({
  rows,
  className,
}: {
  rows: readonly {
    label: string;
    sanskritLabel?: string;
    value: React.ReactNode;
  }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {rows.map((r) => (
        <div key={r.label} className="flex flex-col gap-1.5">
          <dt className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{r.label}</span>
            {r.sanskritLabel ? (
              <Sanskrit className="not-italic text-muted-foreground/70">
                {r.sanskritLabel}
              </Sanskrit>
            ) : null}
          </dt>
          <dd className="text-base text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
