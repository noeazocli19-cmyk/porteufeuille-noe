'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onAdminOpen: () => void;
}

export function Navigation({ onAdminOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-purple-500/5' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Noé" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-bold gradient-text hidden sm:block">
            Noé
          </span>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                activeSection === item.href.replace('#', '')
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activeSection === item.href.replace('#', '') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-md bg-white/5"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Admin button */}
          <motion.button
            onClick={onAdminOpen}
            className="p-2 rounded-lg text-muted-foreground hover:text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Admin"
          >
            <Shield className="w-4 h-4" />
          </motion.button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-strong w-72 border-purple-500/20">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollTo(item.href)}
                    className={`text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
