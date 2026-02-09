import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", isLoading, disabled, leftIcon, rightIcon, children, ...props },
  ref
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        "border border-border shadow-sm",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-primary text-primaryFg hover:opacity-95",
        variant === "secondary" && "bg-muted text-fg hover:opacity-95",
        variant === "danger" && "bg-danger text-dangerFg hover:opacity-95",
        variant === "ghost" && "bg-transparent text-fg hover:bg-muted",
        className
      )}
      disabled={isDisabled}
      aria-busy={isLoading ? true : undefined}
      {...props}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span className="sr-only">Loading</span>
        </span>
      ) : null}
      <span className={cn(isLoading && "sr-only")}>{children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
});
