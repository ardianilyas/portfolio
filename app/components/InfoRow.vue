<template>
  <div
    class="grid grid-cols-2 border-gray-300 dark:border-gray-800 p-16 py-6 
           hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 
           transition-colors cursor-default"
    :class="{ 'border-b': !last }"
  >
    <div class="text-gray-600 dark:text-gray-400">{{ label }}</div>
    <div class="dark:text-gray-300">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  last: { type: Boolean, default: false }
})
</script>
