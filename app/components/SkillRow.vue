<template>
  <div
    :class="[
      'group flex flex-col md:grid md:grid-cols-[200px_1fr] px-6 md:px-16 py-6 transition-colors',
      !last ? 'border-b border-gray-200 dark:border-gray-800' : '',
      'hover:bg-orange-50 dark:hover:bg-orange-900/30'
    ]"
  >
    <!-- Category -->
    <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-0 md:pt-2">
      {{ label }}
    </div>

    <!-- Technologies -->
    <div class="flex flex-wrap gap-4 items-center">
      <div
        v-for="item in tech"
        :key="item.name"
        class="skill-icon-wrapper"
      >
        <img
          v-if="resolvedIcon(item)"
          :src="resolvedIcon(item)"
          :alt="item.name"
          class="skill-icon"
          loading="lazy"
        />
        <span v-else class="skill-text-badge">
          {{ item.name }}
        </span>
        <span class="skill-tooltip">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();

const props = defineProps({
  label: { type: String, required: true },
  tech: { type: Array, required: true },
  last: { type: Boolean, default: false }
});

function resolvedIcon(item) {
  if (!item.icon) return null;

  // If icon is an object with light/dark variants
  if (typeof item.icon === 'object' && item.icon.light && item.icon.dark) {
    return colorMode.value === 'dark' ? item.icon.dark : item.icon.light;
  }

  // Single icon string
  return item.icon;
}
</script>

<style scoped>
.skill-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-icon-wrapper:hover .skill-icon {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.15);
}

.skill-text-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  background: var(--badge-bg, #f3f4f6);
  color: var(--badge-text, #6b7280);
  filter: grayscale(100%) opacity(0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}

:where(.dark, .dark *) .skill-text-badge {
  --badge-bg: #1f2937;
  --badge-text: #9ca3af;
}

.skill-icon-wrapper:hover .skill-text-badge {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.15);
  --badge-bg: #fff7ed;
  --badge-text: #ea580c;
}

:where(.dark, .dark *) .skill-icon-wrapper:hover .skill-text-badge {
  --badge-bg: #431407;
  --badge-text: #fb923c;
}

.skill-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: #fff;
  background: #1f2937;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
}

:where(.dark, .dark *) .skill-tooltip {
  background: #e5e7eb;
  color: #111827;
}

.skill-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1f2937;
}

:where(.dark, .dark *) .skill-tooltip::after {
  border-top-color: #e5e7eb;
}

.skill-icon-wrapper:hover .skill-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
