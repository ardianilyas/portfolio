<template>
  <div :class="['w-full h-px relative', className]" style="background-color: var(--color-rule);">
    <div class="relative max-w-[1100px] mx-auto h-full px-6 md:px-10 pointer-events-none">
      <!-- Left Square: 18x18, white. Centered exactly on the 1px line (0.5px offset) -->
      <div 
        class="hidden md:block absolute border border-[var(--color-rule)] bg-[var(--color-bg)] rounded-[3px]"
        style="width: 18px; height: 18px; top: 0.5px; left: 0.5px; transform: translate(-50%, -50%);"
      ></div>
      <!-- Right Square: Centered exactly on the right 1px line -->
      <div 
        class="hidden md:block absolute border border-[var(--color-rule)] bg-[var(--color-bg)] rounded-[3px]"
        style="width: 18px; height: 18px; top: 0.5px; right: 0.5px; transform: translate(50%, -50%);"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
