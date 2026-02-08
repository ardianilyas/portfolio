<template>
  <div
    class="grid grid-cols-2 border-gray-300 px-16 py-8 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-default"
    :class="{ 'border-b': !last }"
  >
    <div class="text-gray-600">{{ label }}</div>
    <div>{{ tech }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  tech: { type: String, required: true },
  last: { type: Boolean, default: false }
})
</script>
