import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, BarChart3, Instagram } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import defaultPlayer from "@/assets/default-player.png";

// ✅ Make sure you have this file set up:
// src/lib/supabaseClient.ts -> export const supabase = createClient(...)
import { supabase } from "@/lib/supabaseClient";

type RoleTag = "CAPTAIN" | "COACH" | "PLAYER";
type StatusTag = "ACTIVE" | "INACTIVE";

type PlayerRow = {
  id: string;
  full_name: string;
  jersey_number: number | null;
  role_tag: RoleTag | null;
  position: string | null;
  tagline: string | null;
  bio: string | null;
  photo_url: string | null;
  status: StatusTag | null;
  instagram_url: string | null; // full URL preferred (from CMS)
  ultiscore_url: string | null; // full URL preferred (from CMS)
};

const roleLabel = (role?: RoleTag | null) => {
  if (role === "CAPTAIN") return "Captain";
  if (role === "COACH") return "Coach";
  return "Player";
};

const isRoleBadge = (role?: RoleTag | null) =>
  role === "CAPTAIN" || role === "COACH";

const normalizeUrl = (value?: string | null) => {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;
  // If user stored username instead of full URL, try to build a valid URL
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
};

const igUsernameFromUrlOrText = (value?: string | null) => {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;

  // If it's already @username
  if (v.startsWith("@")) return v;

  // If it looks like a username (no spaces, no slashes)
  if (!v.includes("/") && !v.includes(" ") && !v.includes(".")) return `@${v}`;

  // Parse from URL
  try {
    const u = new URL(normalizeUrl(v)!);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] ? `@${parts[0]}` : null;
  } catch {
    return null;
  }
};

const buildInstagramLink = (value?: string | null) => {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;

  if (v.startsWith("http://") || v.startsWith("https://")) return v;

  // if "@username" or "username"
  const username = v.startsWith("@") ? v.slice(1) : v;
  return `https://instagram.com/${username}`;
};

const buildUltiscoreLink = (value?: string | null) => {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;

  // if already full URL
  if (v.startsWith("http://") || v.startsWith("https://")) return v;

  // if user stored only numeric id
  if (/^\d+$/.test(v)) return `https://ultiscore.com/profile/${v}`;

  // fallback: try https://
  return normalizeUrl(v);
};

const PlayerSocialButtons = ({ player }: { player: PlayerRow }) => {
  const ultiscoreLink = buildUltiscoreLink(player.ultiscore_url);
  const instagramLink = buildInstagramLink(player.instagram_url);
  const igLabel = igUsernameFromUrlOrText(player.instagram_url);

  const hasUltiscore = Boolean(ultiscoreLink);
  const hasInstagram = Boolean(instagramLink) && Boolean(igLabel);

  if (!hasUltiscore && !hasInstagram) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
        {/* UltiScore Button */}
        {hasUltiscore ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                onClick={() => window.open(ultiscoreLink!, "_blank", "noreferrer")}
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium">Stats</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View UltiScore Profile</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 bg-muted/30 text-muted-foreground/50 border border-border/20 cursor-not-allowed"
                disabled
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium">Stats</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stats not available</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Instagram Button */}
        {hasInstagram ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_12px_hsl(var(--accent)/0.3)]"
                onClick={() => window.open(instagramLink!, "_blank", "noreferrer")}
              >
                <Instagram className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium truncate max-w-[120px]">
                  {igLabel}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Instagram Profile</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 bg-muted/30 text-muted-foreground/50 border border-border/20 cursor-not-allowed"
                disabled
              >
                <Instagram className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium">IG</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Instagram not provided</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

const Roster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [players, setPlayers] = useState<PlayerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const filters = ["All", "Captains", "Coach/Staff", "Players"];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const { data, error } = await supabase
          .from("players")
          .select(
            "id, full_name, jersey_number, role_tag, position, tagline, bio, photo_url, status, instagram_url, ultiscore_url"
          );

        if (error) throw error;

        // Client-side safety (in case RLS not applied yet)
        const activeOnly = (data ?? []).filter(
          (p: PlayerRow) => (p.status ?? "ACTIVE") === "ACTIVE"
        );

        // Sort: CAPTAIN -> COACH -> PLAYER, then jersey_number
        const roleOrder: Record<string, number> = { CAPTAIN: 0, COACH: 1, PLAYER: 2 };
        activeOnly.sort((a, b) => {
          const ra = roleOrder[a.role_tag ?? "PLAYER"] ?? 2;
          const rb = roleOrder[b.role_tag ?? "PLAYER"] ?? 2;
          if (ra !== rb) return ra - rb;

          const na = a.jersey_number ?? 9999;
          const nb = b.jersey_number ?? 9999;
          return na - nb;
        });

        setPlayers(activeOnly);
      } catch (e: any) {
        setLoadError(e?.message ?? "Failed to load players");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredPlayers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return players.filter((player) => {
      const numberStr = (player.jersey_number ?? "").toString();
      const matchesSearch =
        !q ||
        player.full_name.toLowerCase().includes(q) ||
        numberStr.includes(q);

      let matchesFilter = true;
      if (activeFilter === "Captains") {
        matchesFilter = (player.role_tag ?? "PLAYER") === "CAPTAIN";
      } else if (activeFilter === "Coach/Staff") {
        // DB has COACH only (no STAFF). Keep label as requested.
        matchesFilter = (player.role_tag ?? "PLAYER") === "COACH";
      } else if (activeFilter === "Players") {
        matchesFilter = (player.role_tag ?? "PLAYER") === "PLAYER";
      }

      return matchesSearch && matchesFilter;
    });
  }, [players, searchQuery, activeFilter]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Meet the Team
            </h1>
            <p className="text-xl text-muted-foreground">
              The athletes who make PHANTOM legendary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-container -mt-8">
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Player Grid */}
      <section className="page-section">
        <div className="section-container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading players...</p>
            </div>
          ) : loadError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{loadError}</p>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No players found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers.map((player, index) => {
                const displayNumber =
                  player.jersey_number !== null && player.jersey_number !== undefined
                    ? `#${player.jersey_number}`
                    : null;

                const role = (player.role_tag ?? "PLAYER") as RoleTag;

                const quote = (player.tagline ?? "").trim();
                const showQuote = quote.length > 0;

                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <GlassCard className="group overflow-hidden" hover>
                      {/* Player Image */}
                      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
                        <img
                          src={player.photo_url || defaultPlayer}
                          alt={player.full_name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = defaultPlayer;
                          }}
                        />

                        {/* Number Badge */}
                        {displayNumber && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-primary/90 text-primary-foreground font-bold text-lg">
                            {displayNumber}
                          </div>
                        )}

                        {/* Role Badge */}
                        {isRoleBadge(role) && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-accent/90 text-accent-foreground text-xs font-semibold uppercase">
                            {roleLabel(role)}
                          </div>
                        )}
                      </div>

                      {/* Player Info */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {player.full_name}
                        </h3>

                        {player.position ? (
                          <p className="text-sm text-primary">{player.position}</p>
                        ) : (
                          <p className="text-sm text-primary/70"> </p>
                        )}

                        {showQuote && (
                          <p className="text-sm text-muted-foreground italic">
                            “{quote}”
                          </p>
                        )}
                      </div>

                      {/* Social & Stats Buttons */}
                      <PlayerSocialButtons player={player} />
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Roster;
