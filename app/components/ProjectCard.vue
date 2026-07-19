<template>
  <NuxtLink
    :to="'/projects/' + slug"
    class="project-row"
    :class="{ 'project-row--first': isFirst }"
    :aria-label="`${name} — view source on GitHub`"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Col 1: Index number -->
    <div class="project-col project-col-index" aria-hidden="true">
      <span class="project-index">{{ index }}</span>
    </div>

    <!-- Col 2: Logo Stamp -->
    <div class="project-col project-col-stamp" aria-hidden="true">
      <div class="project-stamp">
        <img v-if="logo" :src="logo" alt="" class="stamp-img" />
        <span v-else class="stamp-text">{{ name.charAt(0) }}</span>
      </div>
    </div>

    <!-- Col 3: Content -->
    <div class="project-col project-col-body">
      <div class="project-head">
        <h3 class="project-name">{{ name }}</h3>
        
        <span class="project-arrow" aria-hidden="true">
          <svg class="arrow-svg arrow-main" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          <svg class="arrow-svg arrow-clone" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
  logo?: string
}>()
</script>

<style scoped>
/* ── Row ─────────────────────────────────────────────── */
.project-row {
  display: grid;
  grid-template-columns: 48px 64px 1fr; /* 3 Columns */
  padding: 0;
  margin: 0;
  margin-top: -1px; /* Prevent double borders */
  border: 1px solid #0F3F2F;
  text-decoration: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative;
}

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 64px 80px 1fr; /* 3 Columns */
  }
}

.project-row:hover {
  background: rgba(242, 232, 207, 0.35);
  box-shadow: 0 16px 40px rgba(15, 63, 47, 0.04);
  border-color: #0F3F2F;
  transform: translateY(-2px);
  z-index: 10;
}

.project-row:active {
  transform: scale(0.995) translateY(0);
  transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
}

/* ── Columns ─────────────────────────────────────────── */
.project-col {
  display: flex;
}

/* Col 1: Index */
.project-col-index {
  padding: 36px 0 36px 24px;
}
@media (min-width: 768px) {
  .project-col-index { padding: 44px 0 44px 32px; }
}

.project-index {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-3);
  letter-spacing: 0.04em;
  padding-top: 4px;
  user-select: none;
}

/* Col 2: Stamp */
.project-col-stamp {
  padding: 36px 0;
  display: flex;
  align-items: flex-start;
}
@media (min-width: 768px) {
  .project-col-stamp {
    padding: 44px 0;
  }
}

/* Col 3: Body */
.project-col-body {
  padding: 36px 24px 36px 0;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  z-index: 1;
}
@media (min-width: 768px) {
  .project-col-body { padding: 44px 32px 44px 0; gap: 16px; }
}

.project-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between; /* Space out name and arrow */
  gap: 16px;
}

/* ── The Stamp ───────────────────────────────────────── */
.project-stamp {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(15, 63, 47, 0.2);
  border-radius: 0; /* Brutalist/Industrial sharp corners */
  background: rgba(15, 63, 47, 0.02);
  padding: 8px;
  flex-shrink: 0;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.stamp-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%) contrast(150%);
  opacity: 0.6;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.stamp-text {
  font-family: var(--font-mono); /* Use mono for industrial feel */
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-3);
  line-height: 1;
  transition: color 0.3s ease;
}

/* ── Typography ──────────────────────────────────────── */
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

.project-desc {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-3);
  line-height: 1.6;
  margin: 0;
  max-width: 480px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-3);
  padding: 4px 8px;
  border: 1px solid rgba(15, 63, 47, 0.15);
  border-radius: 9999px;
  white-space: nowrap;
}

/* ── Arrow ──────────────────────────────────────────── */

.project-arrow {
  color: var(--color-text-3);
  flex-shrink: 0;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  transition: color 0.25s ease;
}

.arrow-svg {
  position: absolute;
  inset: 0;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.arrow-clone {
  transform: translate(-100%, 100%);
}

/* ── Hover Effects ────────────────────────────────────── */
.project-row:hover .project-name {
  color: #0F3F2F;
}

.project-row:hover .project-arrow {
  color: #0F3F2F;
}

.project-row:hover .arrow-main {
  transform: translate(100%, -100%);
}

.project-row:hover .arrow-clone {
  transform: translate(0, 0);
}

.project-row:hover .project-stamp {
  border-color: #0F3F2F;
  background: rgba(15, 63, 47, 0.06);
  transform: scale(1.05);
}

.project-row:hover .stamp-img {
  filter: grayscale(0%);
  opacity: 1;
}

.project-row:hover .stamp-text {
  color: #0F3F2F;
}
</style>


