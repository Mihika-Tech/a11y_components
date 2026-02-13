import { DocsShell } from "@/components/patterns/docs/docs-shell";

function Item({
  title,
  why,
  how,
  components
}: {
  title: string;
  why: string;
  how: string[];
  components?: Array<{ name: string; href: string }>;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-soft">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-mutedFg">{why}</p>

      <div className="mt-4">
        <div className="text-sm font-medium">How to verify</div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mutedFg">
          {how.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {components && components.length > 0 ? (
        <div className="mt-4">
          <div className="text-sm font-medium">Related docs</div>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {components.map((c) => (
              <li key={c.href}>
                <a className="rounded-md border border-border px-2 py-1 text-mutedFg hover:text-fg" href={c.href}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default function AccessibilityChecklistPage() {
  return (
    <DocsShell
      title="Accessibility Checklist"
      description="Practical checks you can run quickly. Each item maps to patterns used in this repo."
    >
      <div className="space-y-4">
        <Item
          title="Keyboard navigation works without traps"
          why="Users should be able to reach every interactive element using Tab, Shift+Tab, and arrow keys where expected."
          how={[
            "Navigate key flows using only keyboard: login, dashboard, create task, task details.",
            "Ensure focus never disappears and never gets stuck behind an overlay.",
            "Verify there is always a visible focus indicator."
          ]}
          components={[
            { name: "Modal", href: "/a11y_components/docs/modal" },
            { name: "Drawer", href: "/a11y_components/docs/drawer" },
            { name: "Popover", href: "/a11y_components/docs/popover" },
            { name: "Tabs", href: "/a11y_components/docs/tabs" }
          ]}
        />

        <Item
          title="Focus management for overlays"
          why="Dialogs and drawers must move focus inside, trap focus while open, and restore focus to the trigger on close."
          how={[
            "Open a Modal or Drawer and press Tab repeatedly. Focus should stay inside.",
            "Press Escape. Overlay closes and focus returns to the trigger.",
            "Click outside if allowed. Focus returns to the trigger."
          ]}
          components={[
            { name: "Modal", href: "a11y_components//docs/modal" },
            { name: "Drawer", href: "a11y_components//docs/drawer" }
          ]}
        />

        <Item
          title="Correct semantics and labeling"
          why="Controls need accessible names and form inputs need labels so assistive tech can announce them correctly."
          how={[
            "Every input must have an associated label.",
            "Icon-only buttons must have aria-label.",
            "Tables should have headers that describe the column meaning."
          ]}
          components={[
            { name: "TextInput", href: "/a11y_components/docs/text-input" },
            { name: "DataTable", href: "/a11y_components/docs/data-table" },
            { name: "Button", href: "/a11y_components/docs/button" }
          ]}
        />

        <Item
          title="Error states are announced and actionable"
          why="Validation errors should be obvious visually and connected to the field via aria-describedby or equivalent."
          how={[
            "Submit Create Task with empty fields. Errors should be visible and specific.",
            "Screen reader should announce field error using aria-describedby.",
            "Do not rely only on color. Include text and ensure focus can reach the error."
          ]}
          components={[
            { name: "TextInput", href: "/a11y_components/docs/text-input" },
            { name: "Toast", href: "/a11y_components/docs/toast" }
          ]}
        />

        <Item
          title="Toasts do not steal focus and are announced"
          why="Notifications should be announced via aria-live without interrupting the user’s focus."
          how={[
            "Trigger a success toast, then keep typing in an input. Focus should not move.",
            "Error toasts should be assertive, info and success should be polite.",
            "Dismiss button should be reachable if the user tabs into the stack."
          ]}
          components={[{ name: "Toast", href: "/a11y_components/docs/toast" }]}
        />

        <Item
          title="Combobox and listbox navigation matches expectations"
          why="Typeahead patterns require predictable arrow key behavior and correct aria-activedescendant wiring."
          how={[
            "Type into combobox, use ArrowDown and ArrowUp to change active option.",
            "Press Enter to select, Escape to close.",
            "Verify aria-expanded and aria-activedescendant update correctly."
          ]}
          components={[{ name: "Combobox", href: "/a11y_components/docs/combobox" }]}
        />

        <Item
          title="Reduced motion and contrast preferences"
          why="Respect user preferences to reduce motion and improve contrast."
          how={[
            "Enable prefers-reduced-motion in DevTools and verify motion is reduced.",
            "Enable high contrast mode in your app settings and verify readability improves.",
            "Verify dark mode maintains sufficient contrast."
          ]}
        />

        <Item
          title="Automated checks are in CI"
          why="Accessibility quality should not rely on manual review alone."
          how={[
            "Run unit tests and verify at least one axe test exists.",
            "Run Playwright tests and verify a11y dashboard check passes.",
            "Keep new components covered by one keyboard or a11y test."
          ]}
        />
      </div>
    </DocsShell>
  );
}
