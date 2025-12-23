import { supabase } from "@/lib/supabaseClient";

/** ========= Types (optional but recommended) ========= */
export type PlayerRow = {
  id: string;
  full_name: string;
  jersey_number: number | null;
  role_tag: "CAPTAIN" | "COACH" | "PLAYER" | string | null;
  position: string | null;
  tagline: string | null;
  bio: string | null;
  photo_url: string | null;
  instagram_url: string | null;
  ultiscore_url: string | null;
};

export type AchievementRow = {
  id: string;
  year: number;
  title: string;
  description: string | null;
  category: string | null;
  is_featured: boolean | null;
  sort_order: number | null;
};

export type TournamentRow = {
  id: string;
  name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string | null; // YYYY-MM-DD
  location: string | null;
  division: "OPEN" | "MIXED" | "WOMEN" | "OTHER" | string;
  status: "UPCOMING" | "PAST" | string;
  is_next: boolean | null;
  is_featured: boolean;
};

/** ========= Players =========
 * Uses players_public view for:
 * - active-only filtering
 * - role_sort ordering
 */
export async function fetchPlayers(): Promise<PlayerRow[]> {
  const { data, error } = await supabase
    .from("players_public")
    .select(
      "id, full_name, jersey_number, role_tag, position, tagline, bio, photo_url, instagram_url, ultiscore_url"
    )
    .order("role_sort", { ascending: true })
    .order("jersey_number", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return (data ?? []) as PlayerRow[];
}

/** ========= Achievements ========= */
export async function fetchAchievements(): Promise<AchievementRow[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("id, year, title, description, category, is_featured, sort_order")
    .order("is_featured", { ascending: false })
    .order("year", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as AchievementRow[];
}

/** ========= Tournaments ========= */
export async function fetchTournaments(): Promise<TournamentRow[]> {
  const { data, error } = await supabase
    .from("tournaments")
    .select(
      "id, name, start_date, end_date, location, division, status, is_next, is_featured"
    )
    // show upcoming first, then past (nice UX)
    .order("status", { ascending: true }) // UPCOMING then PAST (alphabetical)
    .order("is_next", { ascending: false })
    .order("start_date", { ascending: true });

  if (error) throw error;
  return (data ?? []) as TournamentRow[];
}
