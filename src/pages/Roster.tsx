import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, BarChart3, Instagram } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { players, Player } from "@/data/teamData";
import defaultPlayer from "@/assets/default-player.png";

const PlayerSocialButtons = ({ player }: { player: Player }) => {
  const hasUltiscore = Boolean(player.ultiscoreId);
  const hasInstagram = Boolean(player.instagramUsername);

  const getInstagramUrl = (username: string) => {
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username;
    return `https://instagram.com/${cleanUsername}`;
  };

  const getInstagramDisplay = (username: string) => {
    return username.startsWith("@") ? username : `@${username}`;
  };

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
                onClick={() => window.open(`https://ultiscore.com/profile/${player.ultiscoreId}`, "_blank")}
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
                onClick={() => window.open(getInstagramUrl(player.instagramUsername!), "_blank")}
              >
                <Instagram className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium truncate max-w-[80px]">
                  {getInstagramDisplay(player.instagramUsername!)}
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

  const filters = ["All", "Captains", "Coach/Staff", "Players"];

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.number.toString().includes(searchQuery);

      let matchesFilter = true;
      if (activeFilter === "Captains") {
        matchesFilter = player.role === "Captain";
      } else if (activeFilter === "Coach/Staff") {
        matchesFilter = player.role === "Coach" || player.role === "Staff";
      } else if (activeFilter === "Players") {
        matchesFilter = player.role === "Player";
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

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
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No players found matching your criteria</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers.map((player, index) => (
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
                        src={player.image || defaultPlayer}
                        alt={player.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultPlayer;
                        }}
                      />
                      {/* Number Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-primary/90 text-primary-foreground font-bold text-lg">
                        #{player.number}
                      </div>
                      {/* Role Badge */}
                      {(player.role === "Captain" || player.role === "Coach" || player.role === "Staff") && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-accent/90 text-accent-foreground text-xs font-semibold uppercase">
                          {player.role}
                        </div>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-sm text-primary">{player.position}</p>
                      <p className="text-sm text-muted-foreground italic">
                        "{player.funFact}"
                      </p>
                    </div>

                    {/* Social & Stats Buttons */}
                    <PlayerSocialButtons player={player} />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Roster;
