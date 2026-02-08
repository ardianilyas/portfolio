<template>
  <div
    class="grid grid-cols-2 border-gray-300 p-16 py-6 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-default"
    :class="{ 'border-b': !last }"
  >
    <div class="text-gray-600">{{ label }}</div>
    <div>{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  last: { type: Boolean, default: false }
})
</script>
