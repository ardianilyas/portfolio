<template>
  <NuxtLink
    :to="'/projects/' + slug"
    class="bento-card"
    :class="{ 'bento-card--featured': isFeatured }"
    :aria-label="`${name} — view project details`"
  >
    <!-- Background Watermark/Logo -->
    <div class="bento-bg-watermark" aria-hidden="true">
      <img v-if="logo" :src="logo" alt="" class="bg-logo-img" />
      <span v-else class="bg-logo-text">{{ name.charAt(0) }}</span>
    </div>

    <!-- Card Header: Index & Arrow -->
    <div class="bento-card-header">
      <div class="bento-meta">
        <span class="bento-index">{{ index }}</span>
        <span v-if="year" class="bento-year">{{ year }}</span>
      </div>

      <span class="bento-arrow" aria-hidden="true">
        <svg class="arrow-svg arrow-main" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
        <svg class="arrow-svg arrow-clone" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </span>
    </div>

    <!-- Card Body: Title & Description -->
    <div class="bento-card-body">
      <h3 class="bento-title">{{ name }}</h3>
      <p class="bento-desc">{{ description }}</p>
    </div>

    <!-- Card Footer: Tech Tags -->
    <div class="bento-card-footer">
      <div class="bento-tags" aria-label="Technologies used">
        <span v-for="tag in tags" :key="tag" class="bento-tag">{{ tag }}</span>
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
  year?: string
  isFeatured?: boolean
  logo?: string
}>()
</script>

<style scoped>
/* ── Bento Card Base ──────────────────────────────────── */
.bento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  min-height: 280px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.3s ease, 
              background 0.3s ease;
  will-change: transform;
  transform: translateZ(0);
}

@media (min-width: 768px) {
  .bento-card {
    padding: 36px;
    min-height: 320px;
  }
}

/* Featured Card Variation (Bento Diversity) */
.bento-card--featured {
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%);
  border-color: var(--color-border-2);
}

.bento-card:hover {
  transform: translateY(-4px) translateZ(0);
  border-color: var(--color-accent);
  box-shadow: 0 20px 40px -15px rgba(15, 63, 47, 0.08);
}

.bento-card:active {
  transform: scale(0.99) translateY(-2px);
  transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
}

/* ── Card Header ─────────────────────────────────────── */
.bento-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.bento-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bento-index {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  background: var(--color-accent-dim);
  padding: 4px 10px;
  border-radius: 9999px;
}

.bento-year {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-3);
}

/* ── Arrow Button ────────────────────────────────────── */
.bento-arrow {
  display: inline-flex;
  position: relative;
  width: 20px;
  height: 20px;
  color: var(--color-text-3);
  overflow: hidden;
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

.bento-card:hover .bento-arrow {
  color: var(--color-accent);
}

.bento-card:hover .arrow-main {
  transform: translate(100%, -100%);
}

.bento-card:hover .arrow-clone {
  transform: translate(0, 0);
}

/* ── Card Body ───────────────────────────────────────── */
.bento-card-body {
  position: relative;
  z-index: 2;
  margin-top: 24px;
  margin-bottom: 24px;
}

.bento-title {
  font-family: var(--font-sans);
  font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--color-text);
  margin: 0 0 10px 0;
  line-height: 1.25;
  transition: color 0.2s;
}

.bento-card:hover .bento-title {
  color: var(--color-accent);
}

.bento-desc {
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0;
  max-width: 520px;
}

/* ── Card Footer / Tech Tags ─────────────────────────── */
.bento-card-footer {
  position: relative;
  z-index: 2;
  margin-top: auto;
}

.bento-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.bento-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-2);
  background: var(--color-surface);
  padding: 4px 10px;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  white-space: nowrap;
}

/* ── Background Watermark/Logo ───────────────────────── */
.bento-bg-watermark {
  position: absolute;
  right: -20px;
  bottom: -20px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.05;
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform: skewY(-6deg) scale(1);
}

.bg-logo-img {
  height: 160px;
  width: auto;
  object-fit: contain;
}

.bg-logo-text {
  font-family: var(--font-sans);
  font-size: 180px;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
}

.bento-card:hover .bento-bg-watermark {
  opacity: 0.12;
  transform: skewY(-6deg) scale(1.08) translate(-10px, -10px);
}
</style>
