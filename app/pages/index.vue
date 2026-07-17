<template>
  <div>
    <Navbar />
    <Hero />
    <Skills />
    <Tools />
    <Projects />
    <ClientOnly>
      <SpotifyStatus />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: "Ardian Ilyas — Full Stack Engineer",
  })
</script>
