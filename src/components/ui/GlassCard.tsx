import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const GlassCard = ({ children, className, hover = true, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" } : undefined}
      className={cn(
        "glass-card p-6 transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
