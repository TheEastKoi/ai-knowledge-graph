<template>
  <router-link :to="`/detail/${node.id}`" class="glass-panel p-5 block no-underline transition-all duration-200 hover:translate-y-[-2px] group" style="border-color: var(--color-border-default);">
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-[15px] font-semibold transition-colors" style="color: var(--color-text-primary);">{{ node.name }}</h3>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium" :style="{ background: levelBg, color: levelColor }">L{{ node.level }}</span>
        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium" :style="{ background: catBg, color: catColor }">{{ categoryLabel }}</span>
      </div>
    </div>
    <p class="text-[13px] leading-relaxed line-clamp-2" style="color: var(--color-text-muted);">{{ node.desc }}</p>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ConceptNode } from '@/types'

const props = defineProps<{ node: ConceptNode }>()

const catColors: Record<string, string> = { base: '#22c55e', llm: '#3b82f6', agent: '#eab308' }
const catLabels: Record<string, string> = { base: '基础', llm: 'LLM 技术', agent: 'Agent' }
const catBgs: Record<string, string> = { base: 'rgba(34,197,94,0.12)', llm: 'rgba(59,130,246,0.12)', agent: 'rgba(234,179,8,0.12)' }

const categoryLabel = computed(() => catLabels[props.node.category])
const levelColor = computed(() => catColors[props.node.category])
const levelBg = computed(() => catBgs[props.node.category])
const catColor = computed(() => catColors[props.node.category])
const catBg = computed(() => catBgs[props.node.category])
</script>
