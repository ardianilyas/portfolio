<template>
  <a
    :href="github"
    target="_blank"
    class="group grid grid-cols-1 md:grid-cols-3
           border-gray-200 px-6 py-6 md:px-16 md:py-8
           hover:bg-orange-50 transition-colors cursor-pointer gap-3"
    :class="{ 'border-b border-gray-200': !last }"
  >
    <!-- PROJECT NAME -->
    <div class="text-sm md:text-base font-semibold text-gray-700
                transition-colors group-hover:text-orange-500">
      {{ name }}
    </div>

    <!-- TECH STACK -->
    <div class="text-sm text-gray-600 md:block hidden
                transition-colors group-hover:text-orange-500 leading-relaxed">
      {{ tech }}
    </div>

    <!-- GITHUB LINK -->
    <div class="flex items-center gap-2 text-sm md:text-base text-gray-700
                transition-colors group-hover:text-orange-500">
      View on GitHub
      <svg 
        class="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-orange-500"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
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
