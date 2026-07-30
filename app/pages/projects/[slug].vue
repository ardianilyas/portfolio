<template>
  <div class="project-detail-page bg-[var(--color-bg)] min-h-screen relative" v-if="project">
    
    <!-- Main Hero Header -->
    <header class="project-hero">
      <div class="hero-container max-w-[1100px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-12">
        
        <!-- Inline Back Link -->
        <div class="back-link-wrapper fade-up">
          <NuxtLink 
            to="/#portfolio" 
            class="back-inline-btn group"
            aria-label="Back to projects"
          >
            <svg class="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Projects</span>
          </NuxtLink>
        </div>

        <!-- Eyebrow Tag -->
        <div class="project-eyebrow fade-up">
          <span class="eyebrow-dot"></span>
          <span>// PERSONAL PROJECT CASE STUDY</span>
        </div>

        <h1 class="project-title fade-up fade-up-1">
          {{ project.name }}
        </h1>

        <p class="project-lead fade-up fade-up-2">
          {{ project.description }}
        </p>

        <!-- CTAs & Actions -->
        <div class="hero-actions fade-up fade-up-3">
          <a v-if="project.github" :href="project.github" target="_blank" class="action-btn action-btn--primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            View Source Code
          </a>
          <a v-if="project.live" :href="project.live" target="_blank" class="action-btn action-btn--secondary">
            Live Preview
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>

        <!-- Fresh-Grad Metadata Strip -->
        <div class="project-meta-strip fade-up fade-up-4">
          <div class="meta-item">
            <span class="meta-label">// CATEGORY</span>
            <span class="meta-val">Personal Project</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">// MY ROLE</span>
            <span class="meta-val">Solo Developer (End-to-End)</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">// YEAR</span>
            <span class="meta-val">{{ project.year }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">// CORE STACK</span>
            <span class="meta-val">{{ project.tech.slice(0, 3).join(' · ') }}</span>
          </div>
        </div>

      </div>
    </header>

    <!-- Main Content Body -->
    <main class="max-w-[1100px] mx-auto px-6 md:px-10 pb-24">

      <!-- Section 1: Motivation, Learning Goal & Technical Solution (Bento Matrix) -->
      <section v-if="project.whyIBuiltThis || project.problem || project.solution" class="overview-section fade-up">
        <h2 class="section-tag">// WHY I BUILT THIS & LEARNING GOAL</h2>
        <div class="overview-grid">
          <div class="overview-card bento-card-hover md:col-span-2">
            <div class="overview-label">
              <span class="overview-index">01</span>
              <span>WHY I BUILT THIS</span>
            </div>
            <p class="overview-text">{{ project.whyIBuiltThis || project.problem }}</p>
          </div>
          <div v-if="project.learningGoal" class="overview-card bento-card-hover md:col-span-1">
            <div class="overview-label">
              <span class="overview-index">02</span>
              <span>TARGET LEARNING GOAL</span>
            </div>
            <p class="overview-text">{{ project.learningGoal }}</p>
          </div>
          <div v-if="project.solution" class="overview-card overview-card--accent bento-card-hover md:col-span-3">
            <div class="overview-label">
              <span class="overview-index overview-index--light">{{ project.learningGoal ? '03' : '02' }}</span>
              <span>MY APPROACH & TECHNICAL SOLUTION</span>
            </div>
            <p class="overview-text overview-text--light">{{ project.solution }}</p>
          </div>
        </div>
      </section>

      <!-- Section 2: Key Features (Dynamic Bento Matrix Grid) -->
      <section v-if="project.features && project.features.length" class="features-section fade-up">
        <h2 class="section-tag">// KEY FEATURES</h2>
        <div class="features-grid">
          <div
            v-for="(feature, i) in project.features"
            :key="feature.title"
            class="feature-card bento-card-hover"
            :class="getFeatureBentoSpan(i, project.features.length)"
          >
            <div class="feature-num">FEATURE // 0{{ i + 1 }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- Section 3: Tech Stack -->
      <section class="tech-section fade-up">
        <h2 class="section-tag">// TECHNOLOGIES USED</h2>
        <div class="tech-grid">
          <div v-for="t in project.tech" :key="t" class="tech-card">
            <span class="tech-name">{{ t }}</span>
          </div>
        </div>
      </section>

      <!-- Section 4: Timeline -->
      <section v-if="project.timeline && project.timeline.length" class="timeline-section fade-up">
        <h2 class="section-tag">// DEVELOPMENT TIMELINE</h2>
        <div class="timeline-track">
          <div
            v-for="(item, i) in project.timeline"
            :key="item.phase"
            class="timeline-item"
            :class="{ 'timeline-item--last': i === project.timeline!.length - 1 }"
          >
            <div class="timeline-marker">
              <div class="timeline-dot" :class="{ 'timeline-dot--active': i === project.timeline!.length - 1 }"></div>
              <div v-if="i < project.timeline!.length - 1" class="timeline-line"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-meta">
                <span class="timeline-phase">{{ item.phase }}</span>
                <span class="timeline-date">{{ item.date }}</span>
              </div>
              <p v-if="item.description" class="timeline-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Key Takeaways & Reflection -->
      <section class="takeaways-section fade-up">
        <h2 class="section-tag">// KEY TAKEAWAYS & REFLECTION</h2>
        <div class="takeaways-grid">
          <div class="takeaway-card">
            <div class="takeaway-badge">// 01 · ARCHITECTURE</div>
            <h3 class="takeaway-title">System & API Ergonomics</h3>
            <p class="takeaway-text">Deepened understanding of end-to-end type safety, structured API contracts, and modular codebase organization.</p>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-badge">// 02 · CRAFT</div>
            <h3 class="takeaway-title">Code Quality & Precision</h3>
            <p class="takeaway-text">Enforced component modularity, clean error handling, and high-contrast, accessible UI design standards.</p>
          </div>
        </div>
      </section>

      <!-- Section 6: Project Pagination -->
      <nav class="project-pagination fade-up" aria-label="Project Navigation">
        <NuxtLink 
          v-if="prevProject" 
          :to="'/projects/' + prevProject.slug" 
          class="pagination-card pagination-prev group"
        >
          <span class="pag-dir">
            <svg class="transition-transform group-hover:-translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Previous Project
          </span>
          <span class="pag-title">{{ prevProject.name }}</span>
        </NuxtLink>
        <div v-else class="pagination-card pagination-placeholder"></div>

        <NuxtLink 
          v-if="nextProject" 
          :to="'/projects/' + nextProject.slug" 
          class="pagination-card pagination-next group text-right"
        >
          <span class="pag-dir">
            Next Project
            <svg class="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
          <span class="pag-title">{{ nextProject.name }}</span>
        </NuxtLink>
        <div v-else class="pagination-card pagination-placeholder"></div>
      </nav>

    </main>

  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <h1 class="font-sans text-2xl font-medium">Project not found</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { projects as db } from '~/data/projects'

const route = useRoute()
const slug = route.params.slug as string

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

function getFeatureBentoSpan(index: number, total: number): string {
  if (total === 3) {
    return 'md:col-span-2'
  }
  if (total === 4) {
    return 'md:col-span-3'
  }
  if (total === 5) {
    if (index < 2) return 'md:col-span-3'
    return 'md:col-span-2'
  }
  if (total >= 6) {
    if (index === 0) return 'md:col-span-4'
    if (index === 1) return 'md:col-span-2'
    return 'md:col-span-2'
  }
  return 'md:col-span-3'
}

const siteUrl = 'https://ardianilyas.com'

useSeoMeta({
  title: computed(() => project.value ? `${project.value.name} — Case Study` : 'Project Not Found'),
  description: computed(() => project.value?.description || 'Project case study by Ardian Ilyas.'),
  ogTitle: computed(() => project.value ? `${project.value.name} — Engineering Case Study` : 'Project Not Found'),
  ogDescription: computed(() => project.value?.description || ''),
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

useHead({
  script: computed(() => {
    if (!project.value) return []
    return [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          'name': project.value.name,
          'description': project.value.description,
          'url': `${siteUrl}/projects/${project.value.slug}`,
          'author': {
            '@type': 'Person',
            'name': 'Ardian Ilyas',
            'url': siteUrl
          },
          'keywords': project.value.tags ? project.value.tags.join(', ') : undefined
        })
      }
    ]
  })
})

onMounted(() => {
  window.scrollTo(0, 0)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* ── Inline Back Button ──────────────────────────────────── */
.back-link-wrapper { margin-bottom: 20px; }

.back-inline-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-inline-btn:hover { color: var(--color-accent); transform: translateX(-2px); }
.back-arrow { transition: transform 0.2s ease; }
.back-inline-btn:hover .back-arrow { transform: translateX(-3px); }

/* ── Hero Section ────────────────────────────────────────── */
.project-hero {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  margin-bottom: 48px;
}

.project-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 16px;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.project-title {
  font-family: var(--font-sans);
  font-size: clamp(38px, 6.5vw, 84px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--color-text);
  margin-bottom: 24px;
}

.project-lead {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2vw, 22px);
  color: var(--color-text-2);
  line-height: 1.6;
  max-width: 780px;
  margin-bottom: 36px;
}

/* ── Hero Actions (Sharp 0px) ────────────────────────────── */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  border-radius: 0;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.action-btn--primary {
  background: var(--color-accent);
  color: #f2e8cf;
  box-shadow: 0 4px 16px rgba(15, 63, 47, 0.2);
}
.action-btn--primary:hover { opacity: 0.95; transform: translateY(-2px); }

.action-btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-2);
}
.action-btn--secondary:hover { border-color: var(--color-text); transform: translateY(-2px); }

/* ── Section Tags ────────────────────────────────────────── */
.section-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--color-text-3);
  margin-bottom: 20px;
  text-transform: uppercase;
}

/* ── Section 1: Overview Grid ────────────────────────────── */
.overview-section { margin-bottom: 64px; }

.overview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .overview-grid { grid-template-columns: repeat(3, 1fr); }
}

.overview-card {
  padding: 36px 32px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  margin-top: -1px;
  margin-left: -1px;
}

.bento-card-hover {
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.bento-card-hover:hover {
  z-index: 2;
  border-color: var(--color-accent) !important;
  box-shadow: 0 8px 30px rgba(15, 63, 47, 0.08);
}

.overview-card--accent {
  background: var(--color-accent);
}

.overview-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-3);
  text-transform: uppercase;
  margin-bottom: 20px;
}

.overview-card--accent .overview-label {
  color: rgba(242, 232, 207, 0.6);
}

.overview-index {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  padding: 2px 6px;
}

.overview-index--light {
  color: rgba(242, 232, 207, 0.9);
  background: rgba(255, 255, 255, 0.12);
}

.overview-text {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text-2);
  line-height: 1.7;
  margin: 0;
}

.overview-text--light {
  color: rgba(242, 232, 207, 0.85);
}

/* ── Section 2: Features Grid ────────────────────────────── */
.features-section { margin-bottom: 64px; }

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .features-grid { grid-template-columns: repeat(6, 1fr); }
}

.feature-card {
  padding: 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  margin-top: -1px;
  margin-left: -1px;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.feature-card:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.feature-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}

.feature-title {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  line-height: 1.3;
}

.feature-desc {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-2);
  line-height: 1.65;
  margin: 0;
}

/* ── Section 3: Tech Stack ───────────────────────────────── */
.tech-section { margin-bottom: 64px; }

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-card {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 8px 16px;
  border-radius: 0;
}

/* ── Section 4: Timeline ─────────────────────────────────── */
.timeline-section { margin-bottom: 64px; }

.timeline-track {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 20px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border-2);
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  margin-top: 4px;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.timeline-dot--active {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.timeline-line {
  width: 1px;
  flex: 1;
  min-height: 40px;
  background: var(--color-border);
  margin: 6px 0;
}

.timeline-content {
  padding-bottom: 32px;
}

.timeline-item--last .timeline-content {
  padding-bottom: 0;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.timeline-phase {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.timeline-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  padding: 2px 8px;
}

.timeline-desc {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0;
}

/* ── Project Pagination ──────────────────────────────────── */
.project-pagination {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  border-top: 1px solid var(--color-border);
  padding-top: 36px;
}

@media (min-width: 640px) {
  .project-pagination {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

.pagination-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0;
  text-decoration: none;
  transition: all 0.25s ease;
}

.pagination-card:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

/* ── Fresh-Grad Metadata Strip ───────────────────────────── */
.project-meta-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .project-meta-strip {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--color-text-2);
  text-transform: uppercase;
}

.meta-val {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

/* ── Key Takeaways & Reflection Section ───────────────────── */
.takeaways-section {
  margin-bottom: 48px;
}

.takeaways-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .takeaways-grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

.takeaway-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.takeaway-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.takeaway-title {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.takeaway-text {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0;
}

.pagination-placeholder {
  display: none;
}

@media (min-width: 640px) {
  .pagination-placeholder {
    display: flex;
    visibility: hidden;
  }
}

.pag-dir {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (min-width: 640px) {
  .pagination-card.text-right .pag-dir {
    justify-content: flex-end;
  }
}

.pag-title {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
</style>
