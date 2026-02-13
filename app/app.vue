<template>
  <div class="relative w-full min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar /> 
    <Hero />
    <Skills />
    <Projects />
    <Footer />
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: "Ardian Ilyas",
    meta: [
      { name: "theme-color", content: "#f97316" }
    ]
  })
</script>