import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN || '',
  },
  app: {
    head: {
      title: "Ardian Ilyas — Full Stack Engineer",
      meta: [
        {
          name: "description",
          content:
            "Full-stack engineer specializing in TypeScript, Go, and modern web architecture. Building complete products end-to-end — from backend systems to polished UIs.",
        },
        { name: "color-scheme", content: "light" },
        { name: "theme-color", content: "#FAFAF8" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700;800;900&family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});