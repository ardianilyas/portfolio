<template>
  
  <section class="relative bg-white dark:bg-gray-950 transition-colors duration-300" id="skills">

    <SectionHeader 
      :index="2"
      :total="3"
      title="Skills"
    />

    <div class="container mx-auto border-x border-gray-200/80 dark:border-gray-800">

      
      <!-- GRID HEADER -->
      <div 
        class="hidden md:grid md:grid-cols-2 border-b border-gray-200 dark:border-gray-800 px-6 md:px-16 py-6 
               text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
        <div>Category</div>
        <div>Technologies</div>
      </div>

      <!-- SKILL ROWS -->
      <SkillRow 
        label="Programming Languages"
        tech="JavaScript, TypeScript, PHP, Go"
      />

      <SkillRow 
        label="Frontend"
        tech="Vue.js, NuxtJS, React, NextJS, TailwindCSS, Shadcn UI"
      />

      <SkillRow 
        label="Backend"
        tech="Express, Laravel, Gin, InertiaJS"
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
        tech="VSCode, Figma, Git, Postman, TablePlus, Safari"
        :last="true"
      />

    </div>
  </section>
</template>
