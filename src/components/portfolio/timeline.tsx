'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    year: '2025 - Présent',
    title: 'Fondateur & Développeur Full-Stack',
    company: "L'Arche Tech",
    description:
      "Création de L'Arche Tech, agence web premium spécialisée dans le développement sur mesure, le SEO et l'automatisation business. Solutions digitales pour PME, artisans et startups au Bénin et en France.",
    type: 'work' as const,
  },
  {
    year: '2024 - 2025',
    title: 'Développeur Full-Stack',
    company: 'Digital Innovation',
    description:
      "Développement web & mobile, community management et design UI/UX pour des clients au Bénin. Plus de 50 projets réalisés incluant sites vitrines, applications web et stratégies marketing digital.",
    type: 'work' as const,
  },
  {
    year: '2023 - 2024',
    title: 'Développeur Web Freelance',
    company: 'Indépendant',
    description:
      "Création de plateformes web pour des clients en Afrique et en France : Artisan Connecté (marketplace), TradiBev (site vitrine événementiel). Spécialisation Next.js et React.",
    type: 'work' as const,
  },
  {
    year: '2022 - 2023',
    title: 'Formation Développeur Full-Stack',
    company: 'Auto-formation & Projets',
    description:
      'Apprentissage intensif du développement web : HTML, CSS, JavaScript, React, Next.js, Node.js et les bases de données. Réalisation de projets personnels et contribution à des projets open source.',
    type: 'education' as const,
  },
];

export function Timeline() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">Parcours</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Mon <span className="gradient-text">expérience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-2.5 sm:left-6.5 top-2 w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 ring-4 ring-[#030014]" />

                {/* Content */}
                <div className="glass rounded-xl p-5 card-hover">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === 'work' ? (
                      <Briefcase className="w-4 h-4 text-purple-400" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                    )}
                    <span className="text-xs font-mono text-muted-foreground">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-purple-400 mb-2">{item.company}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
