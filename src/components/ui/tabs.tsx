"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value,
  onValueChange,
  children
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const ctx = React.useMemo(() => ({ value, setValue: onValueChange }), [value, onValueChange]);
  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div role="tablist" className="inline-flex flex-wrap gap-2 rounded-lg border border-border bg-card p-2 shadow-soft">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");

  const selected = ctx.value === value;

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const current = e.currentTarget;
    const list = current.closest('[role="tablist"]');
    if (!list) return;

    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const idx = tabs.indexOf(current);
    if (idx < 0) return;

    const go = (nextIdx: number) => {
      const next = tabs[nextIdx];
      next?.focus();
      ctx!.setValue(next.dataset.value ?? value);
    };

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go((idx + 1) % tabs.length);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go((idx - 1 + tabs.length) % tabs.length);
    }
    if (e.key === "Home") {
      e.preventDefault();
      go(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      go(tabs.length - 1);
    }
  }

  return (
    <button
      role="tab"
      type="button"
      data-value={value}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={() => ctx.setValue(value)}
      onKeyDown={onKeyDown}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium",
        selected ? "bg-muted text-fg" : "text-mutedFg hover:text-fg hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

export function TabsPanel({
  value,
  children
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsPanel must be used within Tabs");
  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className="mt-4">
      {children}
    </div>
  );
}
