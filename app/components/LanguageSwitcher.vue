<template>
  <button
    class="lang-switcher"
    @click="toggleLang"
    aria-label="Toggle Language"
  >
    <ClientOnly fallback="EN">
      {{ locale === 'en' ? 'ID' : 'EN' }}
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const { locale, setLocale } = useI18n()

function toggleLang() {
  setLocale(locale.value === 'en' ? 'id' : 'en')
}
</script>

<style scoped>
.lang-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-2);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}
.lang-switcher:hover {
  background: var(--color-surface-2);
  color: var(--color-text);
}
</style>
