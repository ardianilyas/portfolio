<template>
  <section id="portfolio" style="background-color: var(--color-bg);">

    <SectionHeader label="PORTFOLIO" title="Selected Projects" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

        <ProjectCard
          v-for="project in projects"
          :key="project.name"
          :name="project.name"
          :description="project.description"
          :tags="project.tags"
          :github="project.github"
        />

      </div>
    </div>

    <!-- Bottom rule -->
    <div class="w-full h-px" style="background-color: var(--color-rule);"></div>
  </section>
</template>

<script setup lang="ts">
interface Project {
  name: string
  description: string
  tags: string[]
  github: string
}

const projects: Project[] = [
  {
    name: 'Personal Portfolio',
    description: 'Personal portfolio website built with modern web technologies to showcase skills and projects.',
    tags: ['NuxtJS', 'Vue', 'TailwindCSS'],
    github: 'https://github.com/ardianilyas/portfolio',
  },
  {
    name: 'Zavo — Donation Platform',
    description: 'Full-stack donation platform with real-time updates, payment integration, and type-safe API layer.',
    tags: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL', 'Xendit'],
    github: 'https://github.com/ardianilyas/zavo',
  },
  {
    name: 'Patungan — Content Monetization',
    description: 'Content monetization platform with real-time broadcasting, queue-based processing, and payment gateway.',
    tags: ['Laravel', 'Xendit', 'Reverb', 'Octane', 'Redis'],
    github: 'https://github.com/ardianilyas/patungan',
  },
  {
    name: 'Bux — Expense Tracker',
    description: 'Expense tracking application with type-safe API, real-time data fetching, and clean UI.',
    tags: ['NextJS', 'tRPC', 'Drizzle', 'PostgreSQL', 'React Query'],
    github: 'https://github.com/ardianilyas/bux',
  },
]
</script>
