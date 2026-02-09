import { ThemeControls } from "@/components/a11y/theme-controls";

export default function SettingsPage() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
      <h2 className="text-lg font-semibold">Settings</h2>
      <p className="mt-1 text-sm text-mutedFg">Theme and contrast preferences are stored locally.</p>

      <div className="mt-4">
        <ThemeControls />
      </div>
    </div>
  );
}
