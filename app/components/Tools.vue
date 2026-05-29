<template>
  <section id="tools" style="background-color: var(--color-bg);">

    <SectionHeader label="TOOLS" title="My toolbox" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 overflow-visible">
      
      <!-- Mobile View (2 rows of 4 items) -->
      <div class="flex md:hidden flex-col gap-10 py-6 overflow-visible items-center">
        <!-- Row 1 -->
        <div class="flex flex-row justify-center items-center -space-x-6 overflow-visible">
          <div 
            v-for="(tool, index) in toolsRow1" 
            :key="tool.name" 
            class="tool-card group"
            :title="tool.name"
            :style="{
              '--card-rotate': `${(index - (toolsRow1.length - 1)/2) * 5}deg`,
              '--card-y': `${Math.abs(index - (toolsRow1.length - 1)/2) * Math.abs(index - (toolsRow1.length - 1)/2) * 4}px`,
              '--card-z': 10 - Math.round(Math.abs(index - (toolsRow1.length - 1)/2))
            }"
          >
            <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
          </div>
        </div>
        <!-- Row 2 -->
        <div class="flex flex-row justify-center items-center -space-x-6 overflow-visible">
          <div 
            v-for="(tool, index) in toolsRow2" 
            :key="tool.name" 
            class="tool-card group"
            :title="tool.name"
            :style="{
              '--card-rotate': `${(index - (toolsRow2.length - 1)/2) * 5}deg`,
              '--card-y': `${Math.abs(index - (toolsRow2.length - 1)/2) * Math.abs(index - (toolsRow2.length - 1)/2) * 4}px`,
              '--card-z': 10 - Math.round(Math.abs(index - (toolsRow2.length - 1)/2))
            }"
          >
            <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- Desktop View (1 row of 8 items) -->
      <div class="hidden md:flex flex-row justify-center items-center -space-x-8 py-10 px-4 overflow-visible min-h-[220px]">
        <div 
          v-for="(tool, index) in tools" 
          :key="tool.name" 
          class="tool-card group"
          :title="tool.name"
          :style="{
            '--card-rotate': `${(index - (tools.length - 1)/2) * 4.5}deg`,
            '--card-y': `${Math.abs(index - (tools.length - 1)/2) * Math.abs(index - (tools.length - 1)/2) * 3.5}px`,
            '--card-z': 10 - Math.round(Math.abs(index - (tools.length - 1)/2))
          }"
        >
          <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <img v-else :src="tool.icon" :alt="tool.name" class="tool-icon" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Bottom rule -->
    <div class="w-full h-px" style="background-color: var(--color-rule);"></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const tools = [
  { name: 'Figma', icon: 'https://svgl.app/library/figma.svg' },
  { name: 'Postman', icon: 'https://svgl.app/library/postman.svg' },
  { name: 'VS Code', icon: 'https://svgl.app/library/vscode.svg' },
  { name: 'Docker', icon: 'https://svgl.app/library/docker.svg' },
  { name: 'Golang', icon: 'https://svgl.app/library/golang.svg' },
  { name: 'Node.js', icon: 'https://svgl.app/library/nodejs.svg' },
  { name: 'Git', icon: 'https://svgl.app/library/git.svg' },
  { name: 'GitHub', icon: null },
]

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
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.4s, box-shadow 0.4s, background-color 0.3s ease;
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
  transition: all 0.3s ease;
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
</style>
