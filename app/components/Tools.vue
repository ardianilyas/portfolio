<template>
  <section id="tools" style="background-color: var(--color-bg);">

    <SectionHeader label="TOOLS" title="My toolbox" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">

        <div v-for="tool in tools" :key="tool.name" class="tool-card">
          <!-- GitHub uses inline SVG since the remote one doesn't load -->
          <svg v-if="tool.name === 'GitHub'" class="tool-icon-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <img
            v-else
            :src="tool.icon"
            :alt="tool.name"
            class="tool-icon"
            loading="lazy"
          />
          <span class="tool-name">{{ tool.name }}</span>
        </div>

      </div>
    </div>

    <!-- Bottom rule -->
    <div class="w-full h-px" style="background-color: var(--color-rule);"></div>
  </section>
</template>

<script setup lang="ts">
const tools = [
  { name: 'VS Code', icon: 'https://svgl.app/library/vscode.svg' },
  { name: 'Git', icon: 'https://svgl.app/library/git.svg' },
  { name: 'GitHub', icon: null },
  { name: 'Postman', icon: 'https://svgl.app/library/postman.svg' },
  { name: 'Figma', icon: 'https://svgl.app/library/figma.svg' },
]
</script>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-rule);
  background-color: var(--color-surface);
  cursor: default;
  transition: border-color 0.2s ease;
}

.tool-card:hover {
  border-color: var(--color-primary);
}

.tool-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.5);
  transition: filter 0.2s ease;
}

.tool-card:hover .tool-icon {
  filter: grayscale(0) opacity(1);
}

.tool-icon-svg {
  width: 36px;
  height: 36px;
  color: var(--color-hint);
  opacity: 0.5;
  transition: all 0.2s ease;
}

.tool-card:hover .tool-icon-svg {
  color: var(--color-primary);
  opacity: 1;
}

.tool-name {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  color: var(--color-hint);
  text-align: center;
  transition: color 0.2s ease;
}

.tool-card:hover .tool-name {
  color: var(--color-primary);
}
</style>
