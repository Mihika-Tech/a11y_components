"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { trapFocus } from "@/lib/a11y/focus-trap";
import { Portal } from "@/components/ui/portal";

type PopoverContextValue = { requestClose: () => void };
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = "end",
  closeOnTab = true
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  trigger: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
  closeOnTab?: boolean;
}) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const requestClose = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  const [pos, setPos] = React.useState<{ top: number; left: number; minWidth: number }>({
    top: 0,
    left: 0,
    minWidth: 180
  });

  const updatePosition = React.useCallback(() => {
    const trig = triggerRef.current;
    if (!trig) return;

    const r = trig.getBoundingClientRect();
    const margin = 8;
    const minWidth = Math.max(180, Math.round(r.width));

    // initial position below trigger
    let top = r.bottom + margin;
    let left = align === "end" ? r.right - minWidth : r.left;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    left = clamp(left, margin, vw - minWidth - margin);

    // keep within viewport vertically (simple)
    const approxHeight = 260;
    if (top + approxHeight > vh - margin) {
      top = Math.max(margin, r.top - margin - approxHeight);
    }

    setPos({ top, left, minWidth });
  }, [align]);

  React.useEffect(() => {
    if (!open) return;

    updatePosition();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }

      if (closeOnTab && e.key === "Tab") {
        requestClose();
        return;
      }

      const panel = panelRef.current;
      if (panel) trapFocus(panel, e);
    };

    const onMouseDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      const trig = triggerRef.current;
      const target = e.target as Node;
      if (!panel || !trig) return;
      if (panel.contains(target) || trig.contains(target)) return;
      requestClose();
    };

    const onScrollOrResize = () => updatePosition();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    // focus first item
    const first = panelRef.current?.querySelector<HTMLElement>('[role="menuitem"]') ?? panelRef.current;
    first?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      triggerRef.current?.focus?.();
    };
  }, [open, requestClose, closeOnTab, updatePosition]);

  return (
    <PopoverContext.Provider value={{ requestClose }}>
      <span className="inline-flex">
        {trigger({
          ref: triggerRef,
          type: "button",
          "aria-haspopup": "menu",
          "aria-expanded": open,
          onClick: () => onOpenChange(!open)
        } as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      </span>

      {open ? (
        <Portal>
          <div
            ref={panelRef}
            role="menu"
            tabIndex={-1}
            style={{ top: pos.top, left: pos.left, minWidth: pos.minWidth, position: "fixed" }}
            className={cn(
              "z-[100] rounded-lg border border-border bg-card p-1 shadow-soft outline-none",
              "text-fg"
            )}
            onKeyDown={(e) => {
              const items = Array.from(
                (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="menuitem"]')
              );
              const active = document.activeElement as HTMLElement | null;
              const idx = items.indexOf(active ?? ({} as HTMLElement));

              const focusAt = (n: number) => items[n]?.focus();

              if (e.key === "ArrowDown") {
                e.preventDefault();
                focusAt(Math.min(items.length - 1, Math.max(0, idx + 1)));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                focusAt(Math.max(0, idx - 1));
              }
              if (e.key === "Home") {
                e.preventDefault();
                focusAt(0);
              }
              if (e.key === "End") {
                e.preventDefault();
                focusAt(items.length - 1);
              }
            }}
          >
            {children}
          </div>
        </Portal>
      ) : null}
    </PopoverContext.Provider>
  );
}

export function PopoverItem({
  children,
  onSelect,
  danger
}: {
  children: React.ReactNode;
  onSelect: () => void;
  danger?: boolean;
}) {
  const ctx = React.useContext(PopoverContext);

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-muted focus:bg-muted",
        danger && "text-danger"
      )}
      onClick={() => {
        onSelect();
        ctx?.requestClose();
      }}
    >
      {children}
    </button>
  );
}
