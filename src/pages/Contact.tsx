import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/phantom.ultees" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <PageLayout>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold gradient-text mb-6">Contact Us</motion.h1>
          <p className="text-xl text-muted-foreground">Get in touch with PHANTOM</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-container grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading title="Send a Message" centered={false} />
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Name *</Label><Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary/50" /></div>
                  <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary/50" /></div>
                </div>
                <div className="space-y-2"><Label>Subject</Label><Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="bg-secondary/50" /></div>
                <div className="space-y-2"><Label>Message *</Label><Textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-secondary/50 min-h-[120px]" /></div>
                <Button type="submit" variant="phantom" size="lg" className="w-full" disabled={isSubmitting}><Send className="h-4 w-4 mr-2" />{isSubmitting ? "Sending..." : "Send Message"}</Button>
              </form>
            </GlassCard>
          </div>

          <div className="space-y-8">
            <GlassCard><div className="flex items-start gap-4"><Mail className="h-6 w-6 text-primary" /><div><p className="text-sm text-muted-foreground">Email</p><a href="mailto:team@phantomultimate.com" className="text-foreground hover:text-primary">team@phantomultimate.com</a></div></div></GlassCard>
            <GlassCard><div className="flex items-start gap-4"><MapPin className="h-6 w-6 text-primary" /><div><p className="text-sm text-muted-foreground">Location</p><p className="text-foreground">[JOHOR, MALAYSIA]</p></div></div></GlassCard>
            <GlassCard><h3 className="font-semibold mb-4">Follow Us</h3><div className="flex gap-3">{socials.map((s) => (<a key={s.label} href={s.href} className="p-3 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-all"><s.icon className="h-5 w-5" /></a>))}</div></GlassCard>
            <GlassCard className="aspect-video flex items-center justify-center"><MapPin className="h-12 w-12 text-primary" /><p className="text-muted-foreground ml-4">Map Placeholder</p></GlassCard>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
