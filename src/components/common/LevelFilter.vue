<template>
  <div class="flex items-center gap-3">
    <div class="flex gap-1">
      <button v-for="lvl in levels" :key="lvl.value"
        @click="$emit('update:level', level === lvl.value ? null : lvl.value)"
        class="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 border"
        :style="level === lvl.value
          ? 'border-color: var(--color-arc-blue); color: var(--color-arc-blue-light); background: rgba(14,165,233,0.12);'
          : 'border-color: var(--color-border-subtle); color: var(--color-text-dim);'"
      >L{{ lvl.value }}</button>
    </div>
    <div class="w-px h-5" style="background: var(--color-border-default);" />
    <div class="flex gap-1">
      <button v-for="cat in categories" :key="cat.value"
        @click="$emit('update:category', category === cat.value ? null : cat.value)"
        class="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 border"
        :style="category === cat.value ? cat.activeStyle : 'border-color: var(--color-border-subtle); color: var(--color-text-dim);'"
      >{{ cat.label }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Level } from '@/types'

defineProps<{ level: Level | null; category: Category | null }>()
defineEmits<{ 'update:level': [level: Level | null]; 'update:category': [category: Category | null] }>()

const levels = [1,2,3,4,5].map(v => ({ value: v as Level }))
const categories = [
  { value: 'base' as Category, label: '基础', activeStyle: 'border-color: var(--color-cat-base); color: var(--color-cat-base); background: rgba(34,197,94,0.12);' },
  { value: 'llm' as Category, label: 'LLM', activeStyle: 'border-color: var(--color-cat-llm); color: var(--color-cat-llm); background: rgba(59,130,246,0.12);' },
  { value: 'agent' as Category, label: 'Agent', activeStyle: 'border-color: var(--color-cat-agent); color: var(--color-cat-agent); background: rgba(234,179,8,0.12);' },
]
</script>
