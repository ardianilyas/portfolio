<template>
  <div class="blog-container is-visible">
    <div class="blog-header fade-up">
      <NuxtLink to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Home
      </NuxtLink>
      <h1 class="blog-title">Blog</h1>
      <p class="blog-sub">Writing about tech, backend engineering, and web development.</p>
    </div>

    <div class="blog-list fade-up fade-up-1">
      <div v-if="!posts || posts.length === 0" class="no-posts">
        No posts found.
      </div>
      <NuxtLink
        v-for="article in posts"
        :key="article.path || article.stem || article.title"
        :to="getPostUrl(article)"
        class="blog-card"
      >
        <div class="blog-card-meta">
          <span class="blog-date">{{ article.date ? new Date(article.date).toLocaleDateString() : '' }}</span>
          <div class="blog-tags" v-if="article.tags">
            <span v-for="tag in article.tags" :key="tag" class="blog-tag">{{ tag }}</span>
          </div>
        </div>
        <h2 class="blog-card-title">{{ article.title }}</h2>
        <p class="blog-card-desc">{{ article.description }}</p>
        <div class="blog-card-readmore">Read article &rarr;</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#imports'

const { data: posts } = await useAsyncData('blog-posts-list', async () => {
  try {
    const result = await queryCollection('blog').all()
    return result || []
  } catch (err) {
    console.error('Error querying blog collection:', err)
    return []
  }
})

function getPostUrl(article: any): string {
  if (article.path) return article.path
  if (article.stem) return '/' + article.stem
  return '/blog'
}
</script>

<style scoped>
.blog-container {
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
.blog-title {
  font-family: var(--font-sans);
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 12px;
}
.blog-sub {
  font-size: 18px;
  color: var(--color-text-2);
  margin-bottom: 64px;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.no-posts {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text-3);
  padding: 32px 0;
}
.blog-card {
  display: block;
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  text-decoration: none;
}
.blog-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-2);
  box-shadow: 0 12px 24px -12px rgba(0,0,0,0.05);
}
.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.blog-date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-3);
}
.blog-tags {
  display: flex;
  gap: 8px;
}
.blog-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 2px 8px;
  background: var(--color-surface-2);
  color: var(--color-text-2);
  border-radius: 4px;
}
.blog-card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
}
.blog-card-desc {
  font-size: 15px;
  color: var(--color-text-2);
  margin-bottom: 24px;
  line-height: 1.6;
}
.blog-card-readmore {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-accent);
}
</style>
