<template>
  <div class="project-detail-page bg-[var(--color-bg)] min-h-screen relative" v-if="project">
    
    <!-- Top Nav -->
    <nav class="absolute top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center mix-blend-difference text-white">
      <NuxtLink to="/" class="back-link group">
        <svg class="transition-transform group-hover:-translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-sans font-medium text-sm tracking-wide">Back to Home</span>
      </NuxtLink>
    </nav>

    <!-- Main Visual Hero -->
    <header class="hero-visual relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-end">
      <!-- Background Visual (Placeholder for Project Image) -->
      <div class="absolute inset-0 z-0">
        <div class="w-full h-full object-cover" :class="project.heroClass"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10 pb-12 fade-up">
        <h1 class="font-sans text-[clamp(48px,8vw,120px)] font-bold tracking-tighter leading-[0.9] mb-6 text-[var(--color-text)]">
          {{ project.name }}
        </h1>
        <p class="font-sans text-[clamp(20px,2vw,28px)] font-medium text-[var(--color-text-2)] max-w-3xl leading-snug">
          {{ project.description }}
        </p>
      </div>
    </header>

    <!-- Project Details Grid -->
    <section class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-t border-[var(--color-border)] pt-12 fade-up" style="transition-delay: 0.1s">
        
        <!-- Metadata -->
        <div class="md:col-span-1 flex flex-col gap-8">
          <div>
            <h4 class="meta-label">Role</h4>
            <p class="meta-value">{{ project.role }}</p>
          </div>
          <div>
            <h4 class="meta-label">Timeline</h4>
            <p class="meta-value">{{ project.year }}</p>
          </div>
          <div>
            <h4 class="meta-label">Stack</h4>
            <div class="flex flex-wrap gap-2 mt-2">
              <span v-for="t in project.tech" :key="t" class="tech-tag">{{ t }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-3 mt-4">
            <a v-if="project.live" :href="project.live" target="_blank" class="action-btn action-btn--primary">
              View Live Site
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
            <a v-if="project.github" :href="project.github" target="_blank" class="action-btn action-btn--secondary">
              View Source code
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        </div>

        <!-- Visual Gallery -->
        <div class="md:col-span-3 flex flex-col gap-6">
          <div class="gallery-img-wrap rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div class="w-full h-full" :class="project.galleryClasses[0]"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="gallery-img-wrap rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div class="w-full h-full" :class="project.galleryClasses[1]"></div>
            </div>
            <div class="gallery-img-wrap rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div class="w-full h-full" :class="project.galleryClasses[2]"></div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Next Project -->
    <section class="border-t border-[var(--color-border)] mt-12 md:mt-24">
      <NuxtLink :to="'/projects/' + nextProject.slug" class="next-project-link group">
        <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col items-center text-center">
          <span class="font-mono text-sm uppercase tracking-widest text-[var(--color-text-3)] mb-4 block">Next Project</span>
          <h2 class="font-sans text-[clamp(36px,5vw,72px)] font-bold tracking-tighter text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
            {{ nextProject.name }}
          </h2>
        </div>
      </NuxtLink>
    </section>

  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <h1 class="font-sans text-2xl font-medium">Project not found</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

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

const nextProject = computed(() => {
  if (currentIndex === -1) return db[0]
  const nextIdx = (currentIndex + 1) % db.length
  return db[nextIdx]
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
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--color-text-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: 4px;
}

/* ── Buttons ───────────────────────────────────────────────── */
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.action-btn--primary {
  background: var(--color-text);
  color: var(--color-bg);
}

.action-btn--primary:hover {
  background: var(--color-text-2);
  transform: translateY(-1px);
}

.action-btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-2);
}

.action-btn--secondary:hover {
  border-color: var(--color-text);
  background: var(--color-surface);
}

/* ── Animations ────────────────────────────────────────────── */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
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

.next-project-link {
  display: block;
  text-decoration: none;
  background: var(--color-surface);
  transition: background 0.3s;
}

.next-project-link:hover {
  background: var(--color-border);
}
</style>
