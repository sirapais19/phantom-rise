import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import GlassCard from "@/components/ui/GlassCard";
import jerseyImage from "@/assets/phantom-jersey.jpg";

const Jersey = () => {
  return (
    <PageLayout>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold gradient-text mb-6">Official Jersey</motion.h1>
          <p className="text-xl text-muted-foreground">The colors we wear with pride</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <GlassCard className="p-8 md:p-12 text-center glow-border">
              <div className="max-w-md mx-auto mb-8">
                <img src={jerseyImage} alt="PHANTOM Official Jersey" className="w-full rounded-xl shadow-2xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4">PHANTOM Team Jersey</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our official team jersey represents the PHANTOM identity—bold purple and lavender colors that command attention on the field. The dynamic design embodies our playing style: swift, elusive, and unforgettable. Every player who wears this jersey carries the spirit and legacy of PHANTOM.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Jersey;
