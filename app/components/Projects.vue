<template>
  <section id="portfolio" aria-labelledby="portfolio-heading" class="bg-[var(--color-surface)] py-12 md:py-24" ref="projectsSection">

    <SectionHeader 
      :title="$t('portfolio.heading')" 
      subtitle="A selection of my recent full-stack work and side projects."
    />

    <div class="projects-wrap" :class="{ 'is-visible': isVisible }">
      <!-- Bento Grid Container -->
      <div class="bento-grid max-w-[1100px] mx-auto fade-up fade-up-1">

        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.name"
          :name="project.name"
          :description="project.shortDescription"
          :tags="project.tech"
          :github="project.github"
          :slug="project.slug"
          :year="project.year"
          :index="String(i + 1).padStart(2, '0')"
          :is-featured="i === 0"
          :logo="project.logo"
          :class="getBentoSpan(i)"
        />

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { projects } from '~/data/projects'

const projectsSection = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  projectsSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 }
)

function getBentoSpan(index: number): string {
  // Cell 0 (Decko) spans 2 columns at desktop for a strong hero focal point
  if (index === 0) return 'md:col-span-2'
  return 'md:col-span-1'
}
</script>

<style scoped>
.projects-wrap {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .projects-wrap {
    padding: 0 40px;
  }
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding-bottom: 72px;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
}

/* Visibility triggers for entrance animations */
.projects-wrap:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
