<template>
  <div :class="['w-full h-px relative', className]" style="background-color: var(--color-rule);">
  </div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
