export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc?: string | null;
  image?: string | null;
  images?: string | null;
  tech: string;
  category?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  content: string;
  avatar?: string | null;
  rating: number;
  order: number;
  createdAt: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'api' | 'database' | 'fullstack' | 'uiux';
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'work' | 'education';
}
