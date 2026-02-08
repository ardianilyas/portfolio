<template>
  <a
    :href="github"
    target="_blank"
    class="grid grid-cols-1 md:grid-cols-3 
           border-gray-300 px-8 py-6 md:px-16 md:py-8 
           hover:bg-orange-50 hover:text-orange-600
           transition-colors cursor-pointer gap-2"
    :class="{ 'border-b': !last }"
  >
    <!-- PROJECT NAME -->
    <div class="text-gray-700 font-medium text-base md:text-lg">
      {{ name }}
    </div>

    <!-- TECH STACK (HIDE ON MOBILE) -->
    <div class="text-gray-600 text-sm md:text-base md:block hidden">
      {{ tech }}
    </div>

    <!-- GITHUB LINK -->
    <div class="flex items-center gap-2 text-gray-700 text-sm md:text-base">
      View on GitHub
      <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M14 3h7v7m0 0L10 21l-7-7L14 3z" />
      </svg>
    </div>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  tech: String,
  github: String,
  last: { type: Boolean, default: false }
})
</script>
