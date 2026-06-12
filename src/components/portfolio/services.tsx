'use client';

import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Wrench, Lightbulb, Rocket } from 'lucide-react';

const services = [
  {
    title: 'Développement Frontend',
    description:
      'Création d\'interfaces modernes, réactives et accessibles avec React, Next.js et les dernières technologies du web. Chaque pixel compte pour une expérience utilisateur parfaite.',
    icon: Code2,
    color: 'from-purple-500 to-blue-500',
  },
  {
    title: 'Développement Backend',
    description:
      'Conception d\'APIs robustes et performantes avec Node.js, Express et Prisma. Architecture scalable et sécurisée pour supporter la croissance de votre application.',
    icon: Globe,
    color: 'from-cyan-500 to-green-500',
  },
  {
    title: 'Applications Mobile',
    description:
      'Développement d\'applications web mobile-first et progressives. Expérience fluide et native sur tous les appareils, du smartphone à la tablette.',
    icon: Smartphone,
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Applications Full-Stack',
    description:
      'Solutions complètes de bout en bout, du design à la mise en production. Base de données, API, frontend et déploiement — un interlocuteur unique pour votre projet.',
    icon: Wrench,
    color: 'from-pink-500 to-purple-500',
  },
  {
    title: 'Consulting Technique',
    description:
      'Audit de code, architecture technique, choix technologiques et optimisation de performances. Je vous accompagne dans les décisions stratégiques de votre produit.',
    icon: Lightbulb,
    color: 'from-orange-500 to-pink-500',
  },
  {
    title: 'Refonte & Optimisation',
    description:
      'Modernisation d\'applications existantes, migration vers de nouvelles technologies, optimisation SEO et performances. Donnez une seconde jeunesse à votre produit.',
    icon: Rocket,
    color: 'from-green-500 to-cyan-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Ce que je <span className="gradient-text">propose</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Des services sur mesure pour donner vie à vos projets digitaux, de la conception au déploiement.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
