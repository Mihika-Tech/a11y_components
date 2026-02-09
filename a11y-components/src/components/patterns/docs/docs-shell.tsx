import type * as React from "react";

export function DocsShell({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description ? <p className="max-w-3xl text-mutedFg">{description}</p> : null}
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
}
