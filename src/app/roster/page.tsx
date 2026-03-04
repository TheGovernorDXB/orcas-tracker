import Link from "next/link";
import { supabase } from "@/lib/supabase-browser";

export default async function RosterPage() {
  const { data: members, error } = await supabase
    .from("members")
    .select("id, ign, type, job, active")
    .eq("active", true)
    .order("ign", { ascending: true });

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Roster</h1>
        <p style={{ color: "crimson" }}>Error: {error.message}</p>
        <p style={{ opacity: 0.7 }}>
          If you see an RLS/policy error, we’ll enable read access next.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Orcas Roster</h1>
      <p style={{ opacity: 0.8 }}>GMS Scania · {members?.length ?? 0} members</p>

      <div style={{ marginTop: 12 }}>
        <Link href="/">← Home</Link>
      </div>

      <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: 8 }}>IGN</th>
            <th style={{ padding: 8 }}>Type</th>
            <th style={{ padding: 8 }}>Job</th>
          </tr>
        </thead>
        <tbody>
          {(members ?? []).map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>
                <Link href={`/member/${encodeURIComponent(m.ign)}`}>{m.ign}</Link>
              </td>
              <td style={{ padding: 8 }}>{m.type}</td>
              <td style={{ padding: 8 }}>{m.job ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {(!members || members.length === 0) && (
        <p style={{ marginTop: 16, opacity: 0.7 }}>
          No members yet — next we’ll import your roster in one shot.
        </p>
      )}
    </main>
  );
}