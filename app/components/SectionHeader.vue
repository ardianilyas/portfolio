<template>
  <div class="section-header" role="presentation">
    <div class="section-header-inner">
      <h2 class="section-title">{{ title }}</h2>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.section-header {
  width: 100%;
  padding: 72px 0 0;
}

.section-header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 32px 24px;
}

@media (min-width: 768px) {
  .section-header-inner {
    padding: 0 40px 32px 0;
  }
}

.section-title {
  font-family: var(--font-sans);
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin: 0;
  line-height: 1.1;
}

.section-subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-2);
  margin: 12px 0 0;
  max-width: 600px;
  line-height: 1.5;
}
</style>
