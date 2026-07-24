export interface Feature {
  title: string;
  description: string;
}

export interface TimelineItem {
  phase: string;
  date: string;
  description?: string;
}

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
  problem?: string;
  solution?: string;
  features?: Feature[];
  timeline?: TimelineItem[];
}

export const projects: Project[] = [
  {
    slug: 'decko',
    name: 'Decko',
    year: '2026',
    tech: ['Vue', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/decko',
    live: null,
    shortDescription: 'AI-powered presentation generator that turns topic prompts into structured 7–10 chapter slide decks instantly.',
    description: 'An AI-integrated presentation generation platform that turns simple topic prompts (e.g., "Laravel Basics") into comprehensive 7 to 10 chapter slide decks complete with structured content and modern web slide layouts.',
    heroClass: 'bg-gradient-to-br from-zinc-800 to-black',
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300'],
    logo: '/projects/decko.png',
    problem: 'Creating presentation decks is repetitive and time-consuming. Most people spend hours structuring content, formatting slides, and organizing chapters before writing a single word of substance.',
    solution: 'Decko eliminates the blank-slide problem by letting you type a single topic prompt and instantly generating a fully structured, 7–10 chapter presentation with slide layouts ready to present or customize.',
    features: [
      {
        title: 'AI Prompt-to-Deck Generation',
        description: 'Type a single topic like "Laravel Basics" and Decko automatically structures a 7–10 chapter presentation complete with slide layouts and content scaffolding.'
      },
      {
        title: 'Live Slide Editor',
        description: 'Instant drag-and-drop slide reordering, real-time typography scaling, and clean full-screen presentation mode.'
      },
      {
        title: 'Structured Chapter Outlines',
        description: 'Each generated deck follows a logical chapter progression with intro, body, and conclusion slides, making professional presentations effortless.'
      }
    ],
    timeline: [
      { phase: 'Concept', date: 'Jan 2026', description: 'Defined core problem and AI prompt pipeline architecture' },
      { phase: 'Prototype', date: 'Feb 2026', description: 'Built first working proof-of-concept with Vue 3 and LLM API' },
      { phase: 'MVP', date: 'Mar 2026', description: 'Shipped slide editor, drag-and-drop, and export flow' },
      { phase: 'Current', date: '2026', description: 'Active development — refining AI output quality and slide templates' }
    ]
  },
  {
    slug: 'portfolio',
    name: 'Personal Portfolio',
    year: '2026',
    tech: ['NuxtJS', 'Vue', 'TypeScript', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/portfolio',
    live: null,
    shortDescription: 'Portfolio website built with modern web technologies to showcase skills and projects.',
    description: 'A heavily interactive, motion-rich personal portfolio built to showcase engineering skill and design taste through micro-animations.',
    heroClass: 'bg-gradient-to-br from-zinc-800 to-black',
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300', 'bg-gradient-to-bl from-zinc-200 to-zinc-400', 'bg-gradient-to-br from-zinc-100 to-zinc-200'],
    problem: 'Generic portfolio templates feel impersonal and fail to demonstrate real engineering depth. Most developer portfolios are just a resume in HTML with no distinct character or proof of front-end craft.',
    solution: 'Built a fully custom portfolio from scratch — designed as a design system showcase in itself. Every detail from scroll physics to typography was a deliberate engineering and aesthetic decision.',
    features: [
      {
        title: 'Magnetic Hover Directive',
        description: 'Custom Vue directive applying spring physics to interactive elements, creating a premium magnetic pull effect on interactive UI components.'
      },
      {
        title: '0px Bento Grid Matrix',
        description: 'Shared-border grid system inspired by Linear and developer tools, with hover tilt effects and precision layout control across breakpoints.'
      },
      {
        title: 'SSR-Safe Plugin Architecture',
        description: 'Dual client/server plugin architecture ensuring zero flash-of-unstyled-content and crash-free SSR hydration in production deployments.'
      },
      {
        title: 'Nuxt Content Blog Engine',
        description: 'Full Markdown-powered blog system with syntax highlighting, custom callout boxes, sticky TOC, and reading progress bar.'
      }
    ],
    timeline: [
      { phase: 'Design', date: 'Jun 2026', description: 'Color system, typography scale, and Bento grid layout definition' },
      { phase: 'Core Build', date: 'Jul 2026', description: 'Built all sections, animations, and SSR plugin architecture' },
      { phase: 'Blog Engine', date: 'Jul 2026', description: 'Added Nuxt Content blog with custom Shiki highlighting and callouts' },
      { phase: 'Current', date: '2026', description: 'Continuously polishing design and adding content' }
    ]
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
    galleryClasses: ['bg-gradient-to-tr from-indigo-50 to-purple-100', 'bg-gradient-to-bl from-indigo-100 to-purple-200', 'bg-gradient-to-br from-purple-50 to-indigo-100'],
    problem: 'Existing donation tools (Trakteer, Saweria) are closed platforms with rigid layouts. Streamers and creators need a self-hosted, fully customizable donation experience with real-time overlays for their streams.',
    solution: 'Zavo is a self-hostable full-stack donation platform where creators own their data. Built with end-to-end type safety, real-time WebSocket overlays, and a native Xendit payment gateway integration.',
    features: [
      {
        title: 'Real-Time Stream Overlays',
        description: 'WebSocket event emitter broadcasts instant donation alerts to creator OBS/Streamlabs overlays with zero-latency notification delivery.'
      },
      {
        title: 'End-to-End Type Safety',
        description: 'tRPC connects the Next.js frontend to the backend with 100% shared TypeScript types — no runtime API contract mismatches.'
      },
      {
        title: 'Xendit Payment Integration',
        description: 'Automated donation webhooks and creator payout processing via the Xendit payment gateway with idempotent transaction handling.'
      }
    ],
    timeline: [
      { phase: 'Design', date: 'Aug 2025', description: 'Defined creator experience, overlay system, and payment flow' },
      { phase: 'Backend', date: 'Sep 2025', description: 'Built tRPC API, Drizzle schema, and Xendit webhook integration' },
      { phase: 'Real-Time Layer', date: 'Oct 2025', description: 'Implemented WebSocket overlay broadcasting system' },
      { phase: 'Current', date: '2025', description: 'Feature complete — in private testing with creators' }
    ]
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
    galleryClasses: ['bg-gradient-to-tr from-emerald-50 to-teal-100', 'bg-gradient-to-bl from-emerald-100 to-teal-200', 'bg-gradient-to-br from-teal-50 to-emerald-100'],
    problem: 'Indonesian content creators lack a local-first, low-latency monetization platform that handles high-concurrency content drops without third-party intermediaries eating into their revenue.',
    solution: 'Patungan is a high-throughput content monetization platform powered by Laravel Octane + Swoole, enabling thousands of concurrent users to participate in content drops with real-time event broadcasting and automated payout pipelines.',
    features: [
      {
        title: 'High-Throughput Octane Engine',
        description: 'Sub-10ms response times for high-concurrency content drops, powered by Laravel Octane with Swoole for persistent worker memory.'
      },
      {
        title: 'Real-Time Broadcasting via Reverb',
        description: "Laravel Reverb acts as the first-party WebSocket server handling thousands of concurrent listeners across creator channels."
      },
      {
        title: 'Automated Payout Pipeline',
        description: 'Queue-based Xendit payment disbursement with automatic retry logic, Redis locking, and idempotent transaction guarantees.'
      }
    ],
    timeline: [
      { phase: 'Architecture', date: 'Sep 2024', description: 'Designed Octane, Reverb, and Redis queue infrastructure' },
      { phase: 'Core Platform', date: 'Oct 2024', description: 'Built creator dashboard, payment processing, and content gating' },
      { phase: 'Broadcasting', date: 'Nov 2024', description: 'Integrated Reverb WebSocket layer with real-time event system' },
      { phase: 'Current', date: '2024', description: 'Stable MVP — exploring multi-creator support features' }
    ]
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
    galleryClasses: ['bg-gradient-to-tr from-blue-50 to-cyan-100', 'bg-gradient-to-bl from-blue-100 to-cyan-200', 'bg-gradient-to-br from-cyan-50 to-blue-100'],
    problem: 'Most expense tracking apps feel bloated or require cloud accounts. There is no simple, fast, self-hostable tracker with a developer-grade type-safe API and optimistic UI interactions.',
    solution: 'Bux is a lean, self-hostable expense tracker built on the T3 stack. It prioritizes instant feedback with optimistic UI mutations, a fully type-safe API surface, and clean spending visualizations.',
    features: [
      {
        title: 'Optimistic Expense Tracking',
        description: 'Transactions reflect instantly in the UI before server confirmation with automatic rollback on error — zero perceived latency.'
      },
      {
        title: 'Visual Spending Analytics',
        description: 'Interactive category distribution charts and monthly spending velocity breakdowns for clear financial insight.'
      },
      {
        title: 'Full Type-Safe Stack',
        description: 'tRPC + Drizzle + PostgreSQL deliver a fully typed data pipeline from schema to UI component with zero runtime type errors.'
      }
    ],
    timeline: [
      { phase: 'Design', date: 'Mar 2025', description: 'Defined data model, category system, and UI layout' },
      { phase: 'API Layer', date: 'Apr 2025', description: 'Built tRPC routers, Drizzle schema, and PostgreSQL migrations' },
      { phase: 'UI Build', date: 'Apr 2025', description: 'Implemented optimistic mutations and spending chart components' },
      { phase: 'Current', date: '2025', description: 'Feature complete — personal daily use and iterating on UX' }
    ]
  }
];
