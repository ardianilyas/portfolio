<template>
  <section id="tools" aria-labelledby="tools-heading" ref="toolsSection">
    <SectionHeader :title="$t('tools.heading')" />

    <div class="tools-wrap" :class="{ 'is-visible': isVisible }">
      <!-- Bento Grid with mouse tracking for spotlight -->
      <div 
        class="bento-grid max-w-[1100px] mx-auto fade-up fade-up-1" 
        ref="bentoGrid"
      >
        
        <!-- Large Philosophy Card (Spans 2x2 on desktop) -->
        <div class="bento-card philosophy-card">
          <div class="bento-card-inner"></div>
          <div class="bento-content">
            <div class="philosophy-content-wrap">
              <SplitText 
                text="Good tooling fades into the background. I choose tools that remove friction, scale with the project, and get out of the way so the work can speak for itself."
                class="philosophy-text"
                :staggerDelay="35"
              />
              <p class="philosophy-sub">
                The stack adapts to the problem — not the other way around.
              </p>
            </div>
          </div>
        </div>

        <!-- Tool Cards -->
        <div
          v-for="tool in tools"
          :key="tool.name"
          class="bento-card tool-card"
        >
          <div class="bento-card-inner"></div>
          <div class="bento-content">
            <!-- Icon block -->
            <div class="tool-icon-wrapper">
              <svg
                v-if="tool.name === 'GitHub'"
                class="tool-icon tool-icon--svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :aria-label="tool.name"
                role="img"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <img
                v-else
                :src="tool.icon"
                :alt="tool.name"
                class="tool-icon"
                loading="lazy"
                width="28"
                height="28"
              />
            </div>
            
            <!-- Text block -->
            <div class="tool-info">
              <div class="tool-name">{{ tool.name }}</div>
              <div class="tool-category">{{ tool.category }}</div>
            </div>
            
            <!-- Tooltip -->
            <div class="tool-tooltip">
              {{ tool.description }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const toolsSection = ref<HTMLElement | null>(null)
const bentoGrid = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  toolsSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 }
)

const onMouseMove = (e: MouseEvent) => {
  if (!bentoGrid.value) return
  
  const cards = bentoGrid.value.getElementsByClassName('bento-card') as HTMLCollectionOf<HTMLElement>
  
  for (const card of cards) {
    const rect = card.getBoundingClientRect()
    // Calculate cursor position relative to the card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Update CSS variables for the spotlight gradients
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }
}

const tools = [
  { name: 'Figma',   category: 'Design',          description: 'Where all wireframes and UI designs start.', icon: 'https://svgl.app/library/figma.svg' },
  { name: 'VS Code', category: 'Code Editor',     description: 'My primary editor for all development.', icon: 'https://svgl.app/library/vscode.svg' },
  { name: 'Git',     category: 'Version Control', description: 'Essential for tracking code changes locally.', icon: 'https://svgl.app/library/git.svg' },
  { name: 'GitHub',  category: 'Repository',      description: 'Where I store, review, and collaborate on code.', icon: null },
  { name: 'Vercel',  category: 'Deployment',      description: 'Frictionless deployments in seconds.', icon: 'https://api.iconify.design/logos:vercel-icon.svg' },
  { name: 'Postman', category: 'API Testing',     description: 'For testing and documenting REST APIs.', icon: 'https://svgl.app/library/postman.svg' },
  { name: 'Vitest',  category: 'Testing',         description: 'Blazing fast unit testing framework.', icon: 'https://svgl.app/library/vitest.svg' },
  { name: 'Safari',  category: 'Browser',         description: 'Used for web development and cross-browser testing.', icon: 'https://svgl.app/library/safari.svg' },
]
</script>

<style scoped>
/* ── Wrap ────────────────────────────────────────────── */
.tools-wrap {
  position: relative;
  padding: 0 24px 80px;
  background-color: var(--color-bg);
}

@media (min-width: 768px) {
  .tools-wrap {
    padding: 0 40px 100px;
  }
}



/* ── Bento Grid ───────────────────────────────────────── */
.bento-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 40px 0;
}

@media (min-width: 640px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(140px, auto);
  }
}

.bento-card {
  position: relative;
  border-radius: 0;
  border: 1px solid var(--color-border);
  margin-top: -1px;
  margin-left: -1px;
  background: var(--color-surface);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  will-change: transform;
  /* Ensure proper stacking */
  z-index: 1;
}

.bento-card:hover {
  transform: translateY(-2px);
  background: rgba(242, 232, 207, 0.35); /* Light brown tint matching project card */
  box-shadow: 0 16px 40px rgba(15, 63, 47, 0.04);
  border-color: var(--color-accent);
  z-index: 5;
}

/* ── Inner Wrapper ────────────────────────────────────── */
.bento-card-inner {
  position: absolute;
  inset: 0;
  background-color: transparent;
  border-radius: 0;
  z-index: 2;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.bento-content {
  position: relative;
  z-index: 4;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}
.bento-content * {
  pointer-events: auto;
}

/* ── Philosophy Card ──────────────────────────────────── */
.philosophy-card {
  grid-column: span 1;
  min-height: 200px;
}

@media (min-width: 640px) {
  .philosophy-card {
    min-height: 260px;
  }
}

.philosophy-card .bento-content {
  justify-content: center;
}

.philosophy-content-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 640px) {
  .philosophy-card {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .philosophy-card {
    grid-column: span 2;
    grid-row: span 2;
  }
}

.philosophy-text {
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0;
}

.philosophy-sub {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: var(--color-text-3);
  margin: 0;
}

/* ── Tool Cards ───────────────────────────────────────── */
.tool-card {
  min-height: 140px;
}

.tool-card .bento-content {
  justify-content: space-between;
}

.bento-card:active {
  transform: scale(0.995) translateY(0);
  transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
}

/* ── Icon ─────────────────────────────────────────────── */
.tool-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 0;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  margin-bottom: 16px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.bento-card:hover .tool-icon-wrapper {
  transform: scale(1.08) translateY(-2px);
  background-color: rgba(242, 232, 207, 0.5);
  border-color: #0F3F2F;
}

.tool-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
}

.tool-icon--svg {
  color: var(--color-text-2);
  transition: color 0.3s ease;
}

.bento-card:hover .tool-icon--svg {
  color: var(--color-accent);
}

/* ── Info block ───────────────────────────────────────── */
.tool-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-card:hover .tool-info {
  transform: translateX(4px);
}

.tool-name {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.bento-card:hover .tool-name {
  color: var(--color-accent);
}

.tool-category {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-3);
  line-height: 1.2;
}

/* ── Tooltip ──────────────────────────────────────────── */
.tool-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: rgba(250, 250, 248, 0.95);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 10px 16px;
  border-radius: 0;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 20;
  box-shadow: 0 10px 30px -5px rgba(15, 63, 47, 0.15);
}

.tool-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: var(--color-border) transparent transparent transparent;
  /* Masking out the inner part to match the glass effect is complex with borders, 
     so we just use a matching solid color or border color for the tiny arrow */
}

.bento-card:hover .tool-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Hide tooltips on mobile — touch devices can't hover */
@media (hover: none) {
  .tool-tooltip {
    display: none;
  }
  .bento-card:hover {
    transform: none;
  }
}

/* Visibility triggers for animations */
.tools-wrap:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(30px);
}
</style>
