import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { newsArticles } from "@/data/teamData";

const News = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Recap", "Announcement", "Spotlight"];

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return newsArticles;
    return newsArticles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

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
              News & Updates
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay connected with the latest from PHANTOM
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-container">
        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="page-section">
        <div className="section-container">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full flex flex-col group" hover>
                    {/* Image */}
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 mb-4 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground/50">Article Image</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      
                      <Button
                        variant="phantom-outline"
                        size="sm"
                        className="w-fit group/btn"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </GlassCard>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="page-section">
        <div className="section-container">
          <GlassCard className="text-center p-8 md:p-12 max-w-2xl mx-auto glow-border">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Stay in the Loop
            </h3>
            <p className="text-muted-foreground mb-6">
              Follow us on social media for real-time updates and behind-the-scenes content
            </p>
            <Button asChild variant="phantom">
              <Link to="/contact">Follow Us</Link>
            </Button>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default News;
