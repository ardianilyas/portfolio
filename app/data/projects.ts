export interface Project {
  slug: string;
  name: string;
  year: string;
  tech: string[];
  github: string;
  live: string | null;
  shortDescription: string;
  description: string;
  heroClass: string;
  galleryClasses: string[];
  logo?: string;
}

export const projects: Project[] = [
  {
    slug: 'decko',
    name: 'Decko',
    year: '2026',
    tech: ['Vue', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/decko',
    live: null,
    shortDescription: 'Presentation and slide deck builder with modern web technologies.',
    description: 'A presentation tool built for the modern web.',
    heroClass: 'bg-gradient-to-br from-zinc-800 to-black',
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300'],
    logo: '/projects/decko.png'
  },
  {
    slug: 'portfolio',
    name: 'Personal Portfolio',
    year: '2026',
    tech: ['NuxtJS', 'Vue', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/portfolio',
    live: null,
    shortDescription: 'Portfolio website built with modern web technologies to showcase skills and projects.',
    description: 'A heavily interactive, motion-rich personal portfolio built to showcase engineering skill and design taste through micro-animations.',
    heroClass: 'bg-gradient-to-br from-zinc-800 to-black',
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300', 'bg-gradient-to-bl from-zinc-200 to-zinc-400', 'bg-gradient-to-br from-zinc-100 to-zinc-200']
  },
  {
    slug: 'zavo',
    name: 'Zavo — Donation Platform',
    year: '2025',
    tech: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL', 'Xendit'],
    github: 'https://github.com/ardianilyas/zavo',
    live: null,
    shortDescription: 'Full-stack donation platform with real-time updates, payment integration, and type-safe API layer.',
    description: 'Full-stack donation platform tailored for creators, featuring real-time stream overlays, payment integration, and a type-safe API layer.',
    heroClass: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    galleryClasses: ['bg-gradient-to-tr from-indigo-50 to-purple-100', 'bg-gradient-to-bl from-indigo-100 to-purple-200', 'bg-gradient-to-br from-purple-50 to-indigo-100']
  },
  {
    slug: 'patungan',
    name: 'Patungan — Content Monetization',
    year: '2024',
    tech: ['Laravel', 'Xendit', 'Reverb', 'Octane', 'Redis'],
    github: 'https://github.com/ardianilyas/patungan',
    live: null,
    shortDescription: 'Content monetization platform with real-time broadcasting, queue-based processing, and payment gateway.',
    description: 'Content monetization platform with real-time broadcasting, queue-based background processing, and a robust payment gateway architecture.',
    heroClass: 'bg-gradient-to-br from-emerald-900 to-teal-900',
    galleryClasses: ['bg-gradient-to-tr from-emerald-50 to-teal-100', 'bg-gradient-to-bl from-emerald-100 to-teal-200', 'bg-gradient-to-br from-teal-50 to-emerald-100']
  },
  {
    slug: 'bux',
    name: 'Bux — Expense Tracker',
    year: '2025',
    tech: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL'],
    github: 'https://github.com/ardianilyas/bux',
    live: null,
    shortDescription: 'Expense tracking application with type-safe API, real-time data fetching, and clean UI.',
    description: 'Expense tracking application focused on performance, featuring a fully type-safe API, optimistic UI updates, and clean data visualization.',
    heroClass: 'bg-gradient-to-br from-blue-900 to-cyan-900',
    galleryClasses: ['bg-gradient-to-tr from-blue-50 to-cyan-100', 'bg-gradient-to-bl from-blue-100 to-cyan-200', 'bg-gradient-to-br from-cyan-50 to-blue-100']
  }
];
