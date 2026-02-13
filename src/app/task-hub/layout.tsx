export default function TaskHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Accessible Task Hub</h1>
        <nav className="flex gap-3 text-sm">
          <a className="text-mutedFg hover:text-fg" href="/a11y_components/task-hub/login">Login</a>
          <a className="text-mutedFg hover:text-fg" href="/a11y_components/task-hub/dashboard">Dashboard</a>
          <a className="text-mutedFg hover:text-fg" href="/a11y_components/task-hub/settings">Settings</a>
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </main>
  );
}
