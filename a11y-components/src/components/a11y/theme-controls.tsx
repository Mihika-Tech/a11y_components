"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function getStored(key: string) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function ThemeControls() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const [highContrast, setHighContrast] = React.useState(false);

  function apply(nextTheme: Theme, hc: boolean) {
    const root = document.documentElement;
    root.classList.toggle("dark", nextTheme === "dark");
    root.classList.toggle("hc", hc);
    setStored("theme", nextTheme);
    setStored("high-contrast", String(hc));
  }

  React.useEffect(() => {
    setMounted(true);

    const storedTheme = (getStored("theme") as Theme | null) ?? null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");

    const storedHc = getStored("high-contrast");
    const initialHc = storedHc === "true";

    setTheme(initialTheme);
    setHighContrast(initialHc);

    apply(initialTheme, initialHc);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-55" aria-hidden="true" />;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        aria-pressed={theme === "dark"}
        onClick={() => {
          const next = theme === "dark" ? "light" : "dark";
          setTheme(next);
          apply(next, highContrast);
        }}
      >
        Theme: {theme === "dark" ? "Dark" : "Light"}
      </Button>

      <Button
        variant="secondary"
        aria-pressed={highContrast}
        onClick={() => {
          const next = !highContrast;
          setHighContrast(next);
          apply(theme, next);
        }}
      >
        Contrast: {highContrast ? "High" : "Normal"}
      </Button>
    </div>
  );
}
