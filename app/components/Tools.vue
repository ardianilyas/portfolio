<template>
  <section id="tools" aria-labelledby="tools-heading">

    <SectionHeader label="TOOLBOX" title="Workflow" />

    <div class="tools-wrap">
      <div class="tools-inner max-w-[1100px] mx-auto">

        <!-- Left: philosophy statement -->
        <div class="tools-philosophy">
          <p class="philosophy-text">
            Good tooling fades into the background. I choose tools that remove friction, scale with the project, and get out of the way so the work can speak for itself.
          </p>
          <p class="philosophy-sub">
            The stack adapts to the problem — not the other way around.
          </p>
        </div>

        <!-- Right: tool strip -->
        <div class="tools-strip" aria-label="Tools I use">
          <div
            v-for="tool in tools"
            :key="tool.name"
            class="tool-card"
            :style="{ '--card-border': tool.borderColor }"
          >
            <!-- Icon block -->
            <div class="tool-icon-wrapper" :style="{ backgroundColor: tool.bgColor }">
              <svg
                v-if="tool.name === 'GitHub'"
                class="tool-icon tool-icon--svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :aria-label="tool.name"
                role="img"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <img
                v-else
                :src="tool.icon"
                :alt="tool.name"
                class="tool-icon"
                loading="lazy"
                width="28"
                height="28"
              />
            </div>
            
            <!-- Text block -->
            <div class="tool-info">
              <div class="tool-name">{{ tool.name }}</div>
              <div class="tool-category">{{ tool.category }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tools = [
  { name: 'Figma',   category: 'Design',          icon: 'https://svgl.app/library/figma.svg', bgColor: '#fdf2f8', borderColor: '#fbcfe8' }, // light pink
  { name: 'VS Code', category: 'Code Editor',     icon: 'https://svgl.app/library/vscode.svg', bgColor: '#eff6ff', borderColor: '#bfdbfe' }, // light blue
  { name: 'Git',     category: 'Version Control', icon: 'https://svgl.app/library/git.svg', bgColor: '#fff7ed', borderColor: '#fed7aa' }, // light orange
  { name: 'GitHub',  category: 'Repository',      icon: null, bgColor: '#f3f4f6', borderColor: '#e5e7eb' }, // light gray
  { name: 'Vercel',  category: 'Deployment',      icon: 'https://api.iconify.design/logos:vercel-icon.svg', bgColor: '#f3f4f6', borderColor: '#e5e7eb' },
  { name: 'Postman', category: 'API Testing',     icon: 'https://svgl.app/library/postman.svg', bgColor: '#fff7ed', borderColor: '#fed7aa' },
  { name: 'Vitest',  category: 'Testing',         icon: 'https://svgl.app/library/vitest.svg', bgColor: '#ecfccb', borderColor: '#d9f99d' }, // lime green for vitest
  { name: 'Safari',  category: 'Browser',         icon: 'https://svgl.app/library/safari.svg', bgColor: '#eff6ff', borderColor: '#bfdbfe' },
]
</script>

<style scoped>
/* ── Wrap ────────────────────────────────────────────── */
.tools-wrap {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .tools-wrap {
    padding: 0 40px;
  }
}

/* ── Inner grid ───────────────────────────────────────── */
.tools-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding: 56px 0 72px;
}

@media (min-width: 768px) {
  .tools-inner {
    grid-template-columns: 2fr 3fr;
    gap: 64px;
    align-items: center;
  }
}

/* ── Philosophy ───────────────────────────────────────── */
.philosophy-text {
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: -0.015em;
  color: var(--color-text-2);
  margin: 0 0 20px;
}

.philosophy-sub {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: var(--color-text-3);
  margin: 0;
}

/* ── Tool strip ───────────────────────────────────────── */
.tools-strip {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 480px) {
  .tools-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ── Individual tool card ─────────────────────────────── */
.tool-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--card-border, var(--color-border));
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

/* ── Icon ─────────────────────────────────────────────── */
.tool-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
}

.tool-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.tool-icon--svg {
  color: var(--color-text-2);
}

/* ── Info block ───────────────────────────────────────── */
.tool-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tool-name {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.tool-category {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.2;
}
</style>
