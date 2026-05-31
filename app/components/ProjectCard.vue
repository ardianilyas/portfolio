<template>
  <a
    :href="github"
    target="_blank"
    rel="noopener noreferrer"
    class="project-card group"
  >
    <!-- Project Name & Arrow -->
    <div class="flex justify-between items-start mb-2">
      <h3 class="project-name">{{ name }}</h3>
      <div class="project-arrow">
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </div>

    <!-- Description -->
    <p class="project-desc">{{ description }}</p>

    <!-- Tech Tags -->
    <div class="flex flex-wrap gap-2 mt-4 mb-5">
      <span v-for="tag in tags" :key="tag" class="project-tag">
        {{ tag }}
      </span>
    </div>

    <!-- Bottom Action Area -->
    <div class="project-footer">
      <div class="project-link">
        <svg class="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>View Source</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  tags: string[]
  github: string
}>()
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

/* Subtle glow effect before hover */
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(0, 0, 0, 0.03), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.02);
  transform: translateY(-4px);
}

.project-card:hover::before {
  opacity: 1;
}

.project-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.project-arrow {
  color: var(--color-hint);
  transition: color 0.3s ease;
  padding: 4px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid transparent;
}

.project-card:hover .project-arrow {
  color: var(--color-bg);
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.project-desc {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tag {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 4px 10px;
  border-radius: 9999px; /* Pill shape */
  background-color: var(--color-surface);
  color: var(--color-hint);
  border: 1px solid var(--color-rule);
  transition: all 0.3s ease;
}

.project-card:hover .project-tag {
  border-color: rgba(0,0,0,0.1);
  background-color: #FFFFFF;
}

.project-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--color-rule);
}

.project-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-hint);
  transition: color 0.3s ease;
}

.project-card:hover .project-link {
  color: var(--color-primary);
}
</style>
