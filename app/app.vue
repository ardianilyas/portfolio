<template>
  <div class="relative w-full min-h-screen bg-[var(--color-bg)]">
    <!-- Accessibility Skip Link -->
    <a href="#main-content" class="skip-to-content">
      Skip to main content
    </a>

    <!-- Navbar lives here, outside <main>, so it is never trapped by any stacking context -->
    <Navbar />

    <!-- Main Content Wrapper —— transform: translateZ(0) promotes this to its own GPU
         compositing layer which prevents the fixed footer behind it from flashing
         through during smooth-scroll repaints. Navbar is above this so it is unaffected. -->
    <main id="main-content" class="relative z-10 bg-[var(--color-bg)] mb-[60vh] md:mb-[65vh]" style="transform: translateZ(0);">

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
main {
  /* Counterpart to transform: translateZ(0) on the element itself.
     Keeps this layer opaque during scroll repaints. */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>