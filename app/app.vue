<template>
  <div class="relative w-full min-h-screen" style="background-color: var(--color-bg); color: var(--color-primary);">

    <!-- Vertical container lines -->
    <div class="container-lines" aria-hidden="true">
      <div class="container-lines-inner">
        <div class="line line-left"></div>
        <div class="line line-right"></div>
      </div>
    </div>

    <Navbar />
    <Hero />
    <Skills />
    <Tools />
    <Projects />
    <Footer />
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: "Ardian Ilyas",
    meta: [
      { name: "description", content: "Backend-focused web developer specializing in JavaScript, TypeScript, PHP, and Golang. Building scalable server-side applications with ExpressJS, Laravel, and modern frameworks." },
      { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#FAFAF8", key: "theme-light" },
      { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#FAFAF8", key: "theme-dark" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "color-scheme", content: "light" }
    ]
  })
</script>

<style scoped>
.container-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.container-lines-inner {
  position: relative;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container-lines-inner {
    padding: 0 40px;
  }
}

.line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--color-rule);
  display: none;
}

@media (min-width: 768px) {
  .line {
    display: block;
  }
}

.line-left {
  left: 0;
}

.line-right {
  right: 0;
}
</style>