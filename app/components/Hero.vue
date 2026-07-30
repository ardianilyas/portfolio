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
      <!-- Status badge (Noticeable 0px Matrix Live Badge) -->
      <div class="hero-status fade-up fade-up-1 mb-8" aria-label="Availability status">
        <span class="status-pulse-wrap">
          <span class="status-pulse-ping"></span>
          <span class="status-pulse-dot"></span>
        </span>
        <span class="hero-status-text">FRESH GRADUATE · AVAILABLE FOR OPPORTUNITIES</span>
      </div>

      <!-- Headline (Short & Interactive - 6 words max) -->
      <div class="hero-headline-wrap fade-up fade-up-2">
        <h1 class="hero-headline">
          <span
            v-for="(word, i) in headlineWords"
            :key="i"
            class="hero-word"
            :class="{ 
              'hero-word--accent': word.accent, 
              'hero-word--italic': word.italic,
              'hero-word--interactive': word.interactive 
            }"
            @click="word.interactive && cycleWord(word)"
            :title="word.interactive ? 'Click to cycle options' : ''"
          >
            {{ word.text }}
            <span v-if="word.interactive" class="interactive-hint" aria-hidden="true">↺</span>
          </span>
        </h1>
      </div>

      <!-- Sub -->
      <p class="hero-sub fade-up fade-up-3">
        Fresh Graduate & Full-Stack Developer specializing in TypeScript, Go, and PHP/Laravel.
        Building complete products end-to-end — from backend systems to polished user interfaces.
      </p>

      <!-- CTAs -->
      <div class="hero-actions fade-up fade-up-4">
        <a href="#portfolio" class="btn-primary" @click.prevent="scrollTo('portfolio')">
          {{ $t('hero.view_work') }}
          <span class="btn-icon" aria-hidden="true">
            <svg class="btn-arrow-svg arrow-main" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
            <svg class="btn-arrow-svg arrow-clone" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
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
const isVisible = ref(true)

useIntersectionObserver(
  heroSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 }
)

function scrollTo(id: string) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// ── Interactive Headline Words (6 words total) ─────────
interface HeadlineWord {
  text: string
  accent: boolean
  italic?: boolean
  interactive?: boolean
  alternates?: string[]
  altIndex?: number
}

const headlineWords = ref<HeadlineWord[]>([
  { text: "Hi, I'm", accent: false },
  { text: 'Ardian', accent: true },
  { text: 'Ilyas', accent: true, italic: true },
  { text: '— building', accent: false },
  { 
    text: 'backend systems', 
    accent: true, 
    interactive: true, 
    alternates: ['backend systems', 'full-stack apps', 'clean APIs', 'web products'], 
    altIndex: 0 
  },
  { text: 'with speed & precision.', accent: false },
])

function cycleWord(word: HeadlineWord) {
  if (!word.alternates || word.altIndex === undefined) return
  word.altIndex = (word.altIndex + 1) % word.alternates.length
  word.text = word.alternates[word.altIndex]
}


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

.hero-word {
  display: inline-block;
  color: var(--color-text);
  cursor: default;
  position: relative;
  transition: opacity 0.35s ease, filter 0.35s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
}

.hero-word:hover {
  transform: translateY(-4px);
  z-index: 10;
}

.hero-word--accent {
  color: var(--color-accent);
}

/* On headline hover: blur non-accent text (Crafting, with, &) */
.hero-headline:hover .hero-word:not(.hero-word--accent) {
  opacity: 0.3;
  filter: blur(4px);
}

/* Keep green accent text crisp & highlighted on headline hover (no glow) */
.hero-headline:hover .hero-word--accent {
  color: var(--color-accent);
  opacity: 1;
  filter: none;
}

.hero-word--accent:hover {
  transform: translateY(-4px) scale(1.02);
}

.hero-word--italic {
  font-style: italic;
  padding-right: 0.08em; /* Italic clearance */
}

.hero-word--interactive {
  cursor: pointer;
  border-bottom: 2px dashed rgba(15, 63, 47, 0.35);
  padding-bottom: 2px;
  transition: border-color 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-word--interactive:hover {
  border-bottom-color: var(--color-accent);
}

.interactive-hint {
  font-family: var(--font-mono);
  font-size: 0.35em;
  font-style: normal;
  vertical-align: super;
  opacity: 0.5;
  margin-left: 4px;
  display: inline-block;
  transition: transform 0.4s ease, opacity 0.2s ease;
}

.hero-word--interactive:hover .interactive-hint {
  transform: rotate(180deg);
  opacity: 1;
}

@media (max-width: 767px) {
  .hero-word:hover {
    transform: translateY(-2px);
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
  color: #f2e8cf;
  background: var(--color-accent);
  padding: 12px 28px;
  transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
}

.btn-icon {
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
  display: inline-flex;
}

.btn-arrow-svg {
  position: absolute;
  inset: 0;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.arrow-main {
  transform: translate(0, 0);
}

.arrow-clone {
  transform: translate(-100%, 100%);
}

.btn-primary:hover .arrow-main {
  transform: translate(100%, -100%);
}

.btn-primary:hover .arrow-clone {
  transform: translate(0, 0);
}

.btn-primary:hover {
  opacity: 0.95;
  box-shadow: 0 10px 20px -10px rgba(15, 63, 47, 0.4);
}

.btn-primary:active {
  opacity: 0.9;
}

.btn-ghost {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  background: transparent;
  padding: 12px 28px;
  border: 1px solid var(--color-border);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-ghost:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.btn-ghost:active {
  opacity: 0.9;
}

/* ── Status badge (Noticeable 0px Matrix Live Badge) ───── */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  user-select: none;
}

.hero-status:hover {
  transform: translateY(-2px);
  border-color: rgba(15, 63, 47, 0.4);
  border-left-color: var(--color-accent);
  box-shadow: 0 8px 24px rgba(15, 63, 47, 0.08);
}

.status-pulse-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
}

.status-pulse-dot {
  position: relative;
  width: 7px;
  height: 7px;
  background: #10B981;
  border-radius: 50%;
}

.status-pulse-ping {
  position: absolute;
  width: 14px;
  height: 14px;
  background: rgba(16, 185, 129, 0.4);
  border-radius: 50%;
  animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes radar-ping {
  0% {
    transform: scale(0.6);
    opacity: 0.8;
  }
  75%, 100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.hero-status-text {
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

/* ── Entrance animation ───────────────────────────────── */
.hero-inner:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
