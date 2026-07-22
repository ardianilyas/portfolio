<template>
  <blockquote :class="['custom-callout', `callout-${calloutType}`]">
    <div class="callout-header">
      // {{ calloutTitle }}
    </div>
    <div class="callout-body">
      <component :is="renderCleanedContent" />
    </div>
  </blockquote>
</template>

<script setup lang="ts">
import { computed, useSlots, h, type VNode } from 'vue'

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

// Clean [!TYPE] marker text directly in VNode AST for instant SSR & Client rendering
function cleanVNodes(vnodes: VNode[]): VNode[] {
  if (!vnodes || !Array.isArray(vnodes)) return vnodes
  return vnodes.map(node => {
    if (typeof node.children === 'string') {
      const cleanedText = node.children.replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]\s*/gi, '')
      return h(node.type as any, node.props, cleanedText)
    }
    if (Array.isArray(node.children)) {
      return h(node.type as any, node.props, cleanVNodes(node.children as VNode[]))
    }
    return node
  })
}

const renderCleanedContent = () => {
  const rawNodes = slots.default ? slots.default() : []
  return h('div', { class: 'callout-content-inner' }, cleanVNodes(rawNodes))
}
</script>

<style scoped>
.custom-callout {
  position: relative;
  margin: 2em 0;
  padding: 20px 24px;
  background: rgba(15, 63, 47, 0.03);
  border: 1px solid rgba(15, 63, 47, 0.12);
  border-left: 3px solid var(--color-accent);
  font-style: normal;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.callout-header {
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 10px;
}

.callout-body :deep(p) {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--color-text-2);
}

/* ── Color Themes per Type ─────────────────────────────── */

/* NOTE (Dark Green) */
.callout-note {
  background: rgba(15, 63, 47, 0.03);
  border-color: rgba(15, 63, 47, 0.12);
  border-left-color: var(--color-accent);
}
.callout-note .callout-header {
  color: var(--color-accent);
}

/* TIP (Emerald Green) */
.callout-tip {
  background: rgba(16, 185, 129, 0.04);
  border-color: rgba(16, 185, 129, 0.18);
  border-left-color: #059669;
}
.callout-tip .callout-header {
  color: #059669;
}

/* WARNING (Amber Gold) */
.callout-warning {
  background: rgba(217, 119, 6, 0.04);
  border-color: rgba(217, 119, 6, 0.18);
  border-left-color: #D97706;
}
.callout-warning .callout-header {
  color: #D97706;
}

/* IMPORTANT / INFO (Slate Blue) */
.callout-important, .callout-info {
  background: rgba(37, 99, 235, 0.04);
  border-color: rgba(37, 99, 235, 0.18);
  border-left-color: #2563EB;
}
.callout-important .callout-header,
.callout-info .callout-header {
  color: #2563EB;
}

/* CAUTION (Rose Red) */
.callout-caution {
  background: rgba(225, 29, 72, 0.04);
  border-color: rgba(225, 29, 72, 0.18);
  border-left-color: #E11D48;
}
.callout-caution .callout-header {
  color: #E11D48;
}
</style>
