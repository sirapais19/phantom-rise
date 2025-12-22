import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, ChevronRight, Trophy, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import CountdownTimer from "@/components/ui/CountdownTimer";
import heroAction from "@/assets/hero-action.jpg";
import phantomLogo from "@/assets/phantom-logo.png";
import { teamInfo, tournaments, newsArticles } from "@/data/teamData";

const Index = () => {
  const nextTournament = tournaments.find((t) => !t.isPast) || tournaments[0];
  const recentResults = tournaments.filter((t) => t.isPast).slice(0, 3);
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
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

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
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary uppercase tracking-widest text-sm mb-2">Next Tournament</p>
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
          </GlassCard>
        </div>
      </section>

      {/* Recent Results */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Recent Results"
            subtitle="Our latest tournament performances"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {recentResults.map((tournament, index) => (
              <GlassCard key={tournament.id} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {tournament.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tournament.date.toLocaleDateString()}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      {tournament.result}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Latest News"
            subtitle="Stay updated with team announcements"
          />
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
