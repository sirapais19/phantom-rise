import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/teamData";
import { useToast } from "@/hooks/use-toast";

const JoinUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "beginner",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Application Submitted!",
      description: "We'll get back to you soon about tryouts.",
    });
    
    setFormData({ name: "", email: "", phone: "", experience: "beginner", message: "" });
    setIsSubmitting(false);
  };

  const trainingInfo = [
    { icon: Clock, label: "Schedule", value: "Tuesday & Thursday, 6:00 PM - 8:00 PM" },
    { icon: MapPin, label: "Location", value: "[CITY] Sports Complex, Field 3" },
    { icon: Users, label: "All Levels", value: "Beginners to Advanced Players Welcome" },
  ];

  const whatToBring = [
    "Athletic cleats (soccer or football cleats work great)",
    "Comfortable athletic clothing",
    "Water bottle",
    "Positive attitude and willingness to learn",
    "Sunscreen (for outdoor sessions)",
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
              Join PHANTOM
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to be part of something amazing? We're looking for players who share our passion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Training Info */}
      <section className="section-container -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {trainingInfo.map((info, index) => (
            <GlassCard key={info.label} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-semibold text-foreground">{info.value}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Map Placeholder & What to Bring */}
      <section className="page-section">
        <div className="section-container grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Training Location</h3>
            <GlassCard className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Map Embed Placeholder</p>
                <p className="text-sm text-muted-foreground mt-2">[CITY] Sports Complex</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* What to Bring */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">What to Bring</h3>
            <GlassCard>
              <ul className="space-y-4">
                {whatToBring.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Tryout Sign-up Form */}
      <section className="page-section">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            title="Sign Up for Tryouts"
            subtitle="Fill out the form below and we'll contact you with details"
          />
          
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
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
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-secondary/50 border-border/50"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level *</Label>
                  <select
                    id="experience"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-10 rounded-lg bg-secondary/50 border border-border/50 px-3 text-foreground"
                  >
                    <option value="beginner">Beginner - New to Ultimate</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="advanced">Advanced - Competitive experience</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about yourself</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary/50 border-border/50 min-h-[100px]"
                  placeholder="Any relevant sports background, what attracted you to Ultimate, etc."
                />
              </div>

              <Button
                type="submit"
                variant="phantom"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="section-container max-w-2xl mx-auto">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about joining"
          />
          
          <GlassCard className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/30">
                  <AccordionTrigger className="text-foreground hover:text-primary">
                    <span className="flex items-center gap-2 text-left">
                      <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="section-container">
          <GlassCard className="text-center p-8 md:p-12 glow-border">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Have more questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Reach out to us directly and we'll be happy to help you get started!
            </p>
            <Button asChild variant="phantom" size="lg">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                Message Us on WhatsApp
              </a>
            </Button>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default JoinUs;
