<template>
  <section class="relative bg-white dark:bg-gray-950 transition-colors duration-300" id="projects">

    <!-- SECTION HEADER -->
    <SectionHeader 
      :index="3"
      :total="3"
      title="Projects"
    />

    <div class="container mx-auto border-x border-gray-200 dark:border-gray-800">

      <!-- TABLE HEADER -->
      <div 
        class="hidden md:grid md:grid-cols-3 border-b border-gray-200 dark:border-gray-800 
               px-6 md:px-16 py-6 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
        <div>Project</div>
        <div>Tech Stack</div>
        <div>Link</div>
      </div>

      <!-- PROJECT ROWS -->
      <ProjectRow
        name="Personal Portfolio"
        tech="Nuxt, Vue, TailwindCSS"
        github="https://github.com/ardianilyas/portfolio"
      />

      <ProjectRow
        name="Zavo - Donation Platform App"
        tech="NextJS, tRPC, Drizzle ORM, PostgreSQL, Pusher, TailwindCSS, Xendit"
        github="https://github.com/ardianilyas/zavo"
      />

      <ProjectRow
        name="Patungan - Content Monetization App"
        tech="Laravel, Xendit, Reverb, Octane, Redis, PostgreSQL"
        github="https://github.com/ardianilyas/patungan"
      />

      <ProjectRow
        name="Bux - Expense Tracker App"
        tech="NextJS, tRPC, Drizzle ORM, PostgreSQL, React Query, TailwindCSS"
        github="https://github.com/ardianilyas/bux"
        :last="true"
      />
    </div>
  </section>
</template>
