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
        class="hidden md:grid md:grid-cols-[200px_1fr] border-b border-gray-200 dark:border-gray-800 px-6 md:px-16 py-6 
               text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
        <div>Category</div>
        <div>Technologies</div>
      </div>

      <!-- SKILL ROWS -->
      <ClientOnly>
        <SkillRow 
          label="Programming Languages"
          :tech="languages"
        />

        <SkillRow 
          label="Frontend"
          :tech="frontend"
        />

        <SkillRow 
          label="Backend"
          :tech="backend"
        />
        
        <SkillRow 
          label="Testing"
          :tech="testing"
        />

        <SkillRow 
          label="Database"
          :tech="database"
        />

        <SkillRow 
          label="ORM"
          :tech="orm"
        />

        <SkillRow 
          label="Tools"
          :tech="tools"
          :last="true"
        />
      </ClientOnly>

    </div>
  </section>
</template>

<script setup>
const languages = [
  {
    name: 'JavaScript',
    icon: 'https://svgl.app/library/javascript.svg'
  },
  {
    name: 'TypeScript',
    icon: 'https://svgl.app/library/typescript.svg'
  },
  {
    name: 'PHP',
    icon: {
      light: 'https://svgl.app/library/php.svg',
      dark: 'https://svgl.app/library/php_dark.svg'
    }
  },
  {
    name: 'Go',
    icon: {
      light: 'https://svgl.app/library/golang.svg',
      dark: 'https://svgl.app/library/golang_dark.svg'
    }
  }
];

const frontend = [
  {
    name: 'Vue.js',
    icon: 'https://svgl.app/library/vue.svg'
  },
  {
    name: 'NuxtJS',
    icon: 'https://svgl.app/library/nuxt.svg'
  },
  {
    name: 'React',
    icon: {
      light: 'https://svgl.app/library/react_light.svg',
      dark: 'https://svgl.app/library/react_dark.svg'
    }
  },
  {
    name: 'Next.js',
    icon: 'https://svgl.app/library/nextjs_icon_dark.svg'
  },
  {
    name: 'TailwindCSS',
    icon: 'https://svgl.app/library/tailwindcss.svg'
  },
  {
    name: 'Shadcn UI',
    icon: {
      light: 'https://svgl.app/library/shadcn-ui.svg',
      dark: 'https://svgl.app/library/shadcn-ui_dark.svg'
    }
  }
];

const backend = [
  {
    name: 'Express',
    icon: {
      light: 'https://svgl.app/library/expressjs.svg',
      dark: 'https://svgl.app/library/expressjs_dark.svg'
    }
  },
  {
    name: 'Laravel',
    icon: 'https://svgl.app/library/laravel.svg'
  },
  {
    name: 'Gin',
    icon: '/icons/gin.svg'
  },
  {
    name: 'InertiaJS',
    icon: '/icons/inertiajs.svg'
  }
];

const testing = [
  {
    name: 'PEST',
    icon: '/icons/pest.svg'
  },
  {
    name: 'Vitest',
    icon: 'https://svgl.app/library/vitest.svg'
  }
];

const database = [
  {
    name: 'PostgreSQL',
    icon: 'https://svgl.app/library/postgresql.svg'
  },
  {
    name: 'MySQL',
    icon: {
      light: 'https://svgl.app/library/mysql-icon-light.svg',
      dark: 'https://svgl.app/library/mysql-icon-dark.svg'
    }
  }
];

const orm = [
  {
    name: 'Prisma',
    icon: {
      light: 'https://svgl.app/library/prisma.svg',
      dark: 'https://svgl.app/library/prisma_dark.svg'
    }
  },
  {
    name: 'Drizzle',
    icon: {
      light: 'https://svgl.app/library/drizzle-orm_light.svg',
      dark: 'https://svgl.app/library/drizzle-orm_dark.svg'
    }
  }
];

const tools = [
  {
    name: 'VSCode',
    icon: 'https://svgl.app/library/vscode.svg'
  },
  {
    name: 'Figma',
    icon: 'https://svgl.app/library/figma.svg'
  },
  {
    name: 'Git',
    icon: 'https://svgl.app/library/git.svg'
  },
  {
    name: 'Postman',
    icon: 'https://svgl.app/library/postman.svg'
  },
  {
    name: 'TablePlus',
    icon: null
  },
  {
    name: 'Safari',
    icon: 'https://svgl.app/library/safari.svg'
  }
];
</script>
