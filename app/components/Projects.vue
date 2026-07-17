<template>
  <section id="portfolio" aria-labelledby="portfolio-heading" class="bg-[var(--color-surface)] py-8 md:py-16" ref="projectsSection">

    <SectionHeader 
      title="Projects" 
      subtitle="A selection of my recent full-stack work and side projects."
    />

    <div class="projects-wrap" :class="{ 'is-visible': isVisible }">
      <div class="projects-list max-w-[1100px] mx-auto fade-up fade-up-1">

        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.name"
          :name="project.name"
          :description="project.shortDescription"
          :tags="project.tech"
          :github="project.github"
          :slug="project.slug"
          :index="String(i + 1).padStart(2, '0')"
          :is-first="i === 0"
        />

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const projectsSection = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  projectsSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.1 }
)

import { projects } from '~/data/projects'
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

.projects-list {
  padding-bottom: 72px;
  overflow: hidden;
}

/* Visibility triggers for animations */
.projects-wrap:not(.is-visible) .fade-up {
  opacity: 0;
  transform: translateY(20px);
}
</style>
