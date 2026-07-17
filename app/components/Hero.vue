<template>
  <section
    id="hero"
    class="hero"
    aria-label="Introduction"
    ref="heroSection"
  >
    <!-- Turbulence Background SVGs -->
    <div class="hero-bg-turbulence" aria-hidden="true">
      <div class="tb-item tb-1"><img src="https://svgl.app/library/typescript.svg" alt="" /></div>
      <div class="tb-item tb-2"><img src="https://svgl.app/library/laravel.svg" alt="" /></div>
      <div class="tb-item tb-3"><img src="https://svgl.app/library/drizzle-orm_dark.svg" alt="" /></div>
      <div class="tb-item tb-4"><img src="https://svgl.app/library/expressjs.svg" alt="" /></div>
    </div>

    <div class="hero-inner" :class="{ 'is-visible': isVisible }">
      <!-- Status badge (moved to top) -->
      <div class="hero-status fade-up fade-up-1 mb-8" aria-label="Availability status">
        <svg class="status-spark" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
        <span class="hero-status-text">Available for new opportunities</span>
      </div>

      <!-- Headline -->
      <div class="hero-headline-wrap fade-up fade-up-2">
        <h1 class="hero-headline">
          <span
            v-for="(word, i) in headlineWords"
            :key="i"
            class="hero-word"
            :class="{ 'hero-word--accent': word.accent }"
          >{{ word.text }}</span>
        </h1>
      </div>

      <!-- Sub -->
      <p class="hero-sub fade-up fade-up-3">
        A Full-Stack Developer transforming complex requirements
        into high-performing digital products with TypeScript, Go, and modern web frameworks.
      </p>

      <!-- CTAs -->
      <div class="hero-actions fade-up fade-up-4">
        <a href="#portfolio" class="btn-primary" @click.prevent="scrollTo('portfolio')">
          View my work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="mailto:ardianilyas@gmail.com" class="btn-ghost">
          Get in touch
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const heroSection = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  heroSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 }
)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// ── Headline words ──────────────────────────────────────
const headlineWords = [
  { text: "Hi,", accent: false },
  { text: "I'm", accent: false },
  { text: 'Ardian', accent: true },
  { text: 'Ilyas.', accent: true },
]


</script>

<style scoped>
/* ── Turbulence Background ──────────────────────────── */
.hero-bg-turbulence {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.tb-item {
  position: absolute;
  width: 64px;
  height: 64px;
  animation: turbulence 12s ease-in-out infinite alternate;
}

.tb-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tb-1 { top: 15%; left: 10%; animation-delay: 0s; animation-duration: 15s; }
.tb-2 { top: 60%; left: 15%; animation-delay: -3s; animation-duration: 12s; }
.tb-3 { top: 20%; right: 12%; animation-delay: -7s; animation-duration: 18s; }
.tb-4 { top: 65%; right: 10%; animation-delay: -10s; animation-duration: 14s; }

@keyframes turbulence {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(15px, -20px) rotate(5deg) scale(1.05); }
  66% { transform: translate(-10px, 15px) rotate(-3deg) scale(0.95); }
  100% { transform: translate(20px, 20px) rotate(8deg) scale(1); }
}

@media (max-width: 767px) {
  .tb-item {
    width: 40px;
    height: 40px;
  }
  .tb-1 { top: 18%; left: 5%; }
  .tb-2 { top: 82%; left: 8%; }
  .tb-3 { top: 22%; right: 5%; }
  .tb-4 { top: 78%; right: 8%; }
}

/* ── Shell ───────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  background-color: var(--color-bg);
  padding-top: 64px;
  overflow: hidden;
}

.hero-inner {
  position: relative;
  z-index: 10;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100dvh - 64px);
  gap: 0;
}

@media (min-width: 768px) {
  .hero-inner {
    padding: 100px 40px 100px;
  }
}

/* ── Headline ─────────────────────────────────────────── */
.hero-headline-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
  perspective: 1000px;
}

.hero-headline {
  font-family: var(--font-sans);
  font-size: clamp(36px, 10vw, 110px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.25em;
  max-width: 900px;
  user-select: none;
  
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-headline:hover .hero-word {
  opacity: 0.15;
  filter: blur(8px);
  transform: scale(0.95);
}

.hero-word {
  display: inline-block;
  color: var(--color-text); /* Solid black */
  cursor: default;
  position: relative;
  transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease;
}

.hero-headline .hero-word:hover {
  opacity: 1;
  filter: blur(0);
  transform: scale(1.1) translateY(-8px) rotate(-2deg);
  z-index: 10;
}

.hero-word--accent {
  color: var(--color-accent);
}

.hero-headline .hero-word--accent:hover {
  color: var(--color-accent);
}

@media (max-width: 767px) {
  .hero-headline:hover .hero-word {
    opacity: 0.25;
    filter: blur(4px);
    transform: scale(0.98);
  }
  .hero-headline .hero-word:hover {
    transform: scale(1.05) translateY(-4px) rotate(-1deg);
  }
}

/* ── Sub ──────────────────────────────────────────────── */
.hero-sub {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-2);
  max-width: 560px;
  margin: 0 0 40px;
  text-align: center;
}

/* ── CTAs ─────────────────────────────────────────────── */
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
  width: 100%;
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    padding: 0 20px;
  }
  .hero-actions > * {
    width: 100%;
    justify-content: center;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: #E6D5B8;
  background: #0F3F2F;
  padding: 12px 28px;
  transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
}

.btn-icon {
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.btn-primary:hover {
  opacity: 0.95;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(15, 63, 47, 0.4);
}

.btn-ghost {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  background: transparent;
  padding: 12px 28px;
  border: 1px solid var(--color-border);
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-ghost:hover {
  background: var(--color-surface);
  transform: translateY(-2px);
}

/* ── Status badge ─────────────────────────────────────── */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  background: transparent;
  border: none;
}

.status-spark {
  color: var(--color-accent);
  animation: spark-spin 8s linear infinite;
}

@keyframes spark-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-status-text {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-text-2);
}

/* ── Entrance animation ───────────────────────────────── */
.hero-inner:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
