<template>
  <section
    id="hero"
    class="hero"
    aria-label="Introduction"
    ref="heroSection"
  >
    <div class="hero-inner" :class="{ 'is-visible': isVisible }">
      <div class="hero-content">

        <!-- Status badge -->
        <div class="hero-status fade-up fade-up-1" aria-label="Availability status">
          <span class="status-dot"></span>
          <span class="hero-status-text">Available for new opportunities</span>
        </div>

        <!-- Headline -->
        <h1 class="hero-headline fade-up fade-up-2">
          Hi, I'm Ardian Ilyas.<br> A <span style="color: var(--color-accent)">Full-Stack Developer</span>.
        </h1>

        <!-- Sub -->
        <p class="hero-sub fade-up fade-up-3">
          I build reliable systems and polished interfaces. Using TypeScript and Go, I transform complex requirements into high-performing digital products.
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  background-color: var(--color-bg);
  padding-top: 64px; /* navbar height */
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 24px 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100dvh - 64px);
}

@media (min-width: 768px) {
  .hero-inner {
    padding: 96px 40px 120px;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ── Status badge ─────────────────────────────────────── */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  background: var(--color-surface);
  padding: 6px 16px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent);
}

.hero-status-text {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-2);
}

/* ── Headline ─────────────────────────────────────────── */
.hero-headline {
  font-family: var(--font-sans);
  font-size: clamp(48px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-text);
  margin: 0 0 24px;
}

/* ── Sub ──────────────────────────────────────────────── */
.hero-sub {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-2);
  max-width: 600px;
  margin: 0 0 40px;
}

/* ── CTAs ─────────────────────────────────────────────── */
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-inv);
  background: var(--color-text);
  padding: 12px 28px;
  border-radius: 9999px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-icon {
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.btn-primary:hover { 
  opacity: 0.9; 
  transform: translateY(-1px);
}

.btn-ghost {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  background: transparent;
  padding: 12px 28px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-ghost:hover {
  background: var(--color-surface);
  transform: translateY(-1px);
}

/* We hide the elements until is-visible class is applied */
.hero-inner:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
