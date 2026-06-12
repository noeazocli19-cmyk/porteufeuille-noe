'use client';

import { motion } from 'framer-motion';
import {
  Monitor, Server, Plug, Database, Layers, Palette,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: 'from-purple-500 to-blue-500',
    glowColor: 'purple',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 82 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-cyan-500 to-green-500',
    glowColor: 'cyan',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 82 },
      { name: 'PHP', level: 75 },
      { name: 'REST API', level: 88 },
      { name: 'GraphQL', level: 72 },
    ],
  },
  {
    title: 'API',
    icon: Plug,
    color: 'from-blue-500 to-purple-500',
    glowColor: 'blue',
    skills: [
      { name: 'REST', level: 90 },
      { name: 'GraphQL', level: 72 },
      { name: 'WebSockets', level: 78 },
      { name: 'API Design', level: 85 },
      { name: 'Auth/JWT', level: 82 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'from-green-500 to-cyan-500',
    glowColor: 'cyan',
    skills: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'Prisma ORM', level: 85 },
      { name: 'Supabase', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'Full-Stack',
    icon: Layers,
    color: 'from-pink-500 to-purple-500',
    glowColor: 'pink',
    skills: [
      { name: 'Next.js', level: 88 },
      { name: 'Architecture', level: 82 },
      { name: 'DevOps', level: 70 },
      { name: 'Testing', level: 78 },
      { name: 'CI/CD', level: 72 },
    ],
  },
  {
    title: 'UI/UX',
    icon: Palette,
    color: 'from-orange-500 to-pink-500',
    glowColor: 'pink',
    skills: [
      { name: 'Figma', level: 80 },
      { name: 'Responsive', level: 92 },
      { name: 'Animation', level: 85 },
      { name: 'Accessibilité', level: 78 },
      { name: 'Design System', level: 82 },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background orbs */}
      <div className="absolute top-1/3 -right-32 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">Compétences</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Mon expertise<span className="gradient-text"> technique</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Des compétences solides acquises à travers de nombreux projets et une veille technologique constante.
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: j * 0.1 + 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
