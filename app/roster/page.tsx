import { supabase } from "../../lib/supabase-browser";

export default async function RosterPage() {
  const { data: members, error } = await supabase
    .from("members")
    .select("id, ign, job, type, active")
    .eq("active", true);

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Orcas Guild Roster</h1>
        <p style={{ color: "crimson" }}>Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Orcas Guild Roster</h1>

      <ul>
        {(members ?? []).map((m) => (
          <li key={m.id}>
            {m.ign} — {m.job ?? "—"} — {m.type}
          </li>
        ))}
      </ul>
    </main>
  );
}