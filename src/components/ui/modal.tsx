"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { trapFocus } from "@/lib/a11y/focus-trap";
import { useStableId } from "@/lib/a11y/id";
import { Button } from "@/components/ui/button";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ open, onOpenChange, title, description, children, footer }: ModalProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  const titleId = useStableId("dialog-title");
const descId = useStableId("dialog-desc");


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

    // Focus first focusable element, fallback to panel
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
    <div
      className="fixed inset-0 bg-black/50"
      aria-hidden={false}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onMouseDown={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          tabIndex={-1}
          className={cn(
            "w-full max-w-lg rounded-lg border border-border bg-card p-4 shadow-soft outline-none"
          )}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={titleId} className="text-lg font-semibold">
                {title}
              </h2>
              {description ? (
                <p id={descId} className="mt-1 text-sm text-mutedFg">
                  {description}
                </p>
              ) : null}
            </div>

            <Button variant="ghost" onClick={() => onOpenChange(false)} aria-label="Close dialog">
              Close
            </Button>
          </div>

          <div className="mt-4">{children}</div>

          {footer ? <div className="mt-4 flex justify-end gap-2">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
