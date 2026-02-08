<template>
  <SectionHeader 
    :index="1" 
    :total="3" 
    title="Introduction" 
  />

  <section class="relative bg-white">
    <div class="container mx-auto border-l border-r border-gray-300">

      <!-- GRID: STACK ON MOBILE, 2 COL ON DESKTOP -->
      <div class="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">

        <!-- LEFT SIDE -->
        <div class="p-8 md:p-16 md:border-r border-gray-300">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <p class="text-sm text-gray-500">Introducing myself</p>
          </div>

          <h1 class="text-3xl md:text-5xl font-semibold leading-tight">
            Hi, I'm <span class="text-orange-500">Ardian Ilyas</span>.
          </h1>

          <p class="mt-6 text-base md:text-lg text-gray-600 md:max-w-md">
            Full-stack web developer with a passion for clean frontend, scalable backend, 
            and great user experience (mainly focusing on backend).
          </p>
        </div>

        <!-- RIGHT SIDE -->
        <div class="p-0">

          <!-- HEADER -->
          <div class="grid grid-cols-2 text-base md:text-lg font-semibold border-b border-gray-300 p-8 md:p-16 md:pb-6">
            <div>Info</div>
            <div>Details</div>
          </div>

          <!-- ROWS -->
          <InfoRow label="Full Name" value="Ardian Ilyas Fernanda" />
          <InfoRow label="Age" :value="age" />
          <InfoRow label="Education" value="Bachelor's Degree of Information Systems" />
          <InfoRow label="University" value="Amikom Yogyakarta University" last />

        </div>
      </div>

    </div>

    <!-- FULL WIDTH BOTTOM BORDER -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
  </section>
</template>

<script setup lang="ts">
const currentyear = new Date().getFullYear()
const age = currentyear - 2002
</script>
