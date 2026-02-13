<template>
  <button
    @click="cycleMode"
    class="relative p-2 rounded-full border border-gray-200 dark:border-gray-700 
           hover:bg-gray-100 dark:hover:bg-gray-800 
           transition-all duration-300 cursor-pointer"
    :title="`Theme: ${currentMode}`"
  >
    <!-- Sun Icon (Light) -->
    <svg
      v-if="currentMode === 'light'"
      class="w-4 h-4 text-orange-500"
      fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>

    <!-- Moon Icon (Dark) -->
    <svg
      v-else-if="currentMode === 'dark'"
      class="w-4 h-4 text-orange-500"
      fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>

    <!-- Monitor Icon (System) -->
    <svg
      v-else
      class="w-4 h-4 text-orange-500"
      fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  </button>
</template>

<script setup lang="ts">
type Mode = 'system' | 'light' | 'dark'

const colorMode = useColorMode()
const modes: Mode[] = ['system', 'light', 'dark']
const currentMode = ref<Mode>((colorMode.preference as Mode) || 'system')

function cycleMode() {
  const currentIndex = modes.indexOf(currentMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  const nextMode = modes[nextIndex]
  currentMode.value = nextMode
  colorMode.preference = nextMode
}
</script>
