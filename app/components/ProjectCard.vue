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
        <div class="project-head-right">
          <!-- Inline Skewed Logo Badge -->
          <div class="project-inline-logo" aria-hidden="true">
            <img v-if="logo" :src="logo" alt="" class="inline-logo-img" />
            <span v-else class="inline-logo-text">{{ name.charAt(0) }}</span>
          </div>

          <span class="project-arrow" aria-hidden="true">
            <svg class="arrow-svg arrow-main" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
            <svg class="arrow-svg arrow-clone" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>
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
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 36px 24px;
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
    grid-template-columns: 64px 1fr;
    gap: 32px;
    padding: 44px 32px;
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

.project-row:hover .inline-logo-img {
  opacity: 1;
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.05); /* Slight zoom on hover */
}

.project-row:hover .inline-logo-text {
  color: #0F3F2F;
  opacity: 1;
  transform: scale(1.1);
}

.project-row:hover .project-inline-logo {
  border-color: #0F3F2F;
}

/* ── Inline Logo Badge ────────────────────────────────── */
.project-head-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.project-inline-logo {
  width: 56px;
  height: 36px;
  /* NO green background, the image itself acts as the background */
  clip-path: polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%); /* Skewed shape */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.inline-logo-text {
  font-family: var(--font-sans);
  font-size: 20px;
  font-weight: 800;
  color: var(--color-text-3); /* Muted text if no logo */
  line-height: 1;
  transition: opacity 0.3s ease, color 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.inline-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Image completely fills the skewed badge */
  opacity: 0.4;
  filter: grayscale(100%) contrast(120%);
  transition: opacity 0.3s ease, filter 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
