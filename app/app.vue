<template>
  <div class="relative w-full min-h-screen bg-[var(--color-bg)]">
    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Accessibility Skip Link -->
    <a href="#main-content" class="skip-to-content">
      Skip to main content
    </a>

    <!-- Navbar lives here, outside <main>, so it is never trapped by any stacking context -->
    <Navbar />

    <!-- Main Content Wrapper —— transform: translateZ(0) promotes this to its own GPU
         compositing layer which prevents the fixed footer behind it from flashing
         through during smooth-scroll repaints. Navbar is above this so it is unaffected. -->
    <main id="main-content" class="relative z-10 bg-[var(--color-bg)] mb-[68vh] md:mb-[72vh]" style="transform: translateZ(0);">

      <NuxtPage />
    </main>

    <!-- Footer fixed behind main content -->
    <div class="fixed bottom-0 left-0 w-full h-[68vh] md:h-[72vh] z-0 overflow-hidden" style="max-width:100vw;">
      <Footer />
    </div>

  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const siteUrl = 'https://ardianilyas.com'

  const i18nHead = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true
  })

  useSeoMeta({
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== 'Ardian Ilyas — Full Stack Engineer'
        ? `${titleChunk} | Ardian Ilyas`
        : 'Ardian Ilyas — Full Stack Engineer'
    },
    description: 'Full-stack engineer specializing in TypeScript, Go, and modern web architecture. Building complete products end-to-end — from backend systems to polished UIs.',
    ogSiteName: 'Ardian Ilyas Portfolio',
    ogType: 'website',
    ogImage: `${siteUrl}/hero-visual.png`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@ardianilyas',
    twitterImage: `${siteUrl}/hero-visual.png`
  })

  useHead({
    htmlAttrs: computed(() => ({
      lang: i18nHead.value.htmlAttrs?.lang || 'en',
      dir: i18nHead.value.htmlAttrs?.dir || 'ltr'
    })),
    link: computed(() => [
      {
        rel: 'canonical',
        href: `${siteUrl}${route.path}`
      },
      ...(i18nHead.value.link || [])
    ]),
    meta: computed(() => [
      { name: "theme-color", content: "#FAFAF8" },
      { name: "color-scheme", content: "light" },
      ...(i18nHead.value.meta || [])
    ]),
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${siteUrl}/#person`,
              'name': 'Ardian Ilyas',
              'jobTitle': 'Full Stack Engineer',
              'url': siteUrl,
              'sameAs': [
                'https://github.com/ardianilyas',
                'https://linkedin.com/in/ardianilyas'
              ],
              'knowsAbout': ['TypeScript', 'Go', 'PHP', 'Laravel', 'Vue.js', 'Nuxt.js', 'System Architecture']
            },
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              'url': siteUrl,
              'name': 'Ardian Ilyas Portfolio & System Journal',
              'publisher': { '@id': `${siteUrl}/#person` }
            }
          ]
        })
      }
    ]
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