const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  console.log("Seeding database...");
  await db.project.deleteMany({});

  const projects = [
    {
      title: "Artisan Connecte",
      slug: "artisan-connecte",
      description: "Plateforme premium connectant les clients avec les meilleurs artisans a travers l Afrique.",
      longDesc: "Artisan Connecte est une plateforme marketplace premium qui connecte les clients avec les meilleurs artisans verifies a travers l Afrique. Plomberie, electricite, menuiserie, peinture, serrurerie, maconnerie, climatisation, nettoyage.",
      image: "/projects/artisan.png",
      tech: "Next.js, React, Tailwind CSS, PWA, Lucide Icons",
      category: "Marketplace",
      liveUrl: "https://artisan-nine-sigma.vercel.app/",
      githubUrl: "",
      featured: true,
      order: 1,
    },
    {
      title: "TradiBev",
      slug: "tradibev",
      description: "Site vitrine pour boissons traditionnelles artisanales et service de catering pour evenements en France.",
      longDesc: "TradiBev est un site vitrine elegant pour une entreprise de boissons traditionnelles artisanales ouest-africaines destinees aux evenements en France. 24 recettes traditionnelles.",
      image: "/projects/tradibev.png",
      tech: "Next.js, Tailwind CSS, CSS Animations, Responsive Design",
      category: "Site Vitrine",
      liveUrl: "https://tradibev-6wn5.vercel.app/",
      githubUrl: "",
      featured: true,
      order: 2,
    },
    {
      title: "Digital Innovation",
      slug: "digital-innovation",
      description: "Agence web et marketing digital a Cotonou, Benin. Community management, design UI/UX, copywriting et developpement web et mobile.",
      longDesc: "Digital Innovation est une agence web et marketing digital basee a Cotonou au Benin. Services : community management, design graphique, UI/UX, copywriting, developpement web et mobile.",
      image: "/projects/digitalinnovation.png",
      tech: "React, Next.js, Node.js, Figma, Tailwind CSS, GitHub",
      category: "Agence Web",
      liveUrl: "https://digitalinnovationbj.vercel.app/",
      githubUrl: "",
      featured: true,
      order: 3,
    },
    {
      title: "L Arche Tech",
      slug: "l-arche-tech",
      description: "Agence web premium specialisee dans le developpement sur mesure, le SEO et l automatisation business.",
      longDesc: "L Arche Tech est une agence web premium qui democratise l acces aux solutions digitales pour les entreprises, artisans, PME et startups. Services : developpement web, SEO, automatisation business, optimisation UX/UI.",
      image: "/projects/larchetech.png",
      tech: "Next.js, React, TypeScript, Tailwind CSS, Prisma, Stripe",
      category: "Agence Web",
      liveUrl: "https://l-arche-tech.vercel.app/",
      githubUrl: "",
      featured: true,
      order: 4,
    },
  ];

  for (const project of projects) {
    await db.project.create({ data: project });
    console.log("Created: " + project.title);
  }
  console.log("Seeding complete!");
}

seed().catch(console.error).finally(() => db.$disconnect());
