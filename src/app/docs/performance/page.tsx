import { DocsShell } from "@/components/patterns/docs/docs-shell";

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-soft">
      <h2 className="text-base font-semibold">{title}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mutedFg">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </section>
  );
}

export default function PerformancePage() {
  return (
    <DocsShell
      title="Performance"
      description="Guidelines used in this repo to keep Lighthouse scores high and avoid regressions."
    >
      <div className="space-y-4">
        <Card
          title="Core principles"
          items={[
            "Render content first. Do not block pages on non-critical scripts.",
            "Avoid unnecessary client components. Prefer server components by default.",
            "Keep component APIs small and avoid heavy dependencies for simple patterns."
          ]}
        />

        <Card
          title="Images and fonts"
          items={[
            "Use next/image for responsive images and correct sizing.",
            "Prefer system fonts unless brand requires custom fonts.",
            "If custom fonts are used, ensure font-display is swap and preload only what is needed."
          ]}
        />

        <Card
          title="JavaScript and bundles"
          items={[
            "Prefer composable primitives over large UI frameworks.",
            "Keep tables and overlays lightweight, avoid unnecessary re-renders.",
            "Split demo app flows by route. Do not import heavy code into shared layout."
          ]}
        />

        <Card
          title="How to verify"
          items={[
            "Run Lighthouse in Chrome on home, docs, and task hub dashboard pages.",
            "Watch for layout shifts, long main-thread tasks, and large JS bundles.",
            "Keep Playwright and unit tests fast to support frequent runs."
          ]}
        />
      </div>
    </DocsShell>
  );
}
