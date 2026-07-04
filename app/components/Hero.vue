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

      <!-- Kinetic Headline with circular cursor reveal -->
      <div class="hero-headline-wrap fade-up fade-up-1" ref="headlineWrap">
        <!-- Gray base layer -->
        <h1 class="hero-headline headline-base">
          <span
            v-for="(word, i) in headlineWords"
            :key="'base-' + i"
            class="hero-word"
            :class="{ 'hero-word--accent': word.accent, 'hero-word--active': wordActive[i] }"
            :style="wordStyles[i]"
          >{{ word.text }}</span>
        </h1>
        <!-- Black reveal layer (masked by circular cursor) -->
        <h1
          class="hero-headline headline-reveal"
          :style="revealMaskStyle"
          aria-hidden="true"
        >
          <span
            v-for="(word, i) in headlineWords"
            :key="'reveal-' + i"
            class="hero-word"
            :class="{ 'hero-word--active': wordActive[i] }"
            :style="wordStyles[i]"
          >{{ word.text }}</span>
        </h1>
      </div>

      <!-- Sub -->
      <p class="hero-sub fade-up fade-up-2">
        I'm Ardian Ilyas — a Full-Stack Developer transforming complex requirements
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
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const heroSection = ref<HTMLElement | null>(null)
const headlineWrap = ref<HTMLElement | null>(null)
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
  { text: 'Code', accent: false },
  { text: 'that', accent: false },
  { text: 'scales.', accent: false },
  { text: 'Design', accent: false },
  { text: 'that', accent: true },
  { text: 'feels.', accent: true },
]

// ── Mouse state ─────────────────────────────────────────
const mouse = reactive({ x: 0, y: 0 })
const isHovering = ref(false)

// Relative position inside headline-wrap for the CSS mask
const relMouse = reactive({ x: -9999, y: -9999 })

// ── Magnetic push offsets ───────────────────────────────
const wordTargets = reactive<{ x: number; y: number }[]>(
  headlineWords.map(() => ({ x: 0, y: 0 }))
)
const wordSmooth = reactive<{ x: number; y: number }[]>(
  headlineWords.map(() => ({ x: 0, y: 0 }))
)

// Track which words are within the cursor circle
const wordActive = reactive<boolean[]>(
  headlineWords.map(() => false)
)

let animFrame = 0

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  isHovering.value = true

  // Calculate position relative to headline-wrap for the mask
  if (headlineWrap.value) {
    const rect = headlineWrap.value.getBoundingClientRect()
    relMouse.x = e.clientX - rect.left
    relMouse.y = e.clientY - rect.top
  }
}

function onMouseLeave() {
  isHovering.value = false
  relMouse.x = -9999
  relMouse.y = -9999
  for (let i = 0; i < wordTargets.length; i++) {
    wordTargets[i].x = 0
    wordTargets[i].y = 0
  }
}

function calcPush() {
  if (!headlineWrap.value || !isHovering.value) return

  const words = headlineWrap.value.querySelectorAll('.headline-base .hero-word')
  words.forEach((el, i) => {
    const rect = (el as HTMLElement).getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = mouse.x - cx
    const dy = mouse.y - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    const pushRadius = 300
    const maxPush = 8
    const activeRadius = 180 // words within this radius get the "active" class

    wordActive[i] = dist < activeRadius

    if (dist < pushRadius) {
      const force = (1 - dist / pushRadius) * maxPush
      const angle = Math.atan2(dy, dx)
      wordTargets[i].x = -Math.cos(angle) * force
      wordTargets[i].y = -Math.sin(angle) * force
    } else {
      wordTargets[i].x = 0
      wordTargets[i].y = 0
    }
  })
}

function loop() {
  calcPush()

  const lerp = 0.1
  for (let i = 0; i < wordSmooth.length; i++) {
    wordSmooth[i].x += (wordTargets[i].x - wordSmooth[i].x) * lerp
    wordSmooth[i].y += (wordTargets[i].y - wordSmooth[i].y) * lerp
  }

  animFrame = requestAnimationFrame(loop)
}

// ── Computed styles ─────────────────────────────────────
const wordStyles = computed(() =>
  wordSmooth.map((o) => ({
    transform: `translate(${o.x.toFixed(2)}px, ${o.y.toFixed(2)}px)`,
  }))
)

const revealMaskStyle = computed(() => ({
  maskImage: `radial-gradient(circle 180px at ${relMouse.x}px ${relMouse.y}px, black 50%, transparent 100%)`,
  WebkitMaskImage: `radial-gradient(circle 180px at ${relMouse.x}px ${relMouse.y}px, black 50%, transparent 100%)`,
}))

onMounted(() => {
  animFrame = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})
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

/* ── Headline container ───────────────────────────────── */
.hero-headline-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

/* ── Shared headline styles ───────────────────────────── */
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
}

/* Gray base layer — lighter gray for stronger contrast with the reveal */
.headline-base {
  color: #D4D4D8; /* zinc-300, soft and light */
}

/* Black reveal layer — pure black, masked by circular cursor */
.headline-reveal {
  position: absolute;
  inset: 0;
  color: #0A0A0A; /* pure black, no gray bleed */
  pointer-events: none;
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
}

/* ── Individual words ─────────────────────────────────── */
.hero-word {
  display: inline-block;
  will-change: transform;
  cursor: default;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Accent-colored words (like "your team" in the reference) */
.hero-word--accent {
  color: var(--color-accent);
}

/* Reveal layer accent words keep their accent color */
.headline-reveal .hero-word--accent {
  color: var(--color-accent);
}

/* Words inside the cursor circle get a subtle lift + scale */
.hero-word--active {
  transform: translateY(-3px) scale(1.04) !important;
}

/* Mobile: gentle idle sway since no cursor */
@media (hover: none) {
  .headline-reveal {
    /* On mobile, just show the text as black */
    mask-image: none !important;
    -webkit-mask-image: none !important;
    color: var(--color-text);
  }
  .headline-base {
    color: var(--color-border-2);
  }
  .hero-word {
    animation: idle-sway 4s ease-in-out infinite;
  }
  .hero-word:nth-child(odd) {
    animation-delay: -1s;
    animation-duration: 4.5s;
  }
  .hero-word:nth-child(3n) {
    animation-delay: -2.2s;
    animation-duration: 5s;
  }
}

@keyframes idle-sway {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-2px); }
  75% { transform: translateY(2px); }
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
  border-radius: 9999px;
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
  border-radius: 9999px;
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
