<template>
  <section id="tools">

    <SectionHeader label="TOOLS" title="My toolbox" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 overflow-visible">
      
      <!-- Mobile View (Auto-scrolling Marquee) -->
      <div class="flex md:hidden overflow-hidden pt-24 pb-10 px-0 -mx-6 relative w-screen">
        
        <!-- Edge Gradients for smooth fade in/out -->
        <div class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-20 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-20 pointer-events-none"></div>

        <div class="marquee-track flex w-max">
          <!-- Set 1 -->
          <div class="flex gap-4 pr-4">
            <div 
              v-for="tool in tools" 
              :key="`set1-${tool.name}`" 
              class="tool-card group shrink-0"
              :style="{
                '--card-rotate': '0deg',
                '--card-y': '0px',
                '--card-z': 10
              }"
            >
              <!-- Custom Tooltip -->
              <div class="custom-tooltip">{{ tool.name }}</div>

              <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
            </div>
          </div>
          <!-- Set 2 (Duplicate for seamless loop) -->
          <div class="flex gap-4 pr-4">
            <div 
              v-for="tool in tools" 
              :key="`set2-${tool.name}`" 
              class="tool-card group shrink-0"
              :style="{
                '--card-rotate': '0deg',
                '--card-y': '0px',
                '--card-z': 10
              }"
            >
              <!-- Custom Tooltip -->
              <div class="custom-tooltip">{{ tool.name }}</div>

              <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View (1 row of items) -->
      <div class="hidden md:flex flex-row justify-center items-center -space-x-4 py-10 px-4 overflow-visible min-h-[220px]">
        <div 
          v-for="(tool, index) in tools" 
          :key="tool.name" 
          class="tool-card group"
          :style="{
            '--card-rotate': `${randomRotations[index % randomRotations.length]}deg`,
            '--card-y': `${randomY[index % randomY.length]}px`,
            '--card-z': 10 - Math.round(Math.abs(index - (tools.length - 1)/2))
          }"
        >
          <!-- Custom Tooltip -->
          <div class="custom-tooltip">{{ tool.name }}</div>
          <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Bottom rule -->
    <GridDivider />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const tools = [
  { name: 'Figma', icon: 'https://svgl.app/library/figma.svg' },
  { name: 'Postman', icon: 'https://svgl.app/library/postman.svg' },
  { name: 'VS Code', icon: 'https://svgl.app/library/vscode.svg' },
  { name: 'Git', icon: 'https://svgl.app/library/git.svg' },
  { name: 'GitHub', icon: null },
  { name: 'Vercel', icon: 'https://api.iconify.design/logos:vercel-icon.svg' },
  { name: 'Vitest', icon: 'https://svgl.app/library/vitest.svg' },
  { name: 'Safari', icon: 'https://svgl.app/library/safari.svg' },
]

const randomRotations = [-4, 6, -2, 7, -6, 3, -8, 5]
const randomY = [12, -8, 14, -12, 8, -16, 10, -6]

const toolsRow1 = computed(() => tools.slice(0, 4))
const toolsRow2 = computed(() => tools.slice(4, 8))
</script>

<style scoped>
.tool-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  border: 4px solid #FFFFFF;
  background-color: var(--color-surface);
  cursor: pointer;
  z-index: var(--card-z);
  transform: translateY(var(--card-y)) rotate(var(--card-rotate));
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
}

@media (min-width: 480px) {
  .tool-card {
    width: 80px;
    height: 80px;
    border-radius: 18px;
  }
}

@media (min-width: 640px) {
  .tool-card {
    width: 86px;
    height: 86px;
  }
}

@media (min-width: 768px) {
  .tool-card {
    width: 106px;
    height: 106px;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
  }
}

/* Hover effects */
.tool-card:hover {
  transform: translateY(calc(var(--card-y) - 14px)) rotate(var(--card-rotate)) scale(1.15);
  z-index: 50 !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.09), 0 4px 12px rgba(0, 0, 0, 0.03);
}

.tool-icon, .tool-icon-svg {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.6);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--color-hint);
}

@media (min-width: 480px) {
  .tool-icon, .tool-icon-svg {
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 640px) {
  .tool-icon, .tool-icon-svg {
    width: 44px;
    height: 44px;
  }
}

@media (min-width: 768px) {
  .tool-icon, .tool-icon-svg {
    width: 52px;
    height: 52px;
  }
}

.tool-card:hover .tool-icon {
  filter: grayscale(0) opacity(1);
  transform: scale(1.05);
}

.tool-card:hover .tool-icon-svg {
  color: var(--color-primary);
  opacity: 1;
  transform: scale(1.05);
}

.custom-tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background: var(--color-primary);
  color: var(--color-bg);
  padding: 6px 12px;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
}

@media (min-width: 768px) {
  .custom-tooltip {
    top: -45px;
    font-size: 14px;
    padding: 6px 14px;
  }
}

.tool-card:hover .custom-tooltip {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  top: -50px;
}

@media (min-width: 768px) {
  .tool-card:hover .custom-tooltip {
    top: -55px;
  }
}

/* Auto-scrolling Marquee */
.marquee-track {
  animation: scroll-marquee 20s linear infinite;
}

/* Pause on hover/touch so user can click/read */
.marquee-track:hover,
.marquee-track:active {
  animation-play-state: paused;
}

@keyframes scroll-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
