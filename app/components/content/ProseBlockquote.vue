<template>
  <blockquote :class="['custom-callout', `callout-${detectedType}`]">
    <div class="callout-header">
      // {{ calloutTitle }}
    </div>
    <div class="callout-body" ref="calloutBodyRef">
      <component :is="renderCleanedContent" />
    </div>
  </blockquote>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, h, onMounted, type VNode } from 'vue'

const slots = useSlots()
const calloutBodyRef = ref<HTMLElement | null>(null)
const clientOverrideType = ref('')

// Bulletproof text extraction across Vue VNodes & Nuxt MDC AST objects
function getTextFromAST(vnodes: any): string {
  let str = ''
  if (!vnodes) return str
  if (typeof vnodes === 'string') return vnodes
  if (Array.isArray(vnodes)) {
    for (const node of vnodes) {
      str += getTextFromAST(node)
    }
    return str
  }
  if (typeof vnodes === 'object' && vnodes !== null) {
    if (typeof vnodes.children === 'string') str += vnodes.children
    else if (typeof vnodes.value === 'string') str += vnodes.value
    else if (typeof vnodes.text === 'string') str += vnodes.text
    else if (Array.isArray(vnodes.children)) str += getTextFromAST(vnodes.children)
  }
  return str
}

function parseCalloutType(text: string): string {
  const upper = text.trim().toUpperCase()
  if (upper.includes('!WARNING') || upper.includes('[!WARNING]') || upper.startsWith('WARNING:')) return 'warning'
  if (upper.includes('!TIP') || upper.includes('[!TIP]') || upper.startsWith('TIP:')) return 'tip'
  if (upper.includes('!IMPORTANT') || upper.includes('[!IMPORTANT]') || upper.startsWith('IMPORTANT:')) return 'important'
  if (upper.includes('!CAUTION') || upper.includes('[!CAUTION]') || upper.startsWith('CAUTION:')) return 'caution'
  if (upper.includes('!INFO') || upper.includes('[!INFO]') || upper.startsWith('INFO:')) return 'info'
  return 'note'
}

// Detect callout type from AST or client override
const detectedType = computed(() => {
  if (clientOverrideType.value) return clientOverrideType.value
  const defaultSlot = slots.default ? slots.default() : []
  const text = getTextFromAST(defaultSlot)
  return parseCalloutType(text)
})

const calloutTitle = computed(() => {
  switch (detectedType.value) {
    case 'warning': return 'WARNING'
    case 'tip': return 'TIP'
    case 'important': return 'IMPORTANT'
    case 'caution': return 'CAUTION'
    case 'info': return 'INFO'
    default: return 'NOTE'
  }
})

// Clean !TYPE and [!TYPE] marker text directly in VNode AST
function cleanASTNodes(nodes: any): any {
  if (!nodes) return nodes
  if (Array.isArray(nodes)) {
    return nodes.map(node => cleanASTNodes(node))
  }
  if (typeof nodes === 'object' && nodes !== null) {
    if (typeof nodes.children === 'string') {
      const cleaned = nodes.children.replace(/^\[?!?(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]?:?\s*/gi, '')
      return h(nodes.type || 'span', nodes.props || {}, cleaned)
    }
    if (typeof nodes.value === 'string') {
      const cleaned = nodes.value.replace(/^\[?!?(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]?:?\s*/gi, '')
      return h(nodes.type || 'span', nodes.props || {}, cleaned)
    }
    if (Array.isArray(nodes.children)) {
      return h(nodes.type || 'span', nodes.props || {}, cleanASTNodes(nodes.children))
    }
  }
  return nodes
}

const renderCleanedContent = () => {
  const rawNodes = slots.default ? slots.default() : []
  return h('div', { class: 'callout-content-inner' }, cleanASTNodes(rawNodes))
}

// DOM fallback onMounted to ensure 100% clean DOM & accurate type override
onMounted(() => {
  if (calloutBodyRef.value) {
    const rawText = calloutBodyRef.value.textContent || ''
    const domType = parseCalloutType(rawText)
    if (domType !== 'note') {
      clientOverrideType.value = domType
    }

    // Clean DOM text nodes
    const walk = document.createTreeWalker(calloutBodyRef.value, NodeFilter.SHOW_TEXT, null)
    let node: Node | null
    while ((node = walk.nextNode())) {
      if (node.nodeValue) {
        node.nodeValue = node.nodeValue.replace(/^\[?!?(NOTE|TIP|WARNING|IMPORTANT|CAUTION|INFO)\]?:?\s*/gi, '')
      }
    }
  }
})
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
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
  border-left-color: #059669;
}
.callout-tip .callout-header {
  color: #059669;
}

/* WARNING (Amber Gold) */
.callout-warning {
  background: rgba(217, 119, 6, 0.05);
  border-color: rgba(217, 119, 6, 0.2);
  border-left-color: #D97706;
}
.callout-warning .callout-header {
  color: #D97706;
}

/* IMPORTANT / INFO (Slate Blue) */
.callout-important, .callout-info {
  background: rgba(37, 99, 235, 0.05);
  border-color: rgba(37, 99, 235, 0.2);
  border-left-color: #2563EB;
}
.callout-important .callout-header,
.callout-info .callout-header {
  color: #2563EB;
}

/* CAUTION (Rose Red) */
.callout-caution {
  background: rgba(225, 29, 72, 0.05);
  border-color: rgba(225, 29, 72, 0.2);
  border-left-color: #E11D48;
}
.callout-caution .callout-header {
  color: #E11D48;
}
</style>
