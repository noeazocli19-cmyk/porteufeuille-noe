'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';

// TikTok SVG icon since Lucide doesn't have one
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52V6.94a4.85 4.85 0 01-1-.25z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/noeazocli19-cmyk', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/digitaux-aze-3b951a410/', label: 'LinkedIn' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@digitaux.no', label: 'TikTok' },
  { icon: Mail, href: 'mailto:noeazocli19@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+33156161619', label: 'Téléphone' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-purple-500/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src="/logo.png" alt="Noé" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold gradient-text">Noé</span>
          </motion.div>

          {/* Social links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-purple-400 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            &copy; {currentYear} Noé. Tous droits réservés. Fait avec{' '}
            <Heart className="w-3 h-3 inline-block text-red-400 fill-red-400" /> et beaucoup de café.
          </p>
        </div>
      </div>
    </footer>
  );
}
