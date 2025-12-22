import { motion } from "framer-motion";
import { Target, Heart, Award, Users } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { achievements } from "@/data/teamData";
import heroAction from "@/assets/hero-action.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every throw, every catch, and every game we play.",
    },
    {
      icon: Heart,
      title: "Spirit",
      description: "We embody the Spirit of the Game, respecting opponents and playing with integrity.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We build lasting friendships and support each other on and off the field.",
    },
    {
      icon: Award,
      title: "Growth",
      description: "We continuously improve, learn from challenges, and celebrate progress.",
    },
  ];

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
              About PHANTOM
            </h1>
            <p className="text-xl text-muted-foreground">
              More than a team - we're a family united by our passion for Ultimate Frisbee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="page-section">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, PHANTOM emerged from a group of passionate players who 
                  shared a vision: to create an Ultimate Frisbee team that combines 
                  competitive excellence with true sportsmanship.
                </p>
                <p>
                  What started as casual pick-up games in local parks has evolved into 
                  one of [CITY]'s premier Ultimate teams. Today, we compete at the highest 
                  levels while maintaining our commitment to growing the sport in our community.
                </p>
                <p>
                  Our name "PHANTOM" represents our playing style - swift, elusive, and 
                  appearing when least expected. On the field, we move like ghosts, 
                  threading passes through impossible gaps and making plays that leave 
                  opponents wondering what just happened.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card p-1">
                <img
                  src={heroAction}
                  alt="PHANTOM team"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Our Mission"
            subtitle="To elevate Ultimate Frisbee in [CITY] through competitive excellence, community engagement, and unwavering sportsmanship"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Spirit of the Game */}
      <section className="page-section">
        <div className="section-container">
          <GlassCard className="text-center p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Spirit of the Game
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ultimate Frisbee is unique among competitive sports. We play without referees, 
                relying on mutual respect and honest communication. The Spirit of the Game 
                places the responsibility for fair play on every player.
              </p>
              <p className="text-muted-foreground">
                At PHANTOM, we believe that the true victory comes not just from winning, 
                but from winning with integrity. We celebrate great plays by our opponents, 
                we make honest calls, and we treat every player with respect. This isn't 
                just how we play - it's who we are.
              </p>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Achievements */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Achievements"
            subtitle="Our journey of excellence"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard key={achievement.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-primary font-medium">{achievement.year}</p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photo */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="The Team"
            subtitle="United by passion, driven by excellence"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-[21/9] rounded-2xl overflow-hidden glass-card p-1"
          >
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <p className="text-muted-foreground">Team Photo Placeholder</p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
