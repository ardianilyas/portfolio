<template>
  <ClientOnly>
    <div v-if="isEnabled" class="custom-cursor-wrap" aria-hidden="true">
      <div
        ref="dotRef"
        class="cursor-dot"
        :class="{ 'is-hovered': isHovered, 'is-pressed': isPressed }"
      ></div>
      <div
        ref="haloRef"
        class="cursor-halo"
        :class="{ 'is-hovered': isHovered, 'is-pressed': isPressed }"
      ></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dotRef = ref<HTMLElement | null>(null)
const haloRef = ref<HTMLElement | null>(null)
const isEnabled = ref(false)
const isHovered = ref(false)
const isPressed = ref(false)

let mouseX = -100
let mouseY = -100
let haloX = -100
let haloY = -100
let animFrameId: number | null = null

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (dotRef.value) {
    dotRef.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
  }

  const target = e.target as HTMLElement | null
  if (target) {
    const isInteractive = !!target.closest('a, button, input, textarea, select, .bento-card, .project-row, [role="button"]')
    isHovered.value = isInteractive
  }
}

const onMouseDown = () => {
  isPressed.value = true
}

const onMouseUp = () => {
  isPressed.value = false
}

const animateHalo = () => {
  const ease = 0.18
  haloX += (mouseX - haloX) * ease
  haloY += (mouseY - haloY) * ease

  if (haloRef.value) {
    haloRef.value.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`
  }

  animFrameId = requestAnimationFrame(animateHalo)
}

onMounted(() => {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (hasFinePointer && !prefersReduced) {
    isEnabled.value = true
    document.documentElement.classList.add('has-custom-cursor')
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    animFrameId = requestAnimationFrame(animateHalo)
  }
})

onUnmounted(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
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
  background-color: #0F3F2F;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

.cursor-halo {
  position: fixed;
  top: -14px;
  left: -14px;
  width: 28px;
  height: 28px;
  background-color: rgba(15, 63, 47, 0.12);
  border: 1.5px solid rgba(15, 63, 47, 0.25);
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
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
  background-color: rgba(15, 63, 47, 0.08);
  border-color: rgba(15, 63, 47, 0.5);
}

.cursor-halo.is-pressed {
  width: 16px;
  height: 16px;
  top: -8px;
  left: -8px;
  background-color: rgba(15, 63, 47, 0.3);
}
</style>
