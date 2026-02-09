import type { Metadata } from "next";
import "@/styles/globals.css";
import { SkipLink } from "@/components/a11y/skip-link";
import { ThemeControls } from "@/components/a11y/theme-controls";
import { ToastProvider } from "@/components/patterns/toast/toast-provider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility First Component Lab",
  description: "A production ready component lab and demo app focused on accessibility and UI craftsmanship."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <SkipLink />

          <header className="border-b border-border bg-card">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-3">
                <Link href="/" className="font-semibold">
                  Component Lab
                </Link>
                <a href="/docs" className="text-sm text-mutedFg hover:text-fg">
                  Docs
                </a>
                <a href="/task-hub/login" className="text-sm text-mutedFg hover:text-fg">
                  Task Hub
                </a>
              </div>

              <ThemeControls />
            </div>
          </header>

          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
