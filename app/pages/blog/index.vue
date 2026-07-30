<template>
  <div class="blog-container is-visible">
    <!-- Header Section -->
    <header class="blog-header fade-up">
      <!-- Back Link -->
      <NuxtLink to="/" class="back-link group" aria-label="Back to Home">
        <svg class="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </NuxtLink>

      <!-- Eyebrow -->
      <div class="blog-eyebrow">
        <span class="eyebrow-dot"></span>
        <span>// WRITINGS & SYSTEM JOURNAL</span>
      </div>

      <div class="header-title-row">
        <h1 class="blog-title">Blog</h1>
        <span class="posts-count-badge" v-if="posts && posts.length > 0">
          // 0{{ posts.length }} ARTICLES
        </span>
      </div>
      <p class="blog-sub">
        Insights, technical deep dives, and thoughts on backend systems, TypeScript, and modern web architecture.
      </p>
    </header>

    <!-- Articles List Matrix -->
    <main class="blog-list-wrapper fade-up fade-up-1">
      <div v-if="!posts || posts.length === 0" class="no-posts-card">
        <span class="no-posts-code">// 404_EMPTY</span>
        <p class="no-posts-text">No published articles found yet.</p>
      </div>

      <div v-else class="blog-grid">
        <NuxtLink
          v-for="(article, index) in posts"
          :key="article.path || article.stem || article.title"
          :to="getPostUrl(article)"
          class="blog-card group"
        >
          <!-- Top Metadata Bar -->
          <div class="blog-card-meta">
            <div class="meta-left">
              <span class="blog-date">{{ formatDate(article.date) }}</span>
              <span class="meta-divider">•</span>
              <span class="reading-time">{{ calculateReadingTime(article) }}</span>
            </div>
            <div class="blog-tags" v-if="article.tags && article.tags.length">
              <span v-for="tag in article.tags" :key="tag" class="blog-tag">
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Title & Description -->
          <h2 class="blog-card-title">
            {{ article.title }}
          </h2>
          <p class="blog-card-desc" v-if="article.description">
            {{ article.description }}
          </p>

          <!-- Card Action Footer -->
          <div class="blog-card-footer">
            <span class="read-more-text">Read Article</span>
            <svg class="action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#imports'

useSeoMeta({
  title: 'Blog & System Journal',
  description: 'Technical articles, system architecture deep dives, TypeScript patterns, and backend engineering notes by Ardian Ilyas.',
  ogTitle: 'Blog & System Journal — Ardian Ilyas',
  ogDescription: 'Technical articles, system architecture deep dives, TypeScript patterns, and backend engineering notes by Ardian Ilyas.',
  ogType: 'website'
})

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

function formatDate(rawDate?: string): string {
  if (!rawDate) return '2026.07.22'
  const d = new Date(rawDate)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function calculateReadingTime(article: any): string {
  if (article.readingTime) return `${article.readingTime} min read`
  const text = (article.description || '') + ' ' + (article.body ? JSON.stringify(article.body) : '')
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(2, Math.ceil(words / 150))
  return `${mins} min read`
}
</script>

<style scoped>
.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 100px;
  min-height: 100vh;
}

/* ── Blog Header (Flex Column Stacked) ───────────────────── */
.blog-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* ── Back Link ───────────────────────────────────────────── */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  margin-bottom: 24px;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.back-link:hover {
  color: var(--color-accent);
  transform: translateX(-2px);
}

.back-arrow {
  transition: transform 0.2s ease;
}

.back-link:hover .back-arrow {
  transform: translateX(-3px);
}

/* ── Eyebrow Tag ─────────────────────────────────────────── */
.blog-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse-dot 2s infinite alternate;
}

@keyframes pulse-dot {
  0% { opacity: 0.4; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1.2); }
}

/* ── Title Row & Sub ─────────────────────────────────────── */
.header-title-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.blog-title {
  font-family: var(--font-sans);
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin: 0;
  line-height: 1.05;
}

.posts-count-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  padding: 4px 10px;
  background: rgba(15, 63, 47, 0.06);
  border: 1px solid rgba(15, 63, 47, 0.15);
  border-radius: 0;
}

.blog-sub {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.6;
  max-width: 640px;
  margin: 0 0 48px;
}

/* ── Blog Grid & Cards (Sharp 0px Matrix) ───────────────── */
.blog-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 16px;
}

.blog-card {
  display: flex;
  flex-direction: column;
  padding: 32px 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0;
  margin-top: -1px;
  text-decoration: none;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-card:hover {
  background: #FAFAF8;
  border-color: var(--color-accent);
  box-shadow: 0 12px 32px rgba(15, 63, 47, 0.08);
  z-index: 10;
  transform: translateY(-2px);
}

/* Metadata Bar */
.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-3);
}

.blog-date {
  font-weight: 500;
  color: var(--color-accent);
}

.meta-divider {
  opacity: 0.4;
}

.reading-time {
  letter-spacing: 0.02em;
}

.blog-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.blog-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  background: var(--color-surface-2);
  color: var(--color-text-2);
  border-radius: 0;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.blog-card:hover .blog-tag {
  border-color: rgba(15, 63, 47, 0.2);
  color: var(--color-accent);
}

/* Title & Description */
.blog-card-title {
  font-family: var(--font-sans);
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 10px;
  line-height: 1.25;
  transition: color 0.25s ease;
}

.blog-card:hover .blog-card-title {
  color: var(--color-accent);
}

.blog-card-desc {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--color-text-2);
  line-height: 1.6;
  margin: 0 0 24px;
}

/* Card Action Footer */
.blog-card-footer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  margin-top: auto;
}

.action-arrow {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.blog-card:hover .action-arrow {
  transform: translate(3px, -3px);
}

/* Empty State */
.no-posts-card {
  padding: 64px 32px;
  text-align: center;
  background: var(--color-surface);
  border: 1px dashed var(--color-border-2);
}

.no-posts-code {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent);
  letter-spacing: 0.1em;
}

.no-posts-text {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text-2);
  margin-top: 8px;
}
</style>
