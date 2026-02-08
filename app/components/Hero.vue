<template>
  <SectionHeader 
    :index="1" 
    :total="3" 
    title="Introduction" 
  />

  <section class="relative bg-white">

    <div class="container mx-auto border-x border-gray-200/60">

      <!-- GRID: STACK ON MOBILE, 2 COL ON DESKTOP -->
      <div class="grid grid-cols-1 md:grid-cols-2">

        <!-- LEFT SIDE -->
        <div class="p-8 md:p-16 flex flex-col justify-start md:border-r border-gray-200/60">

          <!-- SMALL TAG -->
          <div class="flex items-center gap-2 mb-6">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <p class="text-xs uppercase tracking-wide text-gray-500">
              Introducing myself
            </p>
          </div>

          <!-- HEADING -->
          <h1 class="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Hi, I'm <span class="text-orange-500">ardianilyas</span>.
          </h1>

          <!-- DESCRIPTION -->
          <p class="mt-8 text-xs font-light md:text-base text-gray-400 leading-relaxed md:max-w-md">
            Full-stack web developer with a passion for clean frontend, scalable backend, 
            and great user experience (mainly focusing on backend).
          </p>
        </div>

        <!-- RIGHT SIDE -->
        <div class="flex flex-col p-0 md:border-l border-gray-200/60">

          <!-- HEADER -->
          <div class="hidden md:grid grid-cols-2 text-sm md:text-base font-light text-gray-400 uppercase tracking-wide 
                      border-b border-gray-200/60 px-8 md:px-16 py-6 md:py-8">
            <div>Info</div>
            <div>Details</div>
          </div>

          <!-- ROWS -->
          <div class="divide-y divide-gray-200/60">
            <InfoRow label="Full Name" value="Ardian Ilyas Fernanda" />
            <InfoRow label="Interest" value="Food, Coding, Gaming, Music, Film" />
            <InfoRow label="Age" :value="age" />
            <InfoRow label="Education" value="Bachelor's Degree of Information Systems" />
            <InfoRow label="University" value="Amikom Yogyakarta University" last />
          </div>

        </div>
      </div>

    </div>

    <!-- FULL WIDTH BOTTOM BORDER -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gray-200/60"></div>
  </section>
</template>

<script setup lang="ts">
const currentyear = new Date().getFullYear()
const age = currentyear - 2002
</script>
