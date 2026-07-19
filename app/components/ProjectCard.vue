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

    <!-- Absolute Skewed Logo Background -->
    <div class="project-logo-bg" aria-hidden="true">
      <img v-if="logo" :src="logo" alt="" class="project-logo-full" />
      <span v-else class="project-logo-text-full">{{ name.charAt(0) }}</span>
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
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 36px 140px 36px 24px; /* Added right padding for the absolute logo */
  margin: 0;
  margin-top: -1px; /* Prevent double borders */
  border: 1px solid #0F3F2F;
  text-decoration: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden; /* Important for the background logo */
}

@media (min-width: 768px) {
  .project-row {
    grid-template-columns: 64px 1fr;
    gap: 32px;
    padding: 44px 220px 44px 32px;
    margin: 0;
    margin-top: -1px;
  }
}

.project-row:hover {
  background: rgba(242, 232, 207, 0.35); /* Subtle light brown */
  box-shadow: 0 16px 40px rgba(15, 63, 47, 0.04);
  border-color: #0F3F2F;
  transform: translateY(-2px);
  z-index: 10;
}

.project-row:active {
  transform: scale(0.995) translateY(0);
  transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
}

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

.project-row:hover .project-logo-full {
  opacity: 0.6;
  filter: grayscale(0%);
  transform: scale(1); /* Smooth scale down on hover */
}

.project-row:hover .project-logo-text-full {
  opacity: 0.25;
  transform: scale(1.1) translateX(10px);
}

/* ── Full Skewed Logo Background ──────────────────────── */
.project-logo-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 140px;
  clip-path: polygon(30px 0, 100% 0, 100% 100%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  pointer-events: none;
}

@media (min-width: 768px) {
  .project-logo-bg {
    width: 240px;
    clip-path: polygon(60px 0, 100% 0, 100% 100%, 0 100%);
  }
}

.project-logo-full {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure image fills the entire skewed container height */
  opacity: 0.2;
  filter: grayscale(100%);
  transition: opacity 0.5s ease, filter 0.5s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(1.1); /* Starts slightly scaled up for parallax effect */
  transform-origin: center right;
}

.project-logo-text-full {
  font-family: var(--font-sans);
  font-size: 80px;
  font-weight: 800;
  color: #0F3F2F; 
  opacity: 0.1;
  line-height: 1;
  padding-left: 20px; /* Visual centering inside skew */
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 768px) {
  .project-logo-text-full {
    font-size: 140px;
    padding-left: 40px;
  }
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

.arrow-main {
  transform: translate(0, 0);
}

.arrow-clone {
  transform: translate(-100%, 100%);
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
  margin-top: 6px;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4A5551;
  background: rgba(15, 63, 47, 0.04);
  border: 1px solid rgba(15, 63, 47, 0.18);
  padding: 4px 9px;
  border-radius: 0;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.project-row:hover .project-tag {
  color: #0F3F2F;
  border-color: #0F3F2F;
  background: rgba(15, 63, 47, 0.08);
}
</style>
