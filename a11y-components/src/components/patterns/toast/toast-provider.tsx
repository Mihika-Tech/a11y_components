"use client";

import * as React from "react";
import { ToastItem, ToastView, ToastVariant } from "@/components/ui/toast";

type ToastContextValue = {
  push: (t: Omit<ToastItem, "id">) => void;
  info: (title: string, description?: string) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

function id() {
  return `toast_${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  const push = React.useCallback((t: Omit<ToastItem, "id">) => {
    const item: ToastItem = {
      id: id(),
      variant: t.variant ?? "info",
      durationMs: t.durationMs ?? 4000,
      title: t.title,
      description: t.description
    };

    setToasts((prev) => [item, ...prev].slice(0, 3));

    if (item.durationMs && item.durationMs > 0) {
      window.setTimeout(() => dismiss(item.id), item.durationMs);
    }
  }, [dismiss]);

  const mk = React.useCallback(
    (variant: ToastVariant) => (title: string, description?: string) =>
      push({ title, description, variant }),
    [push]
  );

  const value = React.useMemo<ToastContextValue>(
    () => ({
      push,
      info: mk("info"),
      success: mk("success"),
      error: mk("error")
    }),
    [push, mk]
  );

  const politeMessages = toasts.filter((t) => t.variant !== "error");
  const assertiveMessages = toasts.filter((t) => t.variant === "error");

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Screen reader live regions */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {politeMessages.map((t) => (
          <div key={t.id}>
            {t.title}
            {t.description ? ` ${t.description}` : ""}
          </div>
        ))}
      </div>

      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {assertiveMessages.map((t) => (
          <div key={t.id}>
            {t.title}
            {t.description ? ` ${t.description}` : ""}
          </div>
        ))}
      </div>

      {/* Visual stack */}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(92vw,420px)] flex-col gap-2">
        {toasts.map((t) => (
          <ToastView key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
