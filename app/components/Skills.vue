<template>
  <SectionHeader 
    :index="2" 
    :total="3" 
    title="Skills"
  />
  <section class="relative bg-white">
    <div class="container mx-auto border-l border-r border-gray-300">

      <!-- GRID HEADER -->
      <div class="grid grid-cols-2 border-b border-gray-300 px-16 py-8 text-sm font-semibold text-gray-500">
        <div>Category</div>
        <div>Technologies</div>
      </div>

      <!-- SKILL ROWS -->
      <SkillRow 
        label="Frontend"
        tech="Vue.js, NuxtJS, React, NextJS, TailwindCSS, Shadcn UI"
      />

      <SkillRow 
        label="Backend"
        tech="Node.js, Express, Laravel, Go, Gin"
      />
      
      <SkillRow 
        label="Testing"
        tech="PEST, Vitest"
      />

      <SkillRow 
        label="Database"
        tech="PostgreSQL, MySQL"
      />

      <SkillRow 
        label="ORM"
        tech="Prisma, Drizzle"
      />

      <SkillRow 
        label="Tools"
        tech="VSCode, Git, Postman, TablePlus, Safari"
        :last="true"
      />

    </div>
  </section>
</template>
