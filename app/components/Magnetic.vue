<template>
  <div
    ref="magneticRef"
    class="magnetic-wrap"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="{
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  strength: {
    type: Number,
    default: 0.25 // The strength of the magnetic pull
  }
})

const magneticRef = ref<HTMLElement | null>(null)
const position = reactive({ x: 0, y: 0 })
const isHovering = ref(false)
let isMobile = false

onMounted(() => {
  isMobile = window.matchMedia('(pointer: coarse)').matches
})

const onMouseMove = (e: MouseEvent) => {
  if (isMobile || !magneticRef.value) return

  isHovering.value = true

  const rect = magneticRef.value.getBoundingClientRect()
  
  // Calculate element center
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Distance from mouse to center
  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY

  // Apply pull
  position.x = distanceX * props.strength
  position.y = distanceY * props.strength
}

const onMouseLeave = () => {
  if (isMobile) return

  isHovering.value = false
  position.x = 0
  position.y = 0
}
</script>

<style scoped>
.magnetic-wrap {
  display: inline-flex;
  will-change: transform;
}
</style>
