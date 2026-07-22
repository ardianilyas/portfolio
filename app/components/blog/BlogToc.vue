<template>
  <nav :class="[isMobile ? 'toc-inline-mobile' : 'toc-sidebar']" aria-label="Table of Contents">
    <div :class="{ 'toc-sidebar-inner': !isMobile }">
      <div class="toc-header">
        <span class="toc-dot"></span>
        <span class="toc-title">// {{ isMobile ? 'TABLE OF CONTENTS' : 'CONTENTS' }}</span>
      </div>
      <ul class="toc-list">
        <li v-for="link in tocLinks" :key="link.id" :class="['toc-item', `depth-${link.depth}`]">
          <a :href="`#${link.id}`" class="toc-link" :class="{ 'is-active': activeTocId === link.id }">
            <span class="toc-hash">#</span>
            <span class="toc-text">{{ link.text }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  tocLinks: {
    type: Array as () => Array<{ id: string; text: string; depth: number }>,
    default: () => []
  },
  activeTocId: {
    type: String,
    default: ''
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* ── Desktop Left Hanging TOC Sidebar (Absolute Outside Container) ── */
.toc-sidebar {
  display: none;
}

@media (min-width: 1280px) {
  .toc-sidebar {
    display: block;
    position: absolute;
    top: 220px;
    right: calc(100% + 40px); /* Hangs outside the left boundary of centered container */
    width: 220px;
    z-index: 20;
  }

  .toc-sidebar-inner {
    position: sticky;
    top: 140px;
    max-height: calc(100vh - 180px);
    overflow-y: auto;
    padding: 20px 18px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 3px solid var(--color-accent);
  }
}

/* ── Mobile & Tablet Inline TOC ─────────────────────────── */
.toc-inline-mobile {
  display: block;
  margin: 0 0 36px;
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
}

@media (min-width: 1280px) {
  .toc-inline-mobile {
    display: none;
  }
}

/* ── Shared TOC Styles ───────────────────────────────────── */
.toc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.toc-dot {
  width: 5px;
  height: 5px;
  background: var(--color-accent);
  border-radius: 50%;
}

.toc-title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-item.depth-3 {
  padding-left: 14px;
}

.toc-link {
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 13.5px;
  color: var(--color-text-2);
  text-decoration: none;
  line-height: 1.4;
  transition: all 0.2s ease;
}

.toc-hash {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-3);
  opacity: 0.5;
  transition: opacity 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.toc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.toc-link:hover, .toc-link.is-active {
  color: var(--color-accent);
  font-weight: 500;
  transform: translateX(3px);
}

.toc-link:hover .toc-hash, .toc-link.is-active .toc-hash {
  opacity: 1;
  color: var(--color-accent);
}
</style>
