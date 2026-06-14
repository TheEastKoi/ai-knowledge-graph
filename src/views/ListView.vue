<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-[22px] font-semibold mb-2" style="color: var(--color-text-primary);">知识列表</h1>
      <p class="text-[14px] mb-6" style="color: var(--color-text-dim);">Browse all {{ knowledgeStore.nodes.length }} concepts, filterable by level and category</p>
      <LevelFilter v-model:level="level" v-model:category="category" class="mb-6" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConceptCard v-for="node in filtered" :key="node.id" :node="node" />
      </div>
      <EmptyState v-if="filtered.length === 0" icon="∅" title="No results" description="Try adjusting your filters" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import LevelFilter from '@/components/common/LevelFilter.vue'
import ConceptCard from '@/components/common/ConceptCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Category, Level } from '@/types'

const knowledgeStore = useKnowledgeStore()
const level = ref<Level | null>(null)
const category = ref<Category | null>(null)
const filtered = computed(() => knowledgeStore.filteredNodes('', category.value, level.value))
</script>
