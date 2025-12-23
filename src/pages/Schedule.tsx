import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  MapPin,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { Button } from "@/components/ui/button";
import { fetchTournaments, TournamentRow } from "@/services/publicApi";

type UiTournament = {
  id: string;
  name: string;
  date: Date; // start_date as Date
  endDate?: Date | null;
  location: string;
  division: string;
  isPast: boolean;
  isNext: boolean;
  isFeatured: boolean;
  notes?: string | null; // not in DB yet, kept for UI compatibility
  result?: string | null; // not in DB yet, kept for UI compatibility
  status: string;
};

const toDateLocalStart = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T00:00:00`);

const Schedule = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<UiTournament | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [tournaments, setTournaments] = useState<UiTournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const rows: TournamentRow[] = await fetchTournaments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const mapped: UiTournament[] = rows.map((t) => {
          const start = toDateLocalStart(t.start_date);
          const end = t.end_date ? toDateLocalStart(t.end_date) : null;

          // Past determination:
          // - if status is PAST, trust it
          // - else compare date (end_date if exists, otherwise start_date)
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
            notes: null,
            result: null,
            status: t.status ?? (isPast ? "PAST" : "UPCOMING"),
          };
        });

        // Sort by date ascending (nice for calendar + lists)
        mapped.sort((a, b) => a.date.getTime() - b.date.getTime());

        // Ensure only one next tournament is considered (if multiple, pick earliest upcoming)
        const nextMarked = mapped.filter((x) => x.isNext && !x.isPast);
        if (nextMarked.length > 1) {
          const earliest = [...nextMarked].sort(
            (a, b) => a.date.getTime() - b.date.getTime()
          )[0];
          mapped.forEach((x) => (x.isNext = x.id === earliest.id));
        }

        setTournaments(mapped);
      } catch (e: any) {
        setLoadError(e?.message ?? "Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const nextTournament = useMemo(() => {
    if (!tournaments.length) return null;

    // 1) prefer is_next=true and upcoming
    const marked = tournaments.find((t) => t.isNext && !t.isPast);
    if (marked) return marked;

    // 2) otherwise closest upcoming by date
    const upcoming = tournaments
      .filter((t) => !t.isPast)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    return upcoming[0] ?? null;
  }, [tournaments]);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(tournaments.map((t) => t.date.getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [tournaments]);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "upcoming" && !t.isPast) ||
        (activeFilter === "past" && t.isPast);

      const matchesYear = selectedYear === null || t.date.getFullYear() === selectedYear;

      return matchesFilter && matchesYear;
    });
  }, [tournaments, activeFilter, selectedYear]);

  const upcomingTournaments = filteredTournaments.filter((t) => !t.isPast);
  const pastTournaments = filteredTournaments.filter((t) => t.isPast);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const getEventsForDay = (day: number) => {
    return tournaments.filter((t) => {
      return (
        t.date.getDate() === day &&
        t.date.getMonth() === currentMonth.getMonth() &&
        t.date.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

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
              Schedule & Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Follow our journey through the season
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Tournament Countdown */}
      {!loading && !loadError && nextTournament && (
        <section className="section-container -mt-8">
          <GlassCard className="text-center p-8 md:p-12 glow-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-primary uppercase tracking-widest text-sm mb-2">
                Next Tournament
              </p>
              <h2 className="text-2xl md:text-4xl font-bold gradient-text mb-2">
                {nextTournament.name}
              </h2>
              <div className="flex items-center justify-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {nextTournament.location}
                </span>
                <span>•</span>
                <span>{nextTournament.division}</span>
              </div>

              <div className="flex justify-center">
                <CountdownTimer targetDate={nextTournament.date} />
              </div>
            </motion.div>
          </GlassCard>
        </section>
      )}

      {/* Loading / Error state */}
      {(loading || loadError) && (
        <section className="section-container -mt-8">
          <GlassCard className="text-center p-8 md:p-12">
            {loading ? (
              <p className="text-muted-foreground">Loading tournaments...</p>
            ) : (
              <p className="text-muted-foreground">{loadError}</p>
            )}
          </GlassCard>
        </section>
      )}

      {/* Calendar Section */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Tournament Calendar"
            subtitle="Click on events to see details"
          />

          <GlassCard className="p-6 max-w-4xl mx-auto">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                  )
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-xl font-semibold text-foreground">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                  )
                }
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the first */}
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const events = getEventsForDay(day);
                const isToday =
                  day === new Date().getDate() &&
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => events.length > 0 && setSelectedEvent(events[0])}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all duration-200 ${
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : events.length > 0
                        ? "bg-accent/20 hover:bg-accent/40 cursor-pointer"
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    <span>{day}</span>
                    {events.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {events.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isToday ? "bg-primary-foreground" : "bg-primary"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 md:p-8 max-w-lg w-full glow-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`text-xs uppercase tracking-wider ${
                      selectedEvent.isPast ? "text-muted-foreground" : "text-primary"
                    }`}
                  >
                    {selectedEvent.isPast ? "Past Event" : "Upcoming Event"}
                  </span>
                  <h3 className="text-2xl font-bold gradient-text">
                    {selectedEvent.name}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>
                    {selectedEvent.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {selectedEvent.endDate
                      ? ` – ${selectedEvent.endDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}`
                      : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.division} Division</span>
                </div>

                {selectedEvent.notes && (
                  <p className="text-muted-foreground border-t border-border/50 pt-4">
                    {selectedEvent.notes}
                  </p>
                )}

                {selectedEvent.result && (
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <p className="text-xl font-bold gradient-text">
                      {selectedEvent.result}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <section className="section-container">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <div className="flex gap-2">
            {(["all", "upcoming", "past"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-border hidden md:block" />
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setSelectedYear(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedYear === null
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedYear === year
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Lists */}
      <section className="page-section">
        <div className="section-container grid lg:grid-cols-2 gap-12">
          {/* Upcoming */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              Upcoming Tournaments
            </h3>
            {upcomingTournaments.length === 0 ? (
              <GlassCard>
                <p className="text-center text-muted-foreground py-8">
                  No upcoming tournaments found
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {upcomingTournaments.map((tournament, index) => (
                  <GlassCard key={tournament.id} delay={index * 0.1} hover>
                    <button
                      className="w-full text-left"
                      onClick={() => setSelectedEvent(tournament)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {tournament.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {tournament.date.toLocaleDateString()} • {tournament.location}
                          </p>
                          <span className="inline-block mt-2 px-2 py-0.5 rounded bg-primary/20 text-primary text-xs">
                            {tournament.division}
                          </span>
                        </div>
                      </div>
                    </button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Past */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              Past Results
            </h3>
            {pastTournaments.length === 0 ? (
              <GlassCard>
                <p className="text-center text-muted-foreground py-8">
                  No past tournaments found
                </p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {pastTournaments.map((tournament, index) => (
                  <GlassCard key={tournament.id} delay={index * 0.1} hover>
                    <button
                      className="w-full text-left"
                      onClick={() => setSelectedEvent(tournament)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {tournament.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {tournament.date.toLocaleDateString()} • {tournament.location}
                          </p>
                        </div>
                        {tournament.result && (
                          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                            {tournament.result}
                          </span>
                        )}
                      </div>
                    </button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Schedule;
