<template>
  <div 
    class="split-text-wrap" 
    ref="wrapRef" 
    :class="{ 'is-revealed': isRevealed }"
    :aria-label="text"
  >
    <span 
      v-for="(word, i) in words" 
      :key="i"
      class="split-word"
    >
      <span 
        class="split-word-inner"
        :style="{ transitionDelay: `${i * staggerDelay}ms` }"
        aria-hidden="true"
      >
        {{ word }}&nbsp;
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  staggerDelay: {
    type: Number,
    default: 40 // ms per word
  }
})

const words = computed(() => props.text.split(' '))
const wrapRef = ref<HTMLElement | null>(null)
const isRevealed = ref(false)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    isRevealed.value = true
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isRevealed.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  )

  if (wrapRef.value) {
    observer.observe(wrapRef.value)
  }
})
</script>

<style scoped>
.split-text-wrap {
  display: inline-flex;
  flex-wrap: wrap;
}

.split-word {
  overflow: hidden;
  display: inline-flex;
  vertical-align: top;
}

.split-word-inner {
  display: inline-block;
  transform: translateY(110%) rotate(2deg);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  transform-origin: top left;
}

.is-revealed .split-word-inner {
  transform: translateY(0) rotate(0);
  opacity: 1;
}
</style>
