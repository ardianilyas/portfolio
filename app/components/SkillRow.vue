<template>
  <div
    :class="[
      'group flex flex-col md:grid md:grid-cols-2 px-6 md:px-16 py-6 transition-colors',
      !last ? 'border-b border-gray-200 dark:border-gray-800' : '',
      'hover:bg-orange-50 dark:hover:bg-orange-900'
    ]"
  >
    <!-- Category -->
    <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-0">
      {{ label }}
    </div>

    <!-- Technologies -->
    <div
      class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors group-hover:text-orange-500"
    >
      {{ tech }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  tech: { type: String, required: true },
  last: { type: Boolean, default: false }
});
</script>
