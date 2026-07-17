<template>
  <div class="relative w-full min-h-screen bg-[var(--color-bg)]">

    <!-- Main Content Wrapper -->
    <main class="relative z-10 bg-[var(--color-bg)] mb-[60vh] md:mb-[65vh]" style="transform: translateZ(0); isolation: isolate;">

      <NuxtPage />
    </main>

    <!-- Footer fixed behind main content -->
    <div class="fixed bottom-0 left-0 w-full h-[60vh] md:h-[65vh] z-0 overflow-hidden" style="max-width:100vw;">
      <Footer />
    </div>

  </div>
</template>

<script setup lang="ts">
  useHead({
    title: "Ardian Ilyas — Full Stack Engineer",
    meta: [
      {
        name: "description",
        content:
          "Full-stack engineer specializing in TypeScript, Go, and modern web architecture. Building complete products end-to-end — from backend systems to polished UIs.",
      },
      { name: "theme-color", content: "#FAFAF8" },
      { name: "color-scheme", content: "light" },
    ],
  })
</script>

<style scoped>

</style>