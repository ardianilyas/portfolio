<template>
  <div class="w-full flex flex-col">
    <div class="max-w-[1100px] mx-auto w-full px-6 md:px-10">
      <div class="py-6 md:py-8 flex flex-col gap-1">
        <span class="section-label">// {{ label }}</span>
        <h2 class="text-xl md:text-[22px] font-semibold" style="color: var(--color-primary);">
          {{ title }}
        </h2>
      </div>
    </div>
    <GridDivider />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>
