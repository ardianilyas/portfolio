<template>
  <section
    id="hero"
    class="hero"
    aria-label="Introduction"
    ref="heroSection"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="hero-inner" :class="{ 'is-visible': isVisible }">

      <!-- 3D Chromatic Split Headline -->
      <div class="hero-headline-wrap fade-up fade-up-1">
        <h1 
          class="hero-headline"
          :style="{ 
            '--x': mouseNorm.x, 
            '--y': mouseNorm.y,
            '--active': isHovering ? 1 : 0
          }"
        >
          <span
            v-for="(word, i) in headlineWords"
            :key="i"
            class="hero-word"
            :class="{ 'hero-word--accent': word.accent }"
          >{{ word.text }}</span>
        </h1>
      </div>

      <!-- Sub -->
      <p class="hero-sub fade-up fade-up-2">
        A Full-Stack Developer transforming complex requirements
        into high-performing digital products with TypeScript, Go, and modern web frameworks.
      </p>

      <!-- CTAs -->
      <div class="hero-actions fade-up fade-up-3">
        <a href="#portfolio" class="btn-primary" @click.prevent="scrollTo('portfolio')">
          View my work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <a href="mailto:ardianilyas@gmail.com" class="btn-ghost">
          Get in touch
        </a>
      </div>

      <!-- Status badge -->
      <div class="hero-status fade-up fade-up-4" aria-label="Availability status">
        <span class="status-dot"></span>
        <span class="hero-status-text">Available for new opportunities</span>
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

// ── Mouse tracking for Chromatic Split ──────────────────
const mouseNorm = reactive({ x: 0, y: 0 })
const isHovering = ref(false)

function onMouseMove(e: MouseEvent) {
  isHovering.value = true
  // Normalize mouse position from -1 to 1 based on viewport
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  
  // Ease the mouse values slightly for a smoother feel
  const targetX = (e.clientX - cx) / cx
  const targetY = (e.clientY - cy) / cy
  
  mouseNorm.x = targetX
  mouseNorm.y = targetY
}

function onMouseLeave() {
  isHovering.value = false
  mouseNorm.x = 0
  mouseNorm.y = 0
}
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  background-color: var(--color-bg);
  padding-top: 64px;
  overflow: hidden;
}

.hero-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px 60px;
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
  
  /* Chromatic split shadow logic */
  --split-dist: calc(15px * var(--active));
  --cyan-x: calc(var(--x) * var(--split-dist) * -1);
  --cyan-y: calc(var(--y) * var(--split-dist) * -1);
  
  --magenta-x: calc(var(--x) * var(--split-dist));
  --magenta-y: calc(var(--y) * var(--split-dist));
  
  /* Apply the shadows: cyan moves opposite to mouse, magenta moves with mouse */
  text-shadow: 
    calc(var(--cyan-x)) calc(var(--cyan-y)) 0 rgba(0, 255, 255, calc(0.5 * var(--active))),
    calc(var(--magenta-x)) calc(var(--magenta-y)) 0 rgba(255, 0, 255, calc(0.5 * var(--active)));
    
  transition: text-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
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
  background: var(--color-surface);
  padding: 8px 20px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent);
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 8px var(--color-accent); }
  50% { box-shadow: 0 0 16px var(--color-accent), 0 0 24px rgba(22, 163, 74, 0.3); }
}

.hero-status-text {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-2);
}

/* ── Entrance animation ───────────────────────────────── */
.hero-inner:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
