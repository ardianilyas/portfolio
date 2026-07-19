<template>
  <NuxtLink
    :to="'/projects/' + slug"
    class="project-row"
    :class="{ 'project-row--first': isFirst }"
    :aria-label="`${name} — view source on GitHub`"
  >
    <!-- Col 1: Index number -->
    <div class="project-col project-col-index" aria-hidden="true">
      <span class="project-index">{{ index }}</span>
    </div>

    <!-- Col 2: Content -->
    <div class="project-col project-col-body">
      <div class="project-head">
        <h3 class="project-name">{{ name }}</h3>
      </div>
      <p class="project-desc">{{ description }}</p>
      <div class="project-tags" aria-label="Technologies used">
        <span v-for="tag in tags" :key="tag" class="project-tag">{{ tag }}</span>
      </div>
    </div>

    <!-- Col 3: Massive Skewed Logo -->
    <div class="project-col project-col-logo" aria-hidden="true">
      <img v-if="logo" :src="logo" alt="" class="col-logo-img" />
      <span v-else class="col-logo-text">{{ name.charAt(0) }}</span>
    </div>

    <!-- Col 4: Arrow -->
    <div class="project-col project-col-arrow" aria-hidden="true">
      <span class="project-arrow">
        <svg class="arrow-svg arrow-main" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
        <svg class="arrow-svg arrow-clone" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </span>
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
  grid-template-columns: 48px 1fr 32px; /* Mobile: Hide Logo */
  padding: 0;
  margin: 0;
  margin-top: -1px; /* Prevent double borders */
  border: 1px solid #0F3F2F;
  text-decoration: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 64px 1fr 180px 64px; /* Desktop: 4 Columns */
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

/* Col 2: Body */
.project-col-body {
  padding: 36px 16px;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}
@media (min-width: 768px) {
  .project-col-body { padding: 44px 32px; gap: 16px; }
}

.project-head {
  display: flex;
  align-items: flex-start;
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

/* Col 3: Logo */
.project-col-logo {
  display: none; /* Hide on mobile */
  align-items: center;
  justify-content: center;
  /* Removed clip-path to prevent chopping the logo */
}
@media (min-width: 768px) {
  .project-col-logo { display: flex; }
}

.col-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the whole wordmark is visible */
  object-position: center right; /* Align it towards the arrow */
  opacity: 0.25;
  filter: grayscale(100%);
  /* Apply vertical skew (uphill slant from bottom-left to top-right) instead of italic */
  transform: skewY(-10deg) scale(1);
  transition: opacity 0.5s ease, filter 0.5s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.col-logo-text {
  font-family: var(--font-sans);
  font-size: 80px;
  font-weight: 800;
  color: #0F3F2F; 
  opacity: 0.1;
  line-height: 1;
  transform: skewY(-10deg); /* Apply uphill skew to fallback text too */
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Col 4: Arrow */
.project-col-arrow {
  padding: 36px 24px 36px 0;
  justify-content: flex-end;
}
@media (min-width: 768px) {
  .project-col-arrow { padding: 44px 32px 44px 0; }
}

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

.project-row:hover .col-logo-img {
  opacity: 0.7;
  filter: grayscale(0%);
  transform: skewY(-10deg) scale(1.05) translateX(-8px);
}

.project-row:hover .col-logo-text {
  opacity: 0.25;
  transform: skewY(-10deg) scale(1.1) translateX(10px);
}
</style>
