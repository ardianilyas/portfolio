<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="scroll-progress-bar" :style="{ width: `${progress}%` }"></div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  targetSelector: {
    type: String,
    default: '.post-article'
  }
})

const progress = ref(0)

function calculateProgress() {
  if (typeof window === 'undefined') return

  const targetEl = document.querySelector(props.targetSelector) as HTMLElement | null
  if (targetEl) {
    const targetTop = targetEl.offsetTop
    const targetHeight = targetEl.offsetHeight
    const currentScroll = window.scrollY
    const winHeight = window.innerHeight

    // Calculate when scroll reaches end of target element
    const scrollableDistance = (targetTop + targetHeight) - winHeight - targetTop
    const scrolledDistance = currentScroll - targetTop

    if (scrollableDistance > 0) {
      const pct = (scrolledDistance / scrollableDistance) * 100
      progress.value = Math.min(100, Math.max(0, pct))
    } else {
      progress.value = currentScroll > targetTop ? 100 : 0
    }
  } else {
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight
    if (totalScrollable > 0) {
      progress.value = Math.min(100, Math.max(0, (window.scrollY / totalScrollable) * 100))
    }
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', calculateProgress, { passive: true })
    window.addEventListener('resize', calculateProgress, { passive: true })
    nextTick(() => {
      calculateProgress()
      setTimeout(calculateProgress, 300)
    })
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', calculateProgress)
    window.removeEventListener('resize', calculateProgress)
  }
})
</script>

<style scoped>
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--color-accent);
  box-shadow: 0 0 10px rgba(15, 63, 47, 0.5);
  z-index: 10000;
  transition: width 0.05s ease-out;
  pointer-events: none;
}
</style>
