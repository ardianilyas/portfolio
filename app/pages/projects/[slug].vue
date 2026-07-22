<template>
  <div class="project-detail-page bg-[var(--color-bg)] min-h-screen relative" v-if="project">
    <CustomCursor />
    
    <!-- Floating Back Button -->
    <NuxtLink 
      to="/#portfolio" 
      class="back-floating-btn group"
      aria-label="Back to projects"
    >
      <svg class="back-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="back-text">Back</span>
    </NuxtLink>

    <!-- Main Hero Header -->
    <header class="project-hero">
      <div class="hero-container max-w-[1100px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-12">
        
        <!-- Eyebrow Tag -->
        <div class="project-eyebrow fade-up">
          <span class="eyebrow-dot"></span>
          <span>// PROJECT CASE STUDY</span>
        </div>

        <h1 class="project-title fade-up fade-up-1">
          {{ project.name }}
        </h1>

        <p class="project-lead fade-up fade-up-2">
          {{ project.description }}
        </p>

        <!-- CTAs & Actions -->
        <div class="hero-actions fade-up fade-up-3">
          <a v-if="project.github" :href="project.github" target="_blank" class="action-btn action-btn--primary" v-magnetic="0.15">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            View Source Code
          </a>
          <a v-if="project.live" :href="project.live" target="_blank" class="action-btn action-btn--secondary" v-magnetic="0.15">
            Live Preview
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>

      </div>
    </header>

    <!-- Main Content Body -->
    <main class="max-w-[1100px] mx-auto px-6 md:px-10 pb-24">
      
      <!-- Section 1: System Architecture Specs Grid (0px Bento Matrix) -->
      <section v-if="project.architectureSpecs" class="spec-section fade-up">
        <h2 class="section-tag">// SYSTEM ARCHITECTURE</h2>
        
        <div class="spec-grid">
          <div 
            v-for="(spec, i) in project.architectureSpecs" 
            :key="spec.label" 
            class="spec-card"
          >
            <div class="spec-header">
              <span class="spec-index">0{{ i + 1 }}</span>
              <span class="spec-label">{{ spec.label }}</span>
            </div>
            <h3 class="spec-value">{{ spec.value }}</h3>
            <p class="spec-detail">{{ spec.detail }}</p>
          </div>
        </div>
      </section>

      <!-- Section 2: Key Feature & Code Architecture Highlights -->
      <section v-if="project.featureHighlights" class="features-section fade-up">
        <h2 class="section-tag">// TECHNICAL HIGHLIGHTS & CODE ARCHITECTURE</h2>
        
        <div class="feature-stack">
          <div 
            v-for="(feature, i) in project.featureHighlights" 
            :key="feature.title" 
            class="feature-card"
          >
            <div class="feature-content">
              <div class="feature-num">FEATURE // 0{{ i + 1 }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-desc">{{ feature.description }}</p>
            </div>

            <!-- Code Snippet Block (If available) -->
            <div v-if="feature.codeSnippet" class="code-block-wrapper">
              <div class="code-header">
                <div class="code-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <span class="code-title">architecture.ts</span>
              </div>
              <pre class="code-pre"><code>{{ feature.codeSnippet }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Tech Stack Matrix -->
      <section class="tech-section fade-up">
        <h2 class="section-tag">// TECHNOLOGIES USED</h2>
        <div class="tech-grid">
          <div v-for="t in project.tech" :key="t" class="tech-card">
            <span class="tech-name">{{ t }}</span>
          </div>
        </div>
      </section>

      <!-- Section 4: Project Pagination -->
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

useHead({
  title: project.value ? `${project.value.name} — Architecture & Case Study` : 'Project Not Found',
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
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  })

  const fadeEls = document.querySelectorAll('.fade-up')
  fadeEls.forEach(el => observer.observe(el))
})
</script>

<style scoped>
/* ── Floating Back Button ──────────────────────────────── */
.back-floating-btn {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(250, 250, 248, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-2);
  border-radius: 9999px;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
}

.back-floating-btn:hover {
  background: var(--color-accent);
  color: #f2e8cf;
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.back-arrow {
  transition: transform 0.2s ease;
}

.back-floating-btn:hover .back-arrow {
  transform: translateX(-3px);
}

/* ── Hero Section ────────────────────────────────────── */
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

/* ── Hero Actions ────────────────────────────────────── */
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
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.action-btn--primary {
  background: var(--color-accent);
  color: #f2e8cf;
  box-shadow: 0 4px 16px rgba(15, 63, 47, 0.2);
}

.action-btn--primary:hover {
  opacity: 0.95;
  transform: translateY(-2px);
}

.action-btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-2);
}

.action-btn--secondary:hover {
  border-color: var(--color-text);
  background: var(--color-bg);
  transform: translateY(-2px);
}

/* ── Section Tags ────────────────────────────────────── */
.section-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--color-text-3);
  margin-bottom: 20px;
  text-transform: uppercase;
}

/* ── Section 1: Spec Matrix ──────────────────────────── */
.spec-section {
  margin-bottom: 64px;
}

.spec-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .spec-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.spec-card {
  padding: 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  margin-top: -1px;
  margin-left: -1px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.spec-card:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.spec-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.spec-index {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  background: var(--color-accent-dim);
  padding: 2px 6px;
}

.spec-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.spec-value {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.spec-detail {
  font-family: var(--font-sans);
  font-size: 13.5px;
  color: var(--color-text-2);
  line-height: 1.5;
  margin: 0;
}

/* ── Section 2: Technical Highlights & Code ────────── */
.features-section {
  margin-bottom: 64px;
}

.feature-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 32px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0;
}

@media (min-width: 900px) {
  .feature-card {
    grid-template-columns: 1fr 1.2fr;
    align-items: center;
  }
}

.feature-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent);
  margin-bottom: 8px;
}

.feature-title {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.02em;
  margin: 0 0 12px 0;
}

.feature-desc {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0;
}

/* Code Snippet Block */
.code-block-wrapper {
  background: #121816;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.code-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.code-title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.code-pre {
  margin: 0;
  padding: 18px 20px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: #e2e8f0;
  line-height: 1.6;
  overflow-x: auto;
}

/* ── Section 3: Tech Grid ────────────────────────────── */
.tech-section {
  margin-bottom: 64px;
}

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

/* ── Section 4: Pagination ────────────────────────────── */
.project-pagination {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  border-top: 1px solid var(--color-border);
  padding-top: 36px;
}

.pagination-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition: all 0.25s ease;
}

.pagination-card:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.pagination-placeholder {
  visibility: hidden;
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

.pagination-card.text-right .pag-dir {
  justify-content: flex-end;
}

.pag-title {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
}
</style>
