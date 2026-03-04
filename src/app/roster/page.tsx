import { supabase } from "../../lib/supabase-browser";

export default async function RosterPage() {
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("active", true);

  return (
    <main style={{ padding: 40 }}>
      <h1>Orcas Guild Roster</h1>

      <ul>
        {members?.map((m) => (
          <li key={m.id}>
            {m.ign} — {m.job}
          </li>
        ))}
      </ul>
    </main>
  );
}