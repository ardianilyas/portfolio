<template>
  <div class="relative w-full z-10">
    <div class="w-full px-6 md:px-12 xl:px-24 py-10 md:py-16 border-b border-[#0c2cdb]/10 bg-[var(--color-bg)] flex flex-col justify-center">
      <h2 class="text-[#0c2cdb] font-black text-5xl md:text-7xl xl:text-8xl uppercase tracking-tighter drop-shadow-[3px_3px_0_rgba(204,255,0,1)] flex items-center">
        <span class="text-[#CCFF00] drop-shadow-[3px_3px_0_rgba(12,44,219,1)] mr-2 md:mr-4">#</span>{{ title }}
      </h2>
      <span class="mt-2 md:mt-4 text-lg md:text-xl text-gray-500 font-bold tracking-[0.2em] uppercase">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>
