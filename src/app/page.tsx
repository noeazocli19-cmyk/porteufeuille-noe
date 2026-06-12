'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader } from '@/components/portfolio/loader';
import { CustomCursor } from '@/components/portfolio/custom-cursor';
import { AnimatedBackground } from '@/components/portfolio/animated-background';
import { Navigation } from '@/components/portfolio/navigation';
import { Hero } from '@/components/portfolio/hero';
import { About } from '@/components/portfolio/about';
import { Skills } from '@/components/portfolio/skills';
import { Projects } from '@/components/portfolio/projects';
import { Services } from '@/components/portfolio/services';
import { Timeline } from '@/components/portfolio/timeline';
import { Terminal } from '@/components/portfolio/terminal';
import { Testimonials } from '@/components/portfolio/testimonials';
import { Contact } from '@/components/portfolio/contact';
import { Footer } from '@/components/portfolio/footer';
import { AdminPanel } from '@/components/portfolio/admin-panel';
import type { Project, Testimonial } from '@/types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      // Use static testimonials for now (could be from DB)
      setTestimonials([
        {
          id: '1',
          name: 'Yoan Melson DANSOU',
          role: 'CEO',
          company: 'FuturCraft Institut',
          content: 'Noé est un développeur exceptionnel qui comprend parfaitement les enjeux numériques. Son travail sur notre plateforme a dépassé toutes nos attentes. Je le recommande vivement.',
          rating: 5,
          order: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Hermann Richy',
          role: 'Fondateur',
          company: 'Cefora Formation',
          content: 'Travailler avec Noé a été une expérience remarquable. Il livre un code propre, performant et toujours dans les délais. Un vrai professionnel du développement web.',
          rating: 5,
          order: 1,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Amina K.',
          role: 'Gérante',
          company: 'TradiBev',
          content: 'Noé a créé un site vitrine magnifique pour notre entreprise de boissons traditionnelles. Le design est élégant, la navigation fluide et nos clients adorent l\'expérience.',
          rating: 5,
          order: 2,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  }, []);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching on mount
    fetchProjects();
    fetchTestimonials();
  }, [fetchProjects, fetchTestimonials]);

  return (
    <div className="relative min-h-screen">
      {/* Loader */}
      <Loader />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Animated background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navigation onAdminOpen={() => setAdminOpen(true)} />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Services />
        <Timeline />
        <Terminal />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin panel */}
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        projects={projects}
        onProjectsChange={fetchProjects}
      />
    </div>
  );
}
