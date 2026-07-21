<template>
  <div class="custom-cursor-wrap" aria-hidden="true">
    <div ref="dotRef" class="cursor-dot"></div>
    <div ref="haloRef" class="cursor-halo"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dotRef = ref<HTMLElement | null>(null)
const haloRef = ref<HTMLElement | null>(null)

let mouseX = -100
let mouseY = -100
let haloX = -100
let haloY = -100
let animFrameId: number | null = null
let isHovered = false
let isPressed = false
let isInverted = false
let enabled = false

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (dotRef.value) {
    dotRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
  }

  const target = e.target as HTMLElement | null
  if (target) {
    const interactive = !!target.closest('a, button, input, textarea, select, .bento-card, .project-row, [role="button"]')
    if (interactive !== isHovered) {
      isHovered = interactive
      haloRef.value?.classList.toggle('is-hovered', isHovered)
    }

    const inverted = !!target.closest('footer, .footer, [data-theme="dark"]')
    if (inverted !== isInverted) {
      isInverted = inverted
      dotRef.value?.classList.toggle('is-inverted', isInverted)
      haloRef.value?.classList.toggle('is-inverted', isInverted)
    }
  }
}

const onMouseDown = () => {
  isPressed = true
  haloRef.value?.classList.add('is-pressed')
}

const onMouseUp = () => {
  isPressed = false
  haloRef.value?.classList.remove('is-pressed')
}

const animateHalo = () => {
  haloX += (mouseX - haloX) * 0.15
  haloY += (mouseY - haloY) * 0.15

  if (haloRef.value) {
    haloRef.value.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`
  }

  animFrameId = requestAnimationFrame(animateHalo)
}

onMounted(() => {
  if (typeof window === 'undefined') return

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hasFinePointer || prefersReduced) {
    // Hide elements on touch/reduced-motion
    dotRef.value?.style.setProperty('display', 'none')
    haloRef.value?.style.setProperty('display', 'none')
    return
  }

  enabled = true
  document.documentElement.classList.add('has-custom-cursor')
  document.addEventListener('mousemove', onMouseMove, { passive: true })
  document.addEventListener('mousedown', onMouseDown, { passive: true })
  document.addEventListener('mouseup', onMouseUp, { passive: true })
  animFrameId = requestAnimationFrame(animateHalo)
})

onUnmounted(() => {
  if (!enabled) return
  document.documentElement.classList.remove('has-custom-cursor')
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>

<style scoped>
.custom-cursor-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  background-color: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  transform: translate3d(-100px, -100px, 0);
}

.cursor-halo {
  position: fixed;
  top: -14px;
  left: -14px;
  width: 28px;
  height: 28px;
  background-color: rgba(15, 63, 47, 0.10);
  border: 1.5px solid rgba(15, 63, 47, 0.20);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  transform: translate3d(-100px, -100px, 0);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              top 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              border-color 0.3s ease;
}

.cursor-halo.is-hovered {
  width: 44px;
  height: 44px;
  top: -22px;
  left: -22px;
  background-color: rgba(15, 63, 47, 0.06);
  border-color: rgba(15, 63, 47, 0.45);
}

.cursor-halo.is-pressed {
  width: 16px;
  height: 16px;
  top: -8px;
  left: -8px;
  background-color: rgba(15, 63, 47, 0.3);
}

/* ── Inverted Mode (Over dark sections) ── */
.cursor-dot.is-inverted {
  background-color: #f2e8cf;
}

.cursor-halo.is-inverted {
  background-color: rgba(242, 232, 207, 0.15);
  border-color: rgba(242, 232, 207, 0.3);
}

.cursor-halo.is-hovered.is-inverted {
  background-color: rgba(242, 232, 207, 0.1);
  border-color: rgba(242, 232, 207, 0.6);
}

.cursor-halo.is-pressed.is-inverted {
  background-color: rgba(242, 232, 207, 0.4);
}
</style>
