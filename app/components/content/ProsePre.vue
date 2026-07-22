<template>
  <div class="prose-pre-wrapper group">
    <!-- Language Tag -->
    <span v-if="language" class="prose-pre-lang">{{ language }}</span>
    
    <!-- Copy Button -->
    <button @click="copyCode" class="prose-pre-copy" :class="{ 'is-copied': copied }" aria-label="Copy code">
      <span v-if="!copied">Copy</span>
      <span v-else class="copied-text">Copied!</span>
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

/* Language Tag (Top Left or Right) - Let's put it top left */
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
  border-left: 1px solid var(--color-accent); /* Green accent left border */
  z-index: 2;
  letter-spacing: 0.05em;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.prose-pre-wrapper:hover .prose-pre-lang {
  color: var(--color-accent);
  border-color: rgba(15, 63, 47, 0.4);
}

/* Copy Button (Top Right) */
.prose-pre-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  opacity: 0; /* Hidden by default */
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
}

.prose-pre-copy.is-copied {
  opacity: 1;
  color: var(--color-surface);
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.copied-text {
  font-weight: 600;
}

/* Base Pre Reset */
pre {
  margin: 0;
  padding: 36px 24px 24px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.6;
}
</style>
