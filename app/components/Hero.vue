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
      <!-- Status badge (Sleek Glass Pill with Interactive Details) -->
      <div class="hero-status-wrapper fade-up fade-up-1 mb-8">
        <button
          class="hero-status-pill"
          :class="{ 'is-open': showDetails }"
          @click="toggleDetails"
          :aria-expanded="showDetails"
          aria-label="View availability details"
        >
          <span class="status-pulse-wrap" aria-hidden="true">
            <span class="status-pulse-ping"></span>
            <span class="status-pulse-dot"></span>
          </span>
          <span class="hero-status-text">{{ $t('hero.status') }}</span>
          <span class="status-chevron" :class="{ 'is-rotated': showDetails }" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <!-- Interactive Popover Drawer -->
        <Transition name="popover-slide">
          <div v-if="showDetails" class="status-popover" role="dialog" aria-label="Availability details">
            <div class="popover-header">
              <span class="popover-badge">{{ $t('hero.popover.badge') }}</span>
              <span class="popover-status-tag">{{ $t('hero.popover.ready') }}</span>
            </div>
            <div class="popover-grid">
              <div class="popover-item">
                <span class="popover-label">{{ $t('hero.popover.focus_label') }}</span>
                <span class="popover-val">{{ $t('hero.popover.focus_val') }}</span>
              </div>
              <div class="popover-item">
                <span class="popover-label">{{ $t('hero.popover.stack_label') }}</span>
                <span class="popover-val">{{ $t('hero.popover.stack_val') }}</span>
              </div>
              <div class="popover-item">
                <span class="popover-label">{{ $t('hero.popover.model_label') }}</span>
                <span class="popover-val">{{ $t('hero.popover.model_val') }}</span>
              </div>
            </div>
            <div class="popover-footer">
              <a href="mailto:ardianilyas@gmail.com" class="popover-cta-link">
                <span>{{ $t('hero.popover.cta') }}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Transition>
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
        {{ $t('hero.sub') }}
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
          {{ $t('hero.get_in_touch') }}
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const heroSection = ref<HTMLElement | null>(null)
const isVisible = ref(true)
const showDetails = ref(false)

function toggleDetails() {
  showDetails.value = !showDetails.value
}

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

const { t } = useI18n()
const altIndex = ref(0)

const alternatesList = computed(() => [
  t('hero.alternates.backend'),
  t('hero.alternates.fullstack'),
  t('hero.alternates.apis'),
  t('hero.alternates.products')
])

const headlineWords = computed<HeadlineWord[]>(() => [
  { text: t('hero.greeting'), accent: false },
  { text: 'Ardian', accent: true },
  { text: 'Ilyas', accent: true, italic: true },
  { text: t('hero.building'), accent: false },
  { 
    text: alternatesList.value[altIndex.value] || alternatesList.value[0], 
    accent: true, 
    interactive: true, 
    alternates: alternatesList.value, 
    altIndex: altIndex.value 
  },
])

function cycleWord(word: HeadlineWord) {
  altIndex.value = (altIndex.value + 1) % alternatesList.value.length
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

/* ── Status Pill & Interactive Popover Drawer ────────────── */
.hero-status-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
}

.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  user-select: none;
  color: var(--color-text);
  outline: none;
}

.hero-status-pill:hover,
.hero-status-pill.is-open {
  transform: translateY(-2px);
  background: #ffffff;
  border-color: rgba(15, 63, 47, 0.3);
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
  width: 16px;
  height: 16px;
  background: rgba(16, 185, 129, 0.35);
  border-radius: 50%;
  animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes radar-ping {
  0% {
    transform: scale(0.6);
    opacity: 0.9;
  }
  75%, 100% {
    transform: scale(1.7);
    opacity: 0;
  }
}

.hero-status-text {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.status-chevron {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-3);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.status-chevron.is-rotated {
  transform: rotate(180deg);
  color: var(--color-accent);
}

.hero-status-pill:hover .status-chevron {
  color: var(--color-accent);
}

/* ── Popover Drawer ────────────── */
.status-popover {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  max-width: 90vw;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 16px 36px -8px rgba(15, 63, 47, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
  text-align: left;
  z-index: 30;
}

.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 12px;
}

.popover-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  background: rgba(15, 63, 47, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
}

.popover-status-tag {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  color: #10B981;
}

.popover-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}

.popover-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.popover-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-3);
}

.popover-val {
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--color-text);
}

.popover-footer {
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
}

.popover-cta-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  background: var(--color-accent);
  color: #f2e8cf;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 500;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.popover-cta-link:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

/* ── Popover Slide Animation ────────────── */
.popover-slide-enter-active,
.popover-slide-leave-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.popover-slide-enter-from,
.popover-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px) scale(0.96);
}

/* ── Entrance animation ───────────────────────────────── */
.hero-inner:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
