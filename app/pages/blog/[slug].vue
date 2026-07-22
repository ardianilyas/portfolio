<template>
  <div class="blog-post-container">
    <div class="blog-header fade-up">
      <NuxtLink to="/blog" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Blog
      </NuxtLink>
    </div>

    <main class="blog-content fade-up fade-up-1">
      <article v-if="post">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ post.date ? new Date(post.date).toLocaleDateString() : '' }}</span>
          <div class="post-tags" v-if="post.tags">
            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
          </div>
        </div>
        <div class="prose">
          <ContentRenderer :value="post" />
        </div>
      </article>
      
      <div v-else class="not-found">
        <h2>Post not found</h2>
        <p>The article you are looking for does not exist.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData } from '#imports'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: post } = await useAsyncData(`post-detail-${slug.value}`, async () => {
  try {
    // 1. Try querying by path /blog/:slug
    let item = await queryCollection('blog').path(`/blog/${slug.value}`).first()
    if (item) return item

    // 2. Fallback query by stem (blog/:slug)
    item = await queryCollection('blog').where('stem', '=', `blog/${slug.value}`).first()
    if (item) return item

    // 3. Fallback query all and find by slug match
    const all = await queryCollection('blog').all()
    return all.find((p: any) => p.stem?.endsWith(slug.value) || p.path?.endsWith(slug.value)) || null
  } catch (err) {
    console.error('Error fetching blog post:', err)
    return null
  }
})
</script>

<style scoped>
.blog-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  min-height: 100vh;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  margin-bottom: 32px;
  transition: color 0.2s;
  text-decoration: none;
}
.back-link:hover {
  color: var(--color-text);
}
.post-title {
  font-family: var(--font-sans);
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 24px;
  line-height: 1.2;
}
.post-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}
.post-date {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-3);
}
.post-tags {
  display: flex;
  gap: 8px;
}
.post-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 10px;
  background: var(--color-surface-2);
  color: var(--color-text-2);
  border-radius: 6px;
}
.prose {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-2);
}
.prose :deep(h1), .prose :deep(h2), .prose :deep(h3) {
  color: var(--color-text);
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 0.8em;
  letter-spacing: -0.02em;
}
.prose :deep(h1) { font-size: 32px; }
.prose :deep(h2) { font-size: 24px; }
.prose :deep(h3) { font-size: 20px; }
.prose :deep(p) {
  margin-bottom: 1.5em;
}
.prose :deep(ul) {
  list-style: disc;
  padding-left: 1.5em;
  margin-bottom: 1.5em;
}
.prose :deep(li) {
  margin-bottom: 0.5em;
}
.prose :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.prose :deep(a:hover) {
  border-color: var(--color-accent);
}
.prose :deep(pre) {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 14px;
  margin-bottom: 1.5em;
}
.prose :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-surface-2);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
.prose :deep(pre code) {
  background: none;
  padding: 0;
}
.not-found {
  text-align: center;
  padding: 64px 0;
}
.not-found h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--color-text);
}
</style>
