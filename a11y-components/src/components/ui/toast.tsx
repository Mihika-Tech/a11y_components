"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export type ToastVariant = "info" | "success" | "error";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

export function ToastView({
  toast,
  onDismiss
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const variant = toast.variant ?? "info";

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-soft", "backdrop-blur-0",
        variant === "error" && "border-danger"
      )}
      role="group"
      aria-label="Notification"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-medium">{toast.title}</div>
          {toast.description ? (
            <div className="mt-1 text-sm text-mutedFg">{toast.description}</div>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-auto px-2 py-1 text-xs"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}
