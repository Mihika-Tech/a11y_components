"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { useStableId } from "@/lib/a11y/id";

export type ComboOption = { value: string; label: string };

export function Combobox({
  label,
  value,
  onChange,
  loadOptions,
  placeholder = "Search…",
  hint,
  error
}: {
  label: string;
  value: ComboOption | null;
  onChange: (opt: ComboOption | null) => void;
  loadOptions: (query: string) => Promise<ComboOption[]>;
  placeholder?: string;
  hint?: string;
  error?: string;
}) {
  const inputId = useStableId("combobox");
  const listId = useStableId("listbox");
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const [q, setQ] = React.useState(value?.label ?? "");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [opts, setOpts] = React.useState<ComboOption[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const activeId = activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined;

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const res = await loadOptions(q);
        if (!cancelled) {
          setOpts(res);
          setActiveIndex(res.length > 0 ? 0 : -1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (open) run();
    return () => {
      cancelled = true;
    };
  }, [q, open, loadOptions]);

  function commit(opt: ComboOption) {
    onChange(opt);
    setQ(opt.label);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(opts.length - 1, i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    }
    if (e.key === "Enter") {
      if (!open) return;
      e.preventDefault();
      const opt = opts[activeIndex];
      if (opt) commit(opt);
    }
    if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>

      <div
        className={cn(
          "mt-1 rounded-md border border-border bg-card px-2",
          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
          error && "border-danger"
        )}
      >
        <input
          id={inputId}
          className="w-full bg-transparent py-2 text-sm outline-none"
          value={q}
          placeholder={placeholder}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-controls={listId}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      </div>

      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-mutedFg">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-card shadow-soft"
        >
          {loading ? (
            <div className="px-3 py-2 text-sm text-mutedFg">Loading…</div>
          ) : opts.length === 0 ? (
            <div className="px-3 py-2 text-sm text-mutedFg">No matches</div>
          ) : (
            opts.map((o, idx) => {
              const active = idx === activeIndex;
              const selected = value?.value === o.value;
              return (
                <button
                  key={o.value}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  type="button"
                  aria-selected={selected}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-left text-sm",
                    active ? "bg-muted" : "bg-transparent hover:bg-muted"
                  )}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(o)}
                >
                  <span>{o.label}</span>
                  {selected ? <span className="text-xs text-mutedFg">Selected</span> : null}
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
