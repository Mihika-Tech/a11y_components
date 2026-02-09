export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <nav className="rounded-lg border border-border bg-card p-4 shadow-soft">
          <div className="text-sm font-semibold">Docs</div>

          <div className="mt-4 text-xs font-semibold text-mutedFg">Guides</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/accessibility-checklist">
                Accessibility Checklist
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/performance">
                Performance
              </a>
            </li>
          </ul>

          <div className="mt-6 text-xs font-semibold text-mutedFg">Components</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs">
                Overview
              </a>
            </li>

            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/button">
                Button
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/text-input">
                TextInput
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/modal">
                Modal
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/toast">
                Toast
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/tabs">
                Tabs
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/skeleton">
                Skeleton
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/data-table">
                DataTable
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/combobox">
                Combobox
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/drawer">
                Drawer
              </a>
            </li>
            <li>
              <a className="text-mutedFg hover:text-fg" href="/docs/popover">
                Popover
              </a>
            </li>
          </ul>
        </nav>

        <div>{children}</div>
      </div>
    </div>
  );
}
