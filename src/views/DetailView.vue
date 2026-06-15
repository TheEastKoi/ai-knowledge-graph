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
          v-html="renderMarkdown(node.fullDescription || node.desc, node.formulaAnnotations || [])"
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

      <section v-if="node.formulaAnnotations && node.formulaAnnotations.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold mb-3" style="color: var(--color-text-primary);">公式详解</h2>
        <p class="text-[13px] mb-4" style="color: var(--color-text-dim);">点击公式卡片展开查看每个符号的含义</p>
        <FormulaCard v-for="fa in node.formulaAnnotations" :key="fa.id" :annotation="fa" />
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
            <div class="text-[13px] leading-relaxed pl-4 border-l-2 markdown-body" style="color: var(--color-text-muted); border-color: var(--color-border-accent);" v-html="renderMarkdown(qa.answer, [])" />
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
import katex from 'katex'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import CodeBlock from '@/components/common/CodeBlock.vue'
import FormulaCard from '@/components/common/FormulaCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Category, FormulaAnnotation } from '@/types'

// Configure marked — preserve raw HTML output from KaTeX
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Escape HTML for safe embedding in attributes/data
function escHtml(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function renderMarkdown(text: string, annotations: FormulaAnnotation[]): string {
  if (!text) return ''

  try {
    // Build annotation lookup
    const annMap = new Map<string, FormulaAnnotation>()
    for (const a of annotations) {
      annMap.set(a.formula.replace(/[\s\n]+/g, '').slice(0, 40), a)
    }

    function findAnn(f: string): FormulaAnnotation | undefined {
      const n = f.replace(/[\s\n]+/g, '')
      for (const [sig, a] of annMap) {
        if (n === sig || n.startsWith(sig) || sig.startsWith(n) ||
            n.includes(sig.slice(0, 25)) || sig.includes(n.slice(0, 25))) return a
      }
      return undefined
    }

    // === SPLIT text by $$...$$ markers ===
    const parts: string[] = []
    const blockRegex = /\$\$([\s\S]*?)\$\$/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = blockRegex.exec(text)) !== null) {
      // Text before this formula
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      // The formula
      parts.push('__FORMULA__' + match[1])
      lastIndex = match.index + match[0].length
    }
    // Remaining text after last formula
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    // If no formulas found, just render markdown
    if (parts.length === 0 || (parts.length === 1 && !parts[0].startsWith('__FORMULA__'))) {
      const html = marked.parse(text) as string
      // Render any inline math $...$
      return html.replace(/(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)/g, (_m: string, f: string) => {
        try { return katex.renderToString(f.trim(), { displayMode: false, throwOnError: false }) }
        catch { return `<code>${escHtml(f)}</code>` }
      })
    }

    // Render each part
    const rendered = parts.map(part => {
      if (part.startsWith('__FORMULA__')) {
        const formula = part.slice(11).trim()
        let katexHtml = ''
        try {
          katexHtml = katex.renderToString(formula, { displayMode: true, throwOnError: false })
        } catch {
          return `<pre class="if-fallback">${escHtml(formula)}</pre>`
        }

        const ann = findAnn(formula)
        if (ann) {
          const varRows = ann.variables.map(v =>
            `<tr><td class="fvs">${escHtml(v.symbol)}</td><td class="fvn">${escHtml(v.name)}</td><td class="fvm">${escHtml(v.meaning)}</td></tr>`
          ).join('')
          return `<div class="inline-formula" onclick="event.stopPropagation();this.classList.toggle('expanded')"><div class="if-display">${katexHtml}</div><div class="if-toggle"><span>▸ 这个公式在做什么？</span></div><div class="if-detail"><div class="if-purpose">${escHtml(ann.purpose)}</div><div class="if-table-wrap"><table class="if-table"><thead><tr><th>符号</th><th>名称</th><th>含义</th></tr></thead><tbody>${varRows}</tbody></table></div></div></div>`
        }
        return `<div class="inline-formula no-annot" onclick="event.stopPropagation();this.classList.toggle('expanded')"><div class="if-display">${katexHtml}</div><div class="if-toggle"><span>▸ 这是什么？</span></div><div class="if-detail"><div class="if-purpose">暂无详细注释</div></div></div>`
      }

      // Markdown text: render with marked, then inline math
      const mdHtml = marked.parse(part) as string
      return mdHtml.replace(/(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)/g, (_m: string, f: string) => {
        try { return katex.renderToString(f.trim(), { displayMode: false, throwOnError: false }) }
        catch { return `<code>${escHtml(f)}</code>` }
      })
    })

    return rendered.join('')
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
