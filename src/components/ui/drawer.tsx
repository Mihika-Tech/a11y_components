"use client";

import * as React from "react";
import { trapFocus } from "@/lib/a11y/focus-trap";
import { useStableId } from "@/lib/a11y/id";
import { Button } from "@/components/ui/button";

export function Drawer({
  open,
  onOpenChange,
  title,
  children
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  const titleId = useStableId("drawer-title");

  React.useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      trapFocus(panel, e);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    const focusTarget =
      panel.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ??
      panel;
    focusTarget.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onMouseDown={() => onOpenChange(false)} />

      <div className="absolute inset-y-0 right-0 w-full max-w-md p-3">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="h-full w-full rounded-lg border border-border bg-card p-4 shadow-soft outline-none"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="text-lg font-semibold">
              {title}
            </h2>
            <Button variant="ghost" onClick={() => onOpenChange(false)} aria-label="Close drawer">
              Close
            </Button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
