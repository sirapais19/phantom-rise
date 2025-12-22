import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Building2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sponsors } from "@/data/teamData";
import { useToast } from "@/hooks/use-toast";

const Sponsors = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Inquiry Sent!",
      description: "Thank you for your interest. We'll be in touch soon.",
    });
    
    setFormData({ name: "", organization: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const tiers = [
    {
      name: "Gold",
      color: "from-yellow-400/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      benefits: [
        "Logo on team jerseys",
        "Featured on website & social media",
        "VIP tournament access",
        "Dedicated partnership events",
      ],
    },
    {
      name: "Silver",
      color: "from-gray-300/20 to-gray-500/10",
      borderColor: "border-gray-400/30",
      textColor: "text-gray-300",
      benefits: [
        "Logo on team equipment",
        "Website & social mentions",
        "Tournament presence",
        "Quarterly reports",
      ],
    },
    {
      name: "Bronze",
      color: "from-orange-400/20 to-orange-600/10",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
      benefits: [
        "Website logo placement",
        "Social media mentions",
        "Event invitations",
        "Team newsletter features",
      ],
    },
  ];

  const goldSponsors = sponsors.filter((s) => s.tier === "Gold");
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "Bronze");

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
              Our Sponsors
            </h1>
            <p className="text-xl text-muted-foreground">
              The partners who help make our success possible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Our Partners"
            subtitle="Thank you to all our valued sponsors"
          />

          {/* Gold Sponsors */}
          {goldSponsors.length > 0 && (
            <div className="mb-12">
              <h3 className="text-center text-yellow-400 font-semibold mb-6 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400" />
                Gold Sponsors
              </h3>
              <div className="flex justify-center gap-8 flex-wrap">
                {goldSponsors.map((sponsor, index) => (
                  <GlassCard
                    key={sponsor.name}
                    delay={index * 0.1}
                    className="w-40 h-40 flex items-center justify-center border-yellow-500/30"
                  >
                    <div className="text-center">
                      <Building2 className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{sponsor.name}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Silver Sponsors */}
          {silverSponsors.length > 0 && (
            <div className="mb-12">
              <h3 className="text-center text-gray-300 font-semibold mb-6">Silver Sponsors</h3>
              <div className="flex justify-center gap-6 flex-wrap">
                {silverSponsors.map((sponsor, index) => (
                  <GlassCard
                    key={sponsor.name}
                    delay={index * 0.1}
                    className="w-32 h-32 flex items-center justify-center border-gray-400/30"
                  >
                    <div className="text-center">
                      <Building2 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">{sponsor.name}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Bronze Sponsors */}
          {bronzeSponsors.length > 0 && (
            <div>
              <h3 className="text-center text-orange-400 font-semibold mb-6">Bronze Sponsors</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {bronzeSponsors.map((sponsor, index) => (
                  <GlassCard
                    key={sponsor.name}
                    delay={index * 0.1}
                    className="w-24 h-24 flex items-center justify-center border-orange-500/30"
                  >
                    <div className="text-center">
                      <Building2 className="h-8 w-8 text-orange-400 mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{sponsor.name}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Sponsorship Tiers"
            subtitle="Partner with PHANTOM and grow with us"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`glass-card p-6 h-full border ${tier.borderColor} bg-gradient-to-br ${tier.color}`}>
                  <h3 className={`text-2xl font-bold ${tier.textColor} mb-4`}>
                    {tier.name}
                  </h3>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <Star className={`h-4 w-4 ${tier.textColor} shrink-0 mt-0.5`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Inquiry Form */}
      <section className="page-section">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            title="Become a Sponsor"
            subtitle="Interested in partnering with PHANTOM? Let's talk!"
          />

          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Contact Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="bg-secondary/50 border-border/50"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary/50 border-border/50"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary/50 border-border/50 min-h-[120px]"
                  placeholder="Tell us about your sponsorship interests..."
                />
              </div>

              <Button
                type="submit"
                variant="phantom"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Sponsors;
