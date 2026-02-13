import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Accessibility First Component Lab</h1>
      <p className="mt-2 max-w-2xl text-mutedFg">
        A component library plus a small demo app that proves real world flows, keyboard support,
        testing, and performance.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link className="rounded-lg border border-border bg-card p-5 shadow-soft" href="/a11y_components/docs">
          <h2 className="font-semibold">Component docs</h2>
          <p className="mt-1 text-sm text-mutedFg">Props, examples, keyboard interactions, ARIA notes.</p>
        </Link>

        <a className="rounded-lg border border-border bg-card p-5 shadow-soft" href="/a11y_components/task-hub/login">
          <h2 className="font-semibold">Accessible Task Hub</h2>
          <p className="mt-1 text-sm text-mutedFg">Demo app using the components in realistic flows.</p>
        </a>
      </div>
    </main>
  );
}
