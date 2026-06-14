<template>
  <div class="h-full overflow-y-auto p-8" v-if="node">
    <div class="max-w-4xl mx-auto">
      <button @click="$router.back()" class="flex items-center gap-2 text-[13px] mb-6 transition-colors" style="color: var(--color-text-dim);">&larr; Back</button>

      <h1 class="text-[26px] font-semibold mb-1" style="color: var(--color-text-primary);">{{ node.name }}</h1>
      <p v-if="node.nameEn" class="text-[14px] mb-4" style="color: var(--color-text-dim);">{{ node.nameEn }}</p>

      <div class="flex items-center gap-2 mb-8">
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium" style="background: rgba(14,165,233,0.12); color: var(--color-arc-blue-light);">Level {{ node.level }}</span>
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium" :style="{ background: catBg, color: catColor }">{{ categoryLabel }}</span>
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium" style="background: rgba(234,179,8,0.12); color: var(--color-titanium-gold);">{{ difficultyLabel }}</span>
      </div>

      <section class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Core Definition</h2>
        <div
          class="glass-panel p-5 text-[14px] leading-relaxed markdown-body"
          style="color: var(--color-text-secondary);"
          v-html="renderMarkdown(node.fullDescription || node.desc)"
        />
      </section>

      <section class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Role &amp; Importance</h2>
        <p class="text-[14px] leading-relaxed" style="color: var(--color-text-secondary);">{{ node.role }}</p>
      </section>

      <section v-if="node.formula" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Key Formula</h2>
        <div class="glass-panel p-5 text-center font-mono text-[16px]" style="color: var(--color-text-primary);">{{ node.formula }}</div>
      </section>

      <section v-if="node.pseudocode" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Algorithm</h2>
        <pre class="text-[13px] leading-relaxed font-mono p-4 rounded-xl border" style="color: var(--color-text-muted); background: rgba(9, 20, 40, 0.8); border-color: var(--color-border-subtle);">{{ node.pseudocode }}</pre>
      </section>

      <section v-if="node.codeExamples.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Code Examples</h2>
        <CodeBlock v-for="(ex, idx) in node.codeExamples" :key="idx" :code="ex.code" :language="ex.language" :title="ex.title" />
      </section>

      <section v-if="node.interviewQuestions.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Interview Questions</h2>
        <div class="space-y-3">
          <div v-for="qa in node.interviewQuestions" :key="qa.id" class="glass-panel p-4">
            <p class="text-[14px] font-medium mb-2" style="color: var(--color-text-primary);">Q: {{ qa.question }}</p>
            <div class="text-[13px] leading-relaxed pl-4 border-l-2 markdown-body" style="color: var(--color-text-muted); border-color: var(--color-border-accent);" v-html="renderMarkdown(qa.answer)" />
          </div>
        </div>
      </section>

      <section v-if="node.bestPractices.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">Best Practices</h2>
        <ul class="space-y-2">
          <li v-for="bp in node.bestPractices" :key="bp" class="text-[14px] flex items-start gap-2" style="color: var(--color-text-secondary);"><span class="mt-1 shrink-0" style="color: var(--color-cat-base);">◆</span> {{ bp }}</li>
        </ul>
      </section>

      <section v-if="node.commonPitfalls.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-armor-red-light);">Common Pitfalls</h2>
        <ul class="space-y-2">
          <li v-for="pit in node.commonPitfalls" :key="pit" class="text-[14px] flex items-start gap-2" style="color: var(--color-text-secondary);"><span class="mt-1 shrink-0" style="color: var(--color-armor-red);">⚠</span> {{ pit }}</li>
        </ul>
      </section>

      <section v-if="node.references.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">References</h2>
        <div class="space-y-2">
          <a v-for="ref in node.references" :key="ref.url" :href="ref.url" target="_blank" class="flex items-center gap-2 text-[14px] transition-colors no-underline" style="color: var(--color-arc-blue-light);">
            <span class="text-[11px] px-2 py-0.5 rounded-md font-medium" style="background: rgba(14,165,233,0.1);">{{ ref.type }}</span> {{ ref.title }}
          </a>
        </div>
      </section>
    </div>
  </div>
  <EmptyState v-else icon="?" title="Concept not found" description="Check the URL and try again" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import CodeBlock from '@/components/common/CodeBlock.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Category } from '@/types'

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

function renderMarkdown(text: string): string {
  if (!text) return ''
  try {
    return marked.parse(text) as string
  } catch {
    return text.replace(/\n/g, '<br>')
  }
}

const route = useRoute()
const knowledgeStore = useKnowledgeStore()

const node = computed(() => {
  const id = route.params.id as string
  return knowledgeStore.getNodeById(id)
})

const catLabels: Record<Category, string> = { base: 'Foundation', llm: 'LLM Tech', agent: 'Agent Tech' }
const catColors: Record<Category, string> = { base: '#22c55e', llm: '#3b82f6', agent: '#eab308' }
const catBgs: Record<Category, string> = { base: 'rgba(34,197,94,0.12)', llm: 'rgba(59,130,246,0.12)', agent: 'rgba(234,179,8,0.12)' }
const diffs: Record<string, string> = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

const categoryLabel = computed(() => node.value ? catLabels[node.value.category] : '')
const catColor = computed(() => node.value ? catColors[node.value.category] : '#22c55e')
const catBg = computed(() => node.value ? catBgs[node.value.category] : 'rgba(34,197,94,0.12)')
const difficultyLabel = computed(() => node.value ? diffs[node.value.difficulty] || '' : '')
</script>
