<template>
  <div class="relative w-full border-t border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">

    <!-- CONTAINER -->
    <div class="container mx-auto relative border-l border-r border-gray-200 dark:border-gray-800">

      <!-- ACCENT BAR (CENTERED & SAME HEIGHT AS CONTENT) -->
      <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
        <div class="w-px h-6 bg-orange-500"></div>
      </div>

      <!-- CONTENT -->
      <div ref="contentRef" class="flex items-center gap-4 py-8 px-6 font-mono">

        <!-- SECTION INDEX -->
        <div class="text-gray-400 dark:text-gray-500 tracking-widest text-xs font-light">
          [ <span class="text-orange-500">{{ paddedIndex }}</span> / {{ paddedTotal }} ]
        </div>

        <div class="text-gray-400 dark:text-gray-600">·</div>

        <!-- TITLE -->
        <h2 class="text-xs tracking-[3px] uppercase text-gray-400 dark:text-gray-500 font-light">
          {{ title }}
        </h2>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue"

const props = defineProps({
  index: Number,
  total: Number,
  title: String
})

const paddedIndex = computed(() => props.index!.toString().padStart(2, "0"))
const paddedTotal = computed(() => props.total!.toString().padStart(2, "0"))
</script>
