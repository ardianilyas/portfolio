<template>
  <div class="project-detail-page bg-[var(--color-bg)] min-h-screen relative" v-if="project">
    
    <!-- Floating Back Button -->
    <NuxtLink 
      to="/" 
      class="fixed top-6 left-6 md:top-10 md:left-10 z-[100] flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 group cursor-pointer backdrop-blur-md"
      :class="isScrolledPastHero ? 'border-black/10 bg-black/5 text-black hover:bg-black/10' : 'border-white/30 bg-white/10 text-white hover:bg-white/20'"
    >
      <svg class="transition-transform group-hover:-translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </NuxtLink>

    <!-- Main Visual Hero -->
    <header class="hero-visual relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-end">
      <!-- Background Visual (Placeholder for Project Image) -->
      <div class="absolute inset-0 z-0" :style="parallaxStyle">
        <div class="w-full h-full object-cover" :class="project.heroClass"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10 pb-12">
        <h1 class="font-sans text-[clamp(48px,8vw,120px)] font-bold tracking-tighter leading-[0.9] mb-6 text-[var(--color-text)] fade-up fade-up-1">
          {{ project.name }}
        </h1>
        <p class="font-sans text-[clamp(20px,2vw,28px)] font-medium text-[var(--color-text-2)] max-w-3xl leading-snug fade-up fade-up-2">
          {{ project.description }}
        </p>
      </div>
    </header>

    <!-- Project Details Grid -->
    <section class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <div class="flex flex-col gap-12 md:gap-20">
        
        <!-- Metadata -->
        <div class="flex flex-col md:flex-row gap-10 md:gap-20 border-t border-[var(--color-border)] pt-12 items-start justify-between fade-up fade-up-3">
          <div class="flex flex-col md:flex-row gap-10 md:gap-24 flex-1">
            <div class="shrink-0">
              <h4 class="meta-label">Timeline</h4>
              <p class="meta-value">{{ project.year }}</p>
            </div>
            <div>
              <h4 class="meta-label">Stack</h4>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-for="t in project.tech" :key="t" class="tech-tag">{{ t }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 mt-4 md:mt-0">
            <a v-if="project.live" :href="project.live" target="_blank" class="action-btn action-btn--primary">
              View Live Site
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
            <a v-if="project.github" :href="project.github" target="_blank" class="action-btn action-btn--secondary">
              Source Code
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>

        <!-- Visual Gallery -->
        <div class="flex flex-col gap-6 w-full fade-up fade-up-4">
          <div class="gallery-img-wrap rounded-[20px] md:rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-[21/9] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div class="w-full h-full" :class="project.galleryClasses[0]"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="gallery-img-wrap rounded-[20px] md:rounded-[32px] overflow-hidden aspect-square md:aspect-[16/9] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div class="w-full h-full" :class="project.galleryClasses[1]"></div>
            </div>
            <div class="gallery-img-wrap rounded-[20px] md:rounded-[32px] overflow-hidden aspect-square md:aspect-[16/9] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div class="w-full h-full" :class="project.galleryClasses[2]"></div>
            </div>
          </div>
        </div>

        <!-- Project Pagination -->
        <div class="flex flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-[var(--color-border)] w-full fade-up fade-up-5">
          <!-- Previous Button -->
          <NuxtLink 
            v-if="prevProject" 
            :to="'/projects/' + prevProject.slug" 
            class="pagination-btn group text-left"
          >
            <span class="pagination-label">
              <svg class="transition-transform group-hover:-translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Prev
            </span>
            <span class="pagination-title">{{ prevProject.name }}</span>
          </NuxtLink>
          <div v-else></div>

          <!-- Next Button -->
          <NuxtLink 
            v-if="nextProject" 
            :to="'/projects/' + nextProject.slug" 
            class="pagination-btn group text-right"
          >
            <span class="pagination-label">
              Next
              <svg class="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
            <span class="pagination-title">{{ nextProject.name }}</span>
          </NuxtLink>
          <div v-else></div>
        </div>

      </div>
    </section>

  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <h1 class="font-sans text-2xl font-medium">Project not found</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll()
const { height } = useWindowSize()

const parallaxStyle = computed(() => ({
  transform: `translateY(${y.value * 0.4}px)`
}))

const isScrolledPastHero = computed(() => {
  // Mobile hero is ~60vh, Desktop is ~80vh. Trigger change at 50vh.
  return y.value > height.value * 0.5
})

const route = useRoute()
const slug = route.params.slug as string

// Since there is no database, we hardcode the visual project data here
const db = [
  {
    slug: 'portfolio',
    name: 'Personal Portfolio',
    role: 'Design & Engineering',
    year: '2026',
    tech: ['NuxtJS', 'Vue', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/portfolio',
    live: null,
    description: 'A heavily interactive, motion-rich personal portfolio built to showcase engineering skill and design taste through micro-animations.',
    heroClass: 'bg-gradient-to-br from-zinc-800 to-black',
    galleryClasses: ['bg-gradient-to-tr from-zinc-100 to-zinc-300', 'bg-gradient-to-bl from-zinc-200 to-zinc-400', 'bg-gradient-to-br from-zinc-100 to-zinc-200']
  },
  {
    slug: 'zavo',
    name: 'Zavo',
    role: 'Full-Stack Engineer',
    year: '2025',
    tech: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL', 'Xendit'],
    github: 'https://github.com/ardianilyas/zavo',
    live: null,
    description: 'Full-stack donation platform tailored for creators, featuring real-time stream overlays, payment integration, and a type-safe API layer.',
    heroClass: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    galleryClasses: ['bg-gradient-to-tr from-indigo-50 to-purple-100', 'bg-gradient-to-bl from-indigo-100 to-purple-200', 'bg-gradient-to-br from-purple-50 to-indigo-100']
  },
  {
    slug: 'patungan',
    name: 'Patungan',
    role: 'Backend Engineer',
    year: '2024',
    tech: ['Laravel', 'Xendit', 'Reverb', 'Octane', 'Redis'],
    github: 'https://github.com/ardianilyas/patungan',
    live: null,
    description: 'Content monetization platform with real-time broadcasting, queue-based background processing, and a robust payment gateway architecture.',
    heroClass: 'bg-gradient-to-br from-emerald-900 to-teal-900',
    galleryClasses: ['bg-gradient-to-tr from-emerald-50 to-teal-100', 'bg-gradient-to-bl from-emerald-100 to-teal-200', 'bg-gradient-to-br from-teal-50 to-emerald-100']
  },
  {
    slug: 'bux',
    name: 'Bux',
    role: 'Frontend Engineer',
    year: '2025',
    tech: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL'],
    github: 'https://github.com/ardianilyas/bux',
    live: null,
    description: 'Expense tracking application focused on performance, featuring a fully type-safe API, optimistic UI updates, and clean data visualization.',
    heroClass: 'bg-gradient-to-br from-blue-900 to-cyan-900',
    galleryClasses: ['bg-gradient-to-tr from-blue-50 to-cyan-100', 'bg-gradient-to-bl from-blue-100 to-cyan-200', 'bg-gradient-to-br from-cyan-50 to-blue-100']
  }
]

const currentIndex = db.findIndex(p => p.slug === slug)
const project = computed(() => currentIndex !== -1 ? db[currentIndex] : null)

const prevProject = computed(() => {
  if (currentIndex <= 0) return null
  return db[currentIndex - 1]
})

const nextProject = computed(() => {
  if (currentIndex === -1 || currentIndex >= db.length - 1) return null
  return db[currentIndex + 1]
})

useHead({
  title: project.value ? `${project.value.name} — Ardian Ilyas` : 'Project Not Found',
})

onMounted(() => {
  window.scrollTo(0, 0)
  
  // Trigger entry animations
  setTimeout(() => {
    const fadeEls = document.querySelectorAll('.fade-up')
    fadeEls.forEach(el => el.classList.add('is-visible'))
  }, 100)
})
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  text-decoration: none;
}

/* ── Typography ────────────────────────────────────────────── */
.meta-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-3);
  margin: 0 0 4px;
}

.meta-value {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
}

.tech-tag {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--color-text-2);
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 6px 14px;
  border-radius: 9999px;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.tech-tag:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--color-text);
  transform: translateY(-1px);
}

/* ── Buttons ───────────────────────────────────────────────── */
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.action-btn--primary {
  background: var(--color-text);
  color: var(--color-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.action-btn--primary:hover {
  background: #000;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.action-btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-2);
}

.action-btn--secondary:hover {
  border-color: var(--color-text);
  background: var(--color-surface);
  transform: translateY(-2px);
}

/* ── Gallery ───────────────────────────────────────────────── */
.gallery-img-wrap {
  position: relative;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-img-wrap:hover {
  transform: scale(1.02);
  z-index: 10;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

.pagination-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 120px;
}

.pagination-btn:hover {
  background: var(--color-surface);
}

.pagination-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-3);
  transition: color 0.2s;
}

.pagination-btn:hover .pagination-label {
  color: var(--color-text-2);
}

.pagination-btn.text-left .pagination-label {
  justify-content: flex-start;
}

.pagination-btn.text-right .pagination-label {
  justify-content: flex-end;
}

.pagination-title {
  font-family: var(--font-sans);
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
}
</style>
