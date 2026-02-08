<template>
  <nav class="sticky top-0 left-0 z-50 bg-white">

    <!-- Container dengan border kiri & kanan -->
    <div class="container mx-auto px-12 py-6 border-l border-r border-gray-200">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h3 class="text-xl font-medium text-neutral-900">ardianilyas_</h3>
        </div>
        <ul class="flex gap-4 mt-2 md:mt-0 [&>li>a]:text-sm [&>li>a]:text-neutral-400 [&>li>a]:hover:text-neutral-500">
          <li>
            <a href="#introduction">#introduction</a>
          </li>
          <li>
            <a href="#skills">#skills</a>
          </li>
          <li>
            <a href="#projects">#projects</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Garis bawah full width -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
  </nav>
</template>

<script setup lang="ts"></script>
