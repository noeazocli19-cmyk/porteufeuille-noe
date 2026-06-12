import { db } from '../src/lib/db';

async function seed() {
  console.log('🌱 Seeding database with real projects...');

  // Delete existing projects
  await db.project.deleteMany({});

  const projects = [
    {
      title: 'Artisan Connecté',
      slug: 'artisan-connecte',
      description: 'Plateforme premium connectant les clients avec les meilleurs artisans à travers l\'Afrique. Plomberie, électricité, menuiserie, peinture et plus encore.',
      longDesc: 'Artisan Connecté est une plateforme marketplace premium qui connecte les clients avec les meilleurs artisans vérifiés à travers l\'Afrique. Couvrant plus de 8 catégories de services (plomberie, électricité, menuiserie, peinture, serrurerie, maçonnerie, climatisation, nettoyage), elle offre un service vérifié avec paiement sécurisé et satisfaction garantie. Développée en tant que PWA (Progressive Web App) avec support du mode sombre et une interface fluide et responsive.',
      image: '/projects/artisan.png',
      tech: 'Next.js, React, Tailwind CSS, PWA, Lucide Icons',
      category: 'Marketplace',
      liveUrl: 'https://artisan-nine-sigma.vercel.app/',
      githubUrl: '',
      featured: true,
      order: 1,
    },
    {
      title: 'TradiBev',
      slug: 'tradibev',
      description: 'Site vitrine pour boissons traditionnelles artisanales et service de catering pour événements en France. 24 recettes traditionnelles ouest-africaines.',
      longDesc: 'TradiBev est un site vitrine élégant pour une entreprise de boissons traditionnelles artisanales ouest-africaines destinées aux événements en France. Le site présente un catalogue de 24 recettes traditionnelles (Bissap Rouge, Gingembre Frais, Lait de Baobab, Tamarin Pimenté...), des services pour mariages, événements corporate et célébrations privées, ainsi qu\'un système de réservation et témoignages clients. Design premium avec carousel, effets de gradient et formulaires de contact.',
      image: '/projects/tradibev.png',
      tech: 'Next.js, Tailwind CSS, CSS Animations, Responsive Design',
      category: 'Site Vitrine',
      liveUrl: 'https://tradibev-6wn5.vercel.app/',
      githubUrl: '',
      featured: true,
      order: 2,
    },
    {
      title: 'Digital Innovation',
      slug: 'digital-innovation',
      description: 'Agence web et marketing digital à Cotonou, Bénin. Community management, design UI/UX, copywriting et développement web & mobile.',
      longDesc: 'Digital Innovation est une agence web et marketing digital basée à Cotonou au Bénin, spécialisée dans la transformation numérique des entrepreneurs, TPE, PME et startups. Services : community management, design graphique & UI/UX, copywriting & ghostwriting, et développement web & mobile. Le site présente un portfolio de projets réalisés, un blog technique, une section FAQ et un processus de travail en 6 étapes. 50+ projets réalisés, 30+ clients satisfaits.',
      image: '/projects/digitalinnovation.png',
      tech: 'React, Next.js, Node.js, Figma, Tailwind CSS, GitHub',
      category: 'Agence Web',
      liveUrl: 'https://digitalinnovationbj.vercel.app/',
      githubUrl: '',
      featured: true,
      order: 3,
    },
    {
      title: 'L\'Arche Tech',
      slug: 'l-arche-tech',
      description: 'Agence web premium spécialisée dans le développement sur mesure, le SEO et l\'automatisation business. Solutions digitales pour PME et startups.',
      longDesc: 'L\'Arche Tech est une agence web premium qui démocratise l\'accès aux solutions digitales premium pour les entreprises, artisans, PME et startups. Services : développement web sur mesure, sites vitrines, applications web, SEO, automatisation business et optimisation UX/UI. Le portfolio présente 6 projets (Maison Élixir, Analytix Pro, Le Petit Bistrot, ImmoVision, FitCoach, Annuaire Local) couvrant l\'e-commerce, SaaS, restauration, immobilier et fitness. Processus de travail en 6 étapes de la découverte à la maintenance.',
      image: '/projects/larchetech.png',
      tech: 'Next.js, React, TypeScript, Tailwind CSS, Prisma, Stripe',
      category: 'Agence Web',
      liveUrl: 'https://l-arche-tech.vercel.app/',
      githubUrl: '',
      featured: true,
      order: 4,
    },
  ];

  for (const project of projects) {
    await db.project.create({ data: project });
    console.log(`✅ Created project: ${project.title}`);
  }

  console.log('🎉 Seeding complete!');
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
