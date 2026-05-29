<template>
  <div class="min-h-screen w-full bg-white flex flex-col select-none font-sans antialiased text-zinc-900">
    <Navbar />
    
    <main class="flex-1 divide-y divide-zinc-200/80">
      <Hero />
      <Skills />
      <Tools />
      <Projects />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: "Ardian Ilyas - Junior Web Developer",
    meta: [
      { name: "theme-color", content: "#FAFAFA" },
      { name: "description", content: "Portfolio of Ardian Ilyas, Junior Web Developer focusing on scalable backend architecture." }
    ],
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" }
    ]
  })
</script>