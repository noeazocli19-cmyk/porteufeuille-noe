'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Server, Palette } from 'lucide-react';

const technologies = [
  { name: 'HTML', icon: '🌐', level: 95 },
  { name: 'CSS', icon: '🎨', level: 92 },
  { name: 'JavaScript', icon: '⚡', level: 90 },
  { name: 'TypeScript', icon: '🔷', level: 88 },
  { name: 'React.js', icon: '⚛️', level: 90 },
  { name: 'Next.js', icon: '▲', level: 88 },
  { name: 'Node.js', icon: '🟢', level: 85 },
  { name: 'Prisma', icon: '💎', level: 82 },
  { name: 'Supabase', icon: '🔥', level: 80 },
  { name: 'PostgreSQL', icon: '🐘', level: 82 },
  { name: 'PHP', icon: '🐘', level: 75 },
  { name: 'SQL', icon: '🗃️', level: 85 },
];

const stats = [
  { label: 'Lignes de code', value: '100K+', icon: Code2 },
  { label: 'Commits GitHub', value: '800+', icon: Server },
  { label: 'Projets livrés', value: '50+', icon: Layers },
  { label: 'Clients satisfaits', value: '30+', icon: Globe },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">À propos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Qui suis-je<span className="gradient-text">?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: About text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar area */}
            <div className="mb-8 flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-purple-500/30">
                  <img src="/logo.png" alt="Noé" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-[#030014] flex items-center justify-center">
                  <span className="text-[10px]">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Noé</h3>
                <p className="text-purple-400 font-medium">Développeur Full-Stack & Fondateur L'Arche Tech</p>
                <p className="text-sm text-muted-foreground mt-1">Basé au Bénin 🇧🇯</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Je suis Noé, développeur Full-Stack passionné et fondateur de L&apos;Arche Tech, une agence web premium
                basée au Bénin. Mon objectif : démocratiser l&apos;accès aux solutions digitales premium pour les
                entrepreneurs, artisans, PME et startups à travers l&apos;Afrique et au-delà.
              </p>
              <p>
                Je maîtrise l&apos;écosystème JavaScript/TypeScript de bout en bout — du frontend avec React et Next.js
                jusqu&apos;au backend avec Node.js, Prisma et les bases de données SQL. J&apos;ai déjà livré plus de 50
                projets pour des clients au Bénin et en France, allant des sites vitrines aux plateformes e-commerce
                en passant par des applications SaaS.
              </p>
              <p>
                Chaque projet est l&apos;occasion de repousser les limites et de créer des produits digitaux qui
                impressionnent visuellement, fonctionnent parfaitement et offrent une expérience fluide et mémorable.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 card-hover"
                >
                  <stat.icon className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Tech grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={item}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-xl p-4 card-hover group cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-white">{tech.name}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 + 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-right">{tech.level}%</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
