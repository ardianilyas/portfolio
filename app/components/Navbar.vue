<template>
  <nav class="sticky top-0 left-0 z-50 bg-white dark:bg-gray-950 transition-colors duration-300">

    <!-- Main navbar bar -->
    <div class="container mx-auto px-6 md:px-12 py-4 md:py-6 border-l border-r border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between">

        <!-- Logo -->
        <h3 class="text-lg md:text-xl font-medium text-neutral-900 dark:text-white">ardianilyas_</h3>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-4">
          <ul class="flex gap-4 [&>li>a]:text-sm [&>li>a]:text-neutral-400 [&>li>a]:hover:text-orange-500 dark:[&>li>a]:text-neutral-500 dark:[&>li>a]:hover:text-orange-500">
            <li><a href="#introduction">#introduction</a></li>
            <li><a href="#skills">#skills</a></li>
            <li><a href="#projects">#projects</a></li>
          </ul>
          <ThemeSwitcher />
        </div>

        <!-- Mobile: theme + hamburger -->
        <div class="flex items-center gap-3 md:hidden">
          <ThemeSwitcher />
          <button
            @click="isOpen = !isOpen"
            class="p-2 rounded-full border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <!-- Hamburger icon -->
            <svg v-if="!isOpen" class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close icon -->
            <svg v-else class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
      >
        <div class="container mx-auto border-l border-r border-gray-200 dark:border-gray-800">
          <ul class="flex flex-col">
            <li>
              <a
                href="#introduction"
                @click="isOpen = false"
                class="block px-6 py-3 text-sm text-neutral-500 dark:text-neutral-400 
                       hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-orange-500 transition-colors"
              >#introduction</a>
            </li>
            <li class="border-t border-gray-100 dark:border-gray-800/50">
              <a
                href="#skills"
                @click="isOpen = false"
                class="block px-6 py-3 text-sm text-neutral-500 dark:text-neutral-400 
                       hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-orange-500 transition-colors"
              >#skills</a>
            </li>
            <li class="border-t border-gray-100 dark:border-gray-800/50">
              <a
                href="#projects"
                @click="isOpen = false"
                class="block px-6 py-3 text-sm text-neutral-500 dark:text-neutral-400 
                       hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-orange-500 transition-colors"
              >#projects</a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>

    <!-- Bottom border full width -->
    <div class="absolute bottom-0 left-0 w-full h-px bg-gray-200 dark:bg-gray-800"></div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
