"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { useStableId } from "@/lib/a11y/id";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  label: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isPasswordReveal?: boolean;
};

export function TextInput({
  label,
  hint,
  error,
  prefix,
  suffix,
  isPasswordReveal,
  className,
  type,
  ...rest
}: Props) {
  const inputId = useStableId("input");
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const [showPwd, setShowPwd] = React.useState(false);
  const actualType = isPasswordReveal ? (showPwd ? "text" : "password") : type;

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>

      <div
        className={cn(
          "mt-1 flex items-center gap-2 rounded-md border border-border bg-card px-3",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
          error && "border-danger",
          className
        )}
      >
        {prefix ? <div className="text-sm text-mutedFg">{prefix}</div> : null}

        <input
          id={inputId}
          className="w-full bg-transparent py-2 text-sm outline-none"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          type={actualType}
          {...rest}
        />

        {isPasswordReveal ? (
          <button
            type="button"
            className="rounded-md px-2 py-1 text-sm text-mutedFg hover:text-fg focus:outline-none"
            onClick={() => setShowPwd((v) => !v)}
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? "Hide" : "Show"}
          </button>
        ) : null}

        {suffix ? <div className="text-sm text-mutedFg">{suffix}</div> : null}
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
    </div>
  );
}
