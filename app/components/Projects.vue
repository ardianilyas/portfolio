<template>
  <section class="relative bg-white">

    <!-- SECTION HEADER -->
    <SectionHeader 
      :index="3" 
      :total="3" 
      title="Projects" 
    />

    <div class="container mx-auto border-l border-r border-gray-300">

      <!-- TABLE HEADER (RESPONSIVE) -->
      <div class="grid grid-cols-1 md:grid-cols-3 border-b border-gray-300 
                  px-8 py-6 md:px-16 md:py-8 text-sm md:text-base font-semibold text-gray-500 gap-2">
        <div>Project</div>
        <div class="md:block hidden">Tech Stack</div>
        <div>Link</div>
      </div>

      <!-- RESPONSIVE PROJECT ROW COMPONENT -->
      <ProjectRow
        name="Personal Portfolio"
        tech="Nuxt, Vue, TailwindCSS"
        github="https://github.com/USERNAME/portfolio"
      />

      <ProjectRow
        name="E-commerce API"
        tech="Node.js, Express, PostgreSQL"
        github="https://github.com/USERNAME/ecommerce-api"
      />

      <ProjectRow
        name="Task Manager App"
        tech="Laravel, MySQL"
        github="https://github.com/USERNAME/task-manager"
      />

      <ProjectRow
        name="Real-Time Chat App"
        tech="Socket.IO, Node.js"
        github="https://github.com/USERNAME/chat-app"
        :last="true"
      />

    </div>

  </section>
</template>
