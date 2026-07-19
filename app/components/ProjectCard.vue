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

    <!-- Col 2: Content -->
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

    <!-- Floating Cursor Reveal (Awwwards Style) -->
    <Teleport to="body">
      <div 
        v-if="logo"
        class="project-cursor-follower" 
        :class="{ 'is-active': isHovered }"
        :style="{ transform: `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0) scale(${isHovered ? 1 : 0.5}) rotate(${isHovered ? 0 : 5}deg)` }"
      >
        <img :src="logo" class="follower-img" alt="" />
      </div>
    </Teleport>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'

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

const isHovered = ref(false)
const { x, y } = useMouse({ type: 'client' }) // client coordinates are perfect for position: fixed
</script>

<style scoped>
/* ── Row ─────────────────────────────────────────────── */
.project-row {
  display: grid;
  grid-template-columns: 48px 1fr; /* 2 Columns */
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
    grid-template-columns: 64px 1fr; /* 2 Columns */
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
</style>

<style>
/* 
  Global styles for the teleported cursor follower.
  Must be unscoped because it is teleported to the body! 
*/
.project-cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  pointer-events: none; /* Let mouse interact with things beneath */
  z-index: 99999;
  opacity: 0;
  /* Add a tiny delay to the transform to create a smooth lagging/spring effect */
  transition: opacity 0.3s ease, transform 0.15s ease-out;
  display: none; /* Hide on mobile */
}

@media (min-width: 768px) {
  .project-cursor-follower {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.project-cursor-follower.is-active {
  opacity: 1;
}

.follower-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  /* Add a soft glow/shadow to lift it off the page */
  filter: drop-shadow(0 20px 30px rgba(15, 63, 47, 0.15));
}
</style>
