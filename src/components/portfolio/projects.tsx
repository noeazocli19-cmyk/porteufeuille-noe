'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean) as string[]))];

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-cyan-400 mb-2 block">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Mes projets<span className="gradient-text"> récents</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Découvrez une sélection de mes réalisations les plus marquantes.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
              className={`cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0'
                  : 'border-purple-500/20 text-muted-foreground hover:text-white hover:border-purple-500/40'
              }`}
            >
              {cat === 'all' ? 'Tous' : cat}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-bold gradient-text opacity-30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 bg-purple-500/10 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le projet
                    </Button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0 text-[10px]">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.split(',').slice(0, 4).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/20"
                      >
                        {t.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            Aucun projet dans cette catégorie.
          </motion.p>
        )}
      </div>

      {/* Project detail modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-strong max-w-3xl max-h-[85vh] overflow-y-auto border-purple-500/20">
          {selectedProject && (
            <div>
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <DialogDescription className="sr-only">{selectedProject.description}</DialogDescription>
              {/* Banner */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-7xl font-bold gradient-text opacity-40">
                      {selectedProject.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {selectedProject.title}
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedProject.longDesc || selectedProject.description}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="text-sm font-mono text-cyan-400 mb-3">Stack technique</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.split(',').map((t) => (
                    <Badge
                      key={t}
                      className="bg-purple-500/10 text-purple-400 border-purple-500/20"
                    >
                      {t.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Category */}
              {selectedProject.category && (
                <div className="mb-6">
                  <h4 className="text-sm font-mono text-cyan-400 mb-2">Catégorie</h4>
                  <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                    {selectedProject.category}
                  </Badge>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3">
                {selectedProject.liveUrl && (
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer"
                    onClick={() => window.open(selectedProject.liveUrl!, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 cursor-pointer"
                    onClick={() => window.open(selectedProject.githubUrl!, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code source
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
