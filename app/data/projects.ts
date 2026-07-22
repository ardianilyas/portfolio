export interface ArchitectureSpec {
  label: string;
  value: string;
  detail: string;
}

export interface FeatureHighlight {
  title: string;
  description: string;
  codeSnippet?: string;
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
  architectureSpecs?: ArchitectureSpec[];
  featureHighlights?: FeatureHighlight[];
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
    architectureSpecs: [
      { label: 'Core Engine', value: 'Vue 3 + Composition API', detail: 'Fast client-side reactivity and slide state management' },
      { label: 'AI Integration', value: 'LLM Chapter Pipeline', detail: 'Generates structured 7–10 chapter outlines from a single prompt' },
      { label: 'Design System', value: 'TailwindCSS + Motion', detail: 'Fluid layout rendering for responsive slide decks' }
    ],
    featureHighlights: [
      {
        title: 'AI Prompt to Slide Deck Generator',
        description: 'Type a single topic like "Laravel Basics" and Decko automatically structures a 7–10 chapter presentation complete with slide layouts.',
        codeSnippet: `const prompt = "Laravel Basics"\nconst deck = await decko.generateDeck(prompt)\n// Output: 8 chapters generated with custom slide layouts`
      },
      {
        title: 'Live Slide Editor & State Sync',
        description: 'Instant drag-and-drop slide reordering, real-time typography scaling, and clean presentation mode.'
      }
    ]
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
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300', 'bg-gradient-to-bl from-zinc-200 to-zinc-400', 'bg-gradient-to-br from-zinc-100 to-zinc-200'],
    architectureSpecs: [
      { label: 'Framework', value: 'Nuxt 4 / Vue 3', detail: 'Hybrid SSR and client-side page rendering' },
      { label: 'Design Language', value: 'Linear-Style / 0px Bento', detail: 'Dark green accents (#0F3F2F) with precision grid matrix' },
      { label: 'Animation Engine', value: 'Custom Micro-Physics', detail: 'Magnetic hover directives, scroll-reveal prose, and ambient SVG' }
    ],
    featureHighlights: [
      {
        title: 'SSR Directive & Plugin Safety',
        description: 'Dual client/server plugin architecture ensuring 0ms FOUC and crash-free production deployments.',
        codeSnippet: `// app/plugins/magnetic.client.ts + magnetic.server.ts\nexport default defineNuxtPlugin((nuxtApp) => {\n  // Safe SSR hydration with client-side physics\n})`
      },
      {
        title: '0px Bento Grid Matrix',
        description: 'Shared-border grid matrix inspired by Linear and developer tools with hover tilt effects.'
      }
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
    architectureSpecs: [
      { label: 'API Layer', value: 'End-to-End tRPC', detail: '100% type-safe data fetching from server to client' },
      { label: 'Database & ORM', value: 'PostgreSQL + Drizzle', detail: 'Blazing fast queries with zero runtime overhead' },
      { label: 'Payment Gateway', value: 'Xendit Integration', detail: 'Automated donation webhooks and payout processing' }
    ],
    featureHighlights: [
      {
        title: 'Real-Time Stream Overlays',
        description: 'WebSocket event emitter broadcasting instant donation alerts on creator OBS/Streamlabs overlays.',
        codeSnippet: `const trpc = createTRPCNext<AppRouter>()\nconst { data } = trpc.donations.onDonate.useSubscription()`
      },
      {
        title: 'Type-Safe Financial Schema',
        description: 'Rigid transactional database constraints ensuring 100% ledger accuracy for creator earnings.'
      }
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
    architectureSpecs: [
      { label: 'Backend Core', value: 'Laravel + Octane', detail: 'High-throughput asynchronous PHP runtime powered by Swoole' },
      { label: 'Real-Time Broadcast', value: 'Laravel Reverb', detail: 'First-party WebSocket server handling thousands of concurrent listeners' },
      { label: 'Queue Infrastructure', value: 'Redis + Horizon', detail: 'Asynchronous job processing for video transcoding and payments' }
    ],
    featureHighlights: [
      {
        title: 'High-Throughput Octane Engine',
        description: 'Sub-10ms response times for high-concurrency content drops and creator broadcasts.',
        codeSnippet: `// config/octane.php\n'server' => 'swoole',\n'workers' => 16,`
      },
      {
        title: 'Automated Payout Pipeline',
        description: 'Queue-based Xendit payment disbursement with automatic retry logic and Redis locking.'
      }
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
    architectureSpecs: [
      { label: 'Stack', value: 'Next.js + tRPC + Drizzle', detail: 'Server Actions and Optimistic UI for instant feedback' },
      { label: 'Database', value: 'PostgreSQL', detail: 'Normalized schema for transaction categories and monthly budgets' },
      { label: 'State Sync', value: 'TanStack Query', detail: 'Instant UI mutations with background revalidation' }
    ],
    featureHighlights: [
      {
        title: 'Optimistic Expense Tracking',
        description: 'Transactions reflect instantly in UI before server confirmation with automatic rollback on error.',
        codeSnippet: `const mutate = trpc.expenses.add.useMutation({\n  onMutate: async (newExpense) => {\n    // Optimistically update local query cache\n  }\n})`
      },
      {
        title: 'Visual Spending Analytics',
        description: 'Interactive category distribution charts and monthly spending velocity breakdowns.'
      }
    ]
  }
];
