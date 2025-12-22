import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import phantomLogo from "@/assets/phantom-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Roster", path: "/roster" },
    { name: "Schedule", path: "/schedule" },
    { name: "Join Us", path: "/join" },
  ];

  const moreLinks = [
    { name: "Gallery", path: "/gallery" },
    { name: "News", path: "/news" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Jersey", path: "/jersey" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="glass-nav py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src={phantomLogo} alt="PHANTOM" className="h-12 w-auto" />
                <span className="font-outfit font-bold text-2xl gradient-text">
                  PHANTOM
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ultimate Frisbee team based in [CITY, COUNTRY]. Playing with spirit, competing with passion.
              </p>
              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">More</h4>
              <ul className="space-y-2">
                {moreLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href="mailto:team@phantomultimate.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  <Mail className="h-4 w-4" />
                  team@phantomultimate.com
                </a>
                <p className="text-muted-foreground text-sm">
                  [CITY, COUNTRY]
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © {new Date().getFullYear()} PHANTOM Ultimate Frisbee. All rights reserved.
              </p>
              <p className="text-muted-foreground/60 text-xs">
                Spirit of the Game™
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
