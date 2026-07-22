<template>
  <blockquote :class="['custom-callout', `callout-${calloutType}`]">
    <div class="callout-header">
      <span class="callout-icon"></span>
      <span class="callout-title">// {{ calloutTitle }}</span>
    </div>
    <div class="callout-body">
      <slot />
    </div>
  </blockquote>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

function getTextFromVNodes(vnodes: any[]): string {
  let str = ''
  if (!vnodes || !Array.isArray(vnodes)) return str
  for (const node of vnodes) {
    if (typeof node.children === 'string') {
      str += node.children
    } else if (Array.isArray(node.children)) {
      str += getTextFromVNodes(node.children)
    }
  }
  return str
}

// Detect callout type from slot content text
const calloutType = computed(() => {
  const defaultSlot = slots.default ? slots.default() : []
  const text = getTextFromVNodes(defaultSlot)
  
  if (text.includes('[!WARNING]') || text.includes('WARNING:')) return 'warning'
  if (text.includes('[!TIP]') || text.includes('TIP:')) return 'tip'
  if (text.includes('[!IMPORTANT]') || text.includes('IMPORTANT:')) return 'important'
  if (text.includes('[!CAUTION]') || text.includes('CAUTION:')) return 'caution'
  if (text.includes('[!INFO]') || text.includes('INFO:')) return 'info'
  return 'note'
})

const calloutTitle = computed(() => {
  switch (calloutType.value) {
    case 'warning': return 'WARNING'
    case 'tip': return 'TIP'
    case 'important': return 'IMPORTANT'
    case 'caution': return 'CAUTION'
    case 'info': return 'INFO'
    default: return 'NOTE'
  }
})
</script>

<style scoped>
.custom-callout {
  position: relative;
  margin: 2em 0;
  padding: 20px 24px;
  background: rgba(15, 63, 47, 0.04);
  border: 1px solid rgba(15, 63, 47, 0.15);
  border-left: 3px solid var(--color-accent);
  font-style: normal;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.callout-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.callout-icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.callout-title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.callout-body :deep(p) {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--color-text-2);
}

/* ── Callout Types Color Themes ─────────────────────────── */

/* TIP (Emerald Green) */
.callout-tip {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
  border-left-color: #10B981;
}
.callout-tip .callout-icon,
.callout-tip .callout-title {
  background: #10B981;
  color: #059669;
}
.callout-tip .callout-icon {
  background: #10B981;
}

/* WARNING (Amber Gold) */
.callout-warning {
  background: rgba(217, 119, 6, 0.05);
  border-color: rgba(217, 119, 6, 0.2);
  border-left-color: #D97706;
}
.callout-warning .callout-title {
  color: #D97706;
}
.callout-warning .callout-icon {
  background: #D97706;
}

/* IMPORTANT (Slate Blue) */
.callout-important, .callout-info {
  background: rgba(37, 99, 235, 0.05);
  border-color: rgba(37, 99, 235, 0.2);
  border-left-color: #2563EB;
}
.callout-important .callout-title,
.callout-info .callout-title {
  color: #2563EB;
}
.callout-important .callout-icon,
.callout-info .callout-icon {
  background: #2563EB;
}

/* CAUTION (Rose Red) */
.callout-caution {
  background: rgba(225, 29, 72, 0.05);
  border-color: rgba(225, 29, 72, 0.2);
  border-left-color: #E11D48;
}
.callout-caution .callout-title {
  color: #E11D48;
}
.callout-caution .callout-icon {
  background: #E11D48;
}
</style>
