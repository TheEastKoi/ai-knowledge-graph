<template>
  <div class="glass-panel-accent p-5 mb-4">
    <div class="flex items-center gap-3 mb-3">
      <span class="text-[11px] px-2.5 py-1 rounded-lg font-medium"
            style="background: rgba(14,165,233,0.12); color: var(--color-arc-blue-light);">
        第{{ level }}层
      </span>
      <h3 class="text-[16px] font-semibold" style="color: var(--color-text-primary);">{{ title }}</h3>
      <span class="text-[13px] ml-auto" style="color: var(--color-text-dim);">{{ completedCount }}/{{ nodes.length }}</span>
    </div>
    <div class="space-y-2">
      <div v-for="node in nodes" :key="node.id" @click="toggleProgress(node.id)"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(14,165,233,0.06)]">
        <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
             :style="progressStyle(node.id)">
          <span v-if="progress[node.id] === 'completed'" class="text-[10px] text-white">✓</span>
          <span v-else-if="progress[node.id] === 'in_progress'" class="w-2 h-2 rounded-full" style="background: var(--color-titanium-gold);" />
        </div>
        <div class="flex-1">
          <span class="text-[14px]" style="color: var(--color-text-primary);">{{ node.name }}</span>
          <span class="text-[12px] ml-2" style="color: var(--color-text-dim);">{{ node.desc.slice(0, 40) }}...</span>
        </div>
        <span class="text-[11px] px-2 py-0.5 rounded-md font-medium shrink-0" :style="categoryStyle(node.category)">
          {{ catLabel(node.category) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import type { ConceptNode, Category, ProgressStatus } from '@/types'

const props = defineProps<{ level: number; title: string; nodes: ConceptNode[] }>()
const appStore = useAppStore()
const progress = computed(() => appStore.learningProgress)
const completedCount = computed(() => props.nodes.filter(n => progress.value[n.id] === 'completed').length)

function progressStyle(nodeId: string) {
  const s = progress.value[nodeId]
  if (s === 'completed') return 'border-color: var(--color-cat-base); background: var(--color-cat-base);'
  if (s === 'in_progress') return 'border-color: var(--color-titanium-gold);'
  return 'border-color: var(--color-border-subtle);'
}

function toggleProgress(nodeId: string) {
  const current = progress.value[nodeId] || 'not_started'
  const next: ProgressStatus = current === 'not_started' ? 'in_progress' : current === 'in_progress' ? 'completed' : 'not_started'
  appStore.markProgress(nodeId, next)
}

function categoryStyle(cat: Category) {
  const map: Record<string, { bg: string; color: string }> = {
    base: { bg: 'rgba(34,197,94,0.12)', color: 'var(--color-cat-base)' },
    llm: { bg: 'rgba(59,130,246,0.12)', color: 'var(--color-cat-llm)' },
    agent: { bg: 'rgba(234,179,8,0.12)', color: 'var(--color-cat-agent)' },
  }
  const s = map[cat] || map.base
  return { background: s.bg, color: s.color }
}

function catLabel(cat: Category) { return { base: '基础', llm: 'LLM', agent: 'Agent' }[cat] }
</script>
