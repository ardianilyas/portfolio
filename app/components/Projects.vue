<template>
  <section id="portfolio" aria-labelledby="portfolio-heading" class="bg-[var(--color-surface)] py-8 md:py-16">

    <SectionHeader 
      label="PORTFOLIO" 
      title="Projects" 
      subtitle="A selection of my recent full-stack work and side projects."
    />

    <div class="projects-wrap">
      <div class="projects-list max-w-[1100px] mx-auto">

        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.name"
          :name="project.name"
          :description="project.description"
          :tags="project.tags"
          :github="project.github"
          :index="String(i + 1).padStart(2, '0')"
          :is-first="i === 0"
        />

      </div>
    </div>

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
    description: 'Portfolio website built with modern web technologies to showcase skills and projects.',
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
}


</style>
