<template>
  <NuxtLink
    :to="'/projects/' + slug"
    class="project-row"
    :class="{ 'project-row--first': isFirst }"
    :aria-label="`${name} — view source on GitHub`"
  >
    <!-- Index number -->
    <span class="project-index" aria-hidden="true">{{ index }}</span>

    <!-- Content -->
    <div class="project-body">
      <div class="project-head">
        <h3 class="project-name">{{ name }}</h3>
        <span class="project-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
      <p class="project-desc">{{ description }}</p>
      <div class="project-tags" aria-label="Technologies used">
        <span v-for="tag in tags" :key="tag" class="project-tag">{{ tag }}</span>
      </div>
    </div>

  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  tags: string[]
  github: string
  slug: string
  index: string
  isFirst?: boolean
}>()
</script>

<style scoped>
/* ── Row ─────────────────────────────────────────────── */
.project-row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 36px 24px;
  margin-bottom: 16px;
  border: 1px solid #0F3F2F;
  border-radius: 16px;
  text-decoration: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative;
}

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 64px 1fr;
    gap: 32px;
    padding: 44px 32px;
    margin-bottom: 16px;
  }
}

.project-row:hover {
  background: rgba(242, 232, 207, 0.35); /* Subtle light brown */
  box-shadow: 0 16px 40px rgba(15, 63, 47, 0.04);
  border-color: #0F3F2F;
  transform: translateY(-2px);
  z-index: 10;
}

.project-row:hover .project-name {
  color: #0F3F2F;
}

.project-row:hover .project-arrow {
  color: #0F3F2F;
  transform: translate(3px, -3px);
}

/* ── Index ────────────────────────────────────────────── */
.project-index {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-3);
  letter-spacing: 0.04em;
  padding-top: 4px;
  user-select: none;
}

/* ── Body ─────────────────────────────────────────────── */
.project-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.project-name {
  font-family: var(--font-sans);
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--color-text-2);
  margin: 0;
  line-height: 1.2;
  transition: color 0.2s;
}

.project-arrow {
  color: var(--color-text-3);
  flex-shrink: 0;
  margin-top: 2px;
  transition: color 0.2s, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
}

/* ── Desc ─────────────────────────────────────────────── */
.project-desc {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-3);
  line-height: 1.65;
  margin: 0;
  max-width: 68ch;
}

/* ── Tags ─────────────────────────────────────────────── */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--color-text-3);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 4px 10px;
  border-radius: 4px;
  transition: color 0.2s, border-color 0.2s;
}

.project-row:hover .project-tag {
  color: var(--color-text-2);
  border-color: var(--color-border-2);
}
</style>
