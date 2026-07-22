<template>
  <div class="prose-pre-wrapper group">
    <!-- Language Tag -->
    <span v-if="language" class="prose-pre-lang">{{ language }}</span>
    
    <!-- Copy Button with SVG -->
    <button @click="copyCode" class="prose-pre-copy" :class="{ 'is-copied': copied }" aria-label="Copy code" title="Copy code">
      <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="0" />
        <path d="M5 15H4V4h9v1" />
      </svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
    
    <!-- Code Block -->
    <pre :class="$attrs.class" :style="$attrs.style as any"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  }
})

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
.prose-pre-wrapper {
  position: relative;
  margin: 2.5em 0;
  border: 1px solid var(--color-border);
  transition: border-color 0.2s ease;
}

.prose-pre-wrapper:hover {
  border-color: rgba(15, 63, 47, 0.4);
}

/* Language Tag (Top Left) */
.prose-pre-lang {
  position: absolute;
  top: -1px;
  left: -1px;
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-2);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-left: 2px solid var(--color-accent);
  z-index: 2;
  letter-spacing: 0.05em;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.prose-pre-wrapper:hover .prose-pre-lang {
  color: var(--color-accent);
  border-color: rgba(15, 63, 47, 0.4);
  border-left-color: var(--color-accent);
}

/* Copy Button (Top Right, Sharp 0px) */
.prose-pre-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  color: var(--color-text-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
}

.prose-pre-wrapper:hover .prose-pre-copy {
  opacity: 1;
  transform: translateY(0);
}

.prose-pre-copy:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-surface-2);
}

.prose-pre-copy.is-copied {
  opacity: 1;
  color: #FAFAF8;
  background: var(--color-accent);
  border-color: var(--color-accent);
}

/* Base Pre Reset */
pre {
  margin: 0;
  padding: 38px 24px 24px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.65;
}
</style>
