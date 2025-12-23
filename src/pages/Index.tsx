import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  Trophy,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import CountdownTimer from "@/components/ui/CountdownTimer";
import heroAction from "@/assets/hero-action.jpg";
import phantomLogo from "@/assets/phantom-logo.png";
import { teamInfo, newsArticles } from "@/data/teamData";
import { fetchTournaments, TournamentRow, fetchAchievements, AchievementRow } from "@/services/publicApi";

type UiTournament = {
  id: string;
  name: string;
  date: Date;
  endDate?: Date | null;
  location: string;
  division: string;
  isPast: boolean;
  isNext: boolean;
  isFeatured: boolean;
  result?: string | null; // not in DB yet, kept for UI
};

const toDateLocalStart = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00`);

const Index = () => {
  const [tournaments, setTournaments] = useState<UiTournament[]>([]);
  const [achievements, setAchievements] = useState<AchievementRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const [tRows, aRows] = await Promise.all([
          fetchTournaments(),
          fetchAchievements(),
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const mapped: UiTournament[] = (tRows as TournamentRow[]).map((t) => {
          const start = toDateLocalStart(t.start_date);
          const end = t.end_date ? toDateLocalStart(t.end_date) : null;

          const compareDate = end ?? start;
          const isPast =
            (t.status ?? "").toUpperCase() === "PAST" ||
            compareDate.getTime() < today.getTime();

          return {
            id: t.id,
            name: t.name,
            date: start,
            endDate: end,
            location: t.location ?? "TBA",
            division: t.division ?? "OPEN",
            isPast,
            isNext: Boolean(t.is_next),
            isFeatured: Boolean(t.is_featured),
            result: null,
          };
        });

        // Sort by date
        mapped.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Ensure only one next tournament is treated as next (if multiple)
        const nextMarked = mapped.filter((x) => x.isNext && !x.isPast);
        if (nextMarked.length > 1) {
          const earliest = [...nextMarked].sort(
            (a, b) => a.date.getTime() - b.date.getTime()
          )[0];
          mapped.forEach((x) => (x.isNext = x.id === earliest.id));
        }

        setTournaments(mapped);
        setAchievements(aRows);
      } catch (e: any) {
        setLoadError(e?.message ?? "Failed to load home data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const nextTournament = useMemo(() => {
    if (!tournaments.length) return null;

    const marked = tournaments.find((t) => t.isNext && !t.isPast);
    if (marked) return marked;

    const upcoming = tournaments
      .filter((t) => !t.isPast)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return upcoming[0] ?? null;
  }, [tournaments]);

  const recentResults = useMemo(() => {
    // Without result column in DB yet, we just show past tournaments by date desc
    return tournaments
      .filter((t) => t.isPast)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 3);
  }, [tournaments]);

  const featuredAchievements = useMemo(() => {
    // Show top 3 featured achievements (or fallback to newest)
    const sorted = [...achievements].sort((a, b) => {
      const fa = a.is_featured ? 1 : 0;
      const fb = b.is_featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      if (a.year !== b.year) return b.year - a.year;
      return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });

    return sorted.slice(0, 3);
  }, [achievements]);

  const latestNews = newsArticles.slice(0, 3);

  const highlights = [
    { icon: Calendar, label: "Founded", value: teamInfo.foundedYear },
    { icon: MapPin, label: "Home City", value: teamInfo.city },
    { icon: Users, label: "Division", value: teamInfo.division },
    { icon: Clock, label: "Training", value: teamInfo.trainingDays },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroAction}
            alt="PHANTOM team in action"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* Content */}
        <div className="relative z-10 section-container text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={phantomLogo}
              alt="PHANTOM"
              className="h-24 md:h-32 lg:h-40 mx-auto float"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="gradient-text glow-text">PHANTOM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            {teamInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild variant="phantom" size="xl">
              <Link to="/join">Join Us / Tryouts</Link>
            </Button>
            <Button asChild variant="phantom-outline" size="lg">
              <Link to="/contact">Scrimmage Request</Link>
            </Button>
            <Button asChild variant="phantom-glass" size="lg">
              <Link to="/sponsors">Sponsor Us</Link>
            </Button>
          </motion.div>

          {loadError ? (
            <div className="mt-10 text-sm text-muted-foreground">
              {loadError}
            </div>
          ) : null}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Highlight Cards */}
      <section className="page-section -mt-20 relative z-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, index) => (
              <GlassCard key={item.label} delay={index * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-primary/10 mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Next Tournament Countdown */}
      <section className="page-section">
        <div className="section-container">
          <GlassCard className="text-center p-8 md:p-12">
            {loading ? (
              <p className="text-muted-foreground">Loading next tournament...</p>
            ) : nextTournament ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-primary uppercase tracking-widest text-sm mb-2">
                  Next Tournament
                </p>
                <h2 className="text-2xl md:text-4xl font-bold gradient-text mb-2">
                  {nextTournament.name}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {nextTournament.location} • {nextTournament.division}
                </p>

                <div className="flex justify-center mb-8">
                  <CountdownTimer targetDate={nextTournament.date} />
                </div>

                <Button asChild variant="phantom-outline" size="lg">
                  <Link to="/schedule">
                    View Full Schedule
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <p className="text-muted-foreground">No upcoming tournaments yet.</p>
            )}
          </GlassCard>
        </div>
      </section>

      {/* Featured Achievements (NEW, from Supabase) */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Featured Achievements"
            subtitle="Highlights from our journey"
          />
          {loading ? (
            <GlassCard className="p-8 text-center">
              <p className="text-muted-foreground">Loading achievements...</p>
            </GlassCard>
          ) : featuredAchievements.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <p className="text-muted-foreground">No achievements added yet.</p>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredAchievements.map((a, index) => (
                <GlassCard key={a.id} delay={index * 0.1} hover>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-primary font-medium">
                        {a.year}
                        {a.category ? ` • ${a.category}` : ""}
                      </p>
                      <h3 className="font-semibold text-foreground mb-2">
                        {a.title}
                      </h3>
                      {a.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {a.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="phantom-outline">
              <Link to="/about">
                See All Achievements
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading title="Recent Results" subtitle="Our latest tournaments" />
          {loading ? (
            <GlassCard className="p-8 text-center">
              <p className="text-muted-foreground">Loading results...</p>
            </GlassCard>
          ) : recentResults.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <p className="text-muted-foreground">No past tournaments found.</p>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recentResults.map((tournament, index) => (
                <GlassCard key={tournament.id} delay={index * 0.1} hover>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {tournament.date.toLocaleDateString()} • {tournament.location}
                      </p>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        {tournament.division}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="phantom-outline">
              <Link to="/schedule">
                View Results
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading title="Latest News" subtitle="Stay updated with team announcements" />
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article, index) => (
              <GlassCard key={article.id} delay={index * 0.1} className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Newspaper className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-primary">
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="phantom-outline">
              <Link to="/news">
                View All News
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
