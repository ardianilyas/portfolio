<template>
  <div class="blog-post-container is-visible">
    <!-- Header Navigation -->
    <div class="blog-header fade-up">
      <NuxtLink to="/blog" class="back-link group" aria-label="Back to Articles">
        <svg class="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Articles</span>
      </NuxtLink>
    </div>

    <!-- Main Content Area -->
    <main class="blog-content fade-up fade-up-1">
      <article v-if="post" class="post-article">
        <!-- Eyebrow Tag -->
        <div class="post-eyebrow">
          <span class="eyebrow-dot"></span>
          <span>// ARTICLE READOUT</span>
        </div>

        <!-- Post Title -->
        <h1 class="post-title">{{ post.title }}</h1>

        <!-- Post Meta Bar -->
        <div class="post-meta">
          <div class="meta-left">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="meta-divider">•</span>
            <span class="reading-time">{{ calculateReadingTime(post) }}</span>
          </div>
          <div class="post-tags" v-if="post.tags && post.tags.length">
            <span v-for="tag in post.tags" :key="tag" class="post-tag">
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Rendered Article Prose -->
        <div class="prose-wrapper">
          <ContentRenderer :value="post" class="prose" />
        </div>

        <!-- Post Footer CTA / Share -->
        <footer class="post-footer">
          <NuxtLink to="/blog" class="footer-back-btn" v-magnetic="0.15">
            ← Back to all articles
          </NuxtLink>
        </footer>
      </article>

      <!-- 404 / Not Found -->
      <div v-else class="not-found-card">
        <span class="not-found-code">// 404_NOT_FOUND</span>
        <h2 class="not-found-title">Article not found</h2>
        <p class="not-found-desc">The article you are looking for does not exist or has been relocated.</p>
        <NuxtLink to="/blog" class="not-found-btn">
          Return to Blog
        </NuxtLink>
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

function formatDate(rawDate?: string): string {
  if (!rawDate) return '2026.07.22'
  const d = new Date(rawDate)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function calculateReadingTime(article: any): string {
  if (!article) return '2 min read'
  if (article.readingTime) return `${article.readingTime} min read`
  const text = (article.description || '') + ' ' + (article.body ? JSON.stringify(article.body) : '')
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(2, Math.ceil(words / 150))
  return `${mins} min read`
}
</script>

<style scoped>
.blog-post-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 120px 24px 100px;
  min-height: 100vh;
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
  margin-bottom: 32px;
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

/* ── Eyebrow ─────────────────────────────────────────────── */
.post-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 16px;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

/* ── Post Title & Meta ───────────────────────────────────── */
.post-title {
  font-family: var(--font-sans);
  font-size: clamp(32px, 5.5vw, 54px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin: 0 0 24px;
  line-height: 1.15;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
  gap: 12px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-3);
}

.post-date {
  font-weight: 500;
  color: var(--color-accent);
}

.meta-divider {
  opacity: 0.4;
}

.reading-time {
  letter-spacing: 0.02em;
}

.post-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.post-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  background: var(--color-surface-2);
  color: var(--color-text-2);
  border-radius: 0;
  border: 1px solid var(--color-border);
}

/* ── Prose Renderer Typography ───────────────────────────── */
.prose-wrapper {
  margin-bottom: 64px;
}

.prose {
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.8;
  color: var(--color-text-2);
}

.prose :deep(h1), .prose :deep(h2), .prose :deep(h3), .prose :deep(h4) {
  font-family: var(--font-sans);
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-top: 2.2em;
  margin-bottom: 0.8em;
  line-height: 1.25;
}

.prose :deep(h2) {
  font-size: clamp(22px, 3.5vw, 30px);
  padding-left: 12px;
  border-left: 3px solid var(--color-accent);
}

.prose :deep(h3) {
  font-size: clamp(18px, 2.8vw, 24px);
}

.prose :deep(p) {
  margin-bottom: 1.6em;
}

.prose :deep(ul), .prose :deep(ol) {
  margin-bottom: 1.6em;
  padding-left: 1.4em;
}

.prose :deep(li) {
  margin-bottom: 0.6em;
}

.prose :deep(strong) {
  color: var(--color-text);
  font-weight: 600;
}

.prose :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px dashed var(--color-accent);
  transition: all 0.2s ease;
}

.prose :deep(a:hover) {
  border-bottom-style: solid;
  background: rgba(15, 63, 47, 0.06);
}

.prose :deep(blockquote) {
  margin: 2em 0;
  padding: 18px 24px;
  background: var(--color-surface);
  border-left: 3px solid var(--color-accent);
  font-style: italic;
  color: var(--color-text);
}

.prose :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-surface-2);
  color: var(--color-accent);
  padding: 0.2em 0.45em;
  border-radius: 0;
  border: 1px solid rgba(15, 63, 47, 0.15);
}

.prose :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border: none;
}

/* ── Post Footer ─────────────────────────────────────────── */
.post-footer {
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-start;
}

.footer-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: #f2e8cf;
  background: var(--color-accent);
  padding: 12px 24px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-back-btn:hover {
  opacity: 0.92;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 63, 47, 0.25);
}

/* ── Not Found ───────────────────────────────────────────── */
.not-found-card {
  text-align: center;
  padding: 80px 24px;
  background: var(--color-surface);
  border: 1px dashed var(--color-border-2);
}

.not-found-code {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent);
  letter-spacing: 0.1em;
}

.not-found-title {
  font-family: var(--font-sans);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin: 12px 0 8px;
}

.not-found-desc {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--color-text-2);
  margin-bottom: 28px;
}

.not-found-btn {
  display: inline-flex;
  padding: 10px 20px;
  background: var(--color-accent);
  color: #f2e8cf;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
</style>
