export function PropsTable({
  rows
}: {
  rows: Array<{ name: string; type: string; defaultValue?: string; notes?: string }>;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2 font-mono">{r.name}</td>
              <td className="px-3 py-2 font-mono">{r.type}</td>
              <td className="px-3 py-2 font-mono">{r.defaultValue ?? "-"}</td>
              <td className="px-3 py-2">{r.notes ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
