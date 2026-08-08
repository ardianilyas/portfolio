<template>
  <div class="lang-switcher-wrap" ref="dropdownRef">
    <button
      class="lang-trigger"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      aria-label="Select language"
    >
      <span class="lang-globe" aria-hidden="true">🌐</span>
      <span class="lang-code">{{ currentLocale.code.toUpperCase() }}</span>
      <svg class="lang-chevron" :class="{ 'is-rotated': isOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="dropdown-fade">
      <div v-if="isOpen" class="lang-dropdown" role="menu" aria-label="Language options">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="lang-option"
          :class="{ 'is-active': loc.code === locale }"
          @click="selectLocale(loc.code)"
          role="menuitem"
        >
          <span class="option-flag">{{ loc.code === 'en' ? '🇬🇧' : '🇮🇩' }}</span>
          <span class="option-name">{{ loc.name }}</span>
          <span v-if="loc.code === locale" class="option-check" aria-hidden="true">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { locale, locales, setLocale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>) || [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Bahasa Indonesia' }
  ]
})

const currentLocale = computed(() => {
  const found = availableLocales.value.find(l => l.code === locale.value)
  return found || { code: locale.value || 'en', name: 'English' }
})

function selectLocale(code: string) {
  setLocale(code)
  isOpen.value = false
}
</script>

<style scoped>
.lang-switcher-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--color-text-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.lang-trigger:hover,
.lang-trigger.is-open {
  color: var(--color-text);
  background: #ffffff;
  border-color: var(--color-border-2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.lang-globe {
  font-size: 12px;
}

.lang-code {
  letter-spacing: 0.04em;
}

.lang-chevron {
  transition: transform 0.25s ease;
  color: var(--color-text-3);
}

.lang-chevron.is-rotated {
  transform: rotate(180deg);
  color: var(--color-accent);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.03);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 450;
  color: var(--color-text-2);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  text-align: left;
}

.lang-option:hover {
  background: var(--color-surface);
  color: var(--color-text);
}

.lang-option.is-active {
  background: rgba(15, 63, 47, 0.08);
  color: var(--color-accent);
  font-weight: 600;
}

.option-flag {
  font-size: 14px;
}

.option-name {
  flex: 1;
}

.option-check {
  font-weight: 700;
  font-size: 12px;
  color: var(--color-accent);
}

/* ── Dropdown Transition ────────────── */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}
</style>
