<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-[22px] font-semibold mb-2" style="color: var(--color-text-primary);">学习路线图</h1>
      <p class="text-[14px] mb-6" style="color: var(--color-text-dim);">5 levels · 36 concepts · Click to toggle progress</p>
      <LevelStage :level="1" title="入门基础" :nodes="l1Nodes" />
      <LevelStage :level="2" title="核心原理" :nodes="l2Nodes" />
      <LevelStage :level="3" title="关键组件" :nodes="l3Nodes" />
      <LevelStage :level="4" title="进阶技术" :nodes="l4Nodes" />
      <LevelStage :level="5" title="生产落地" :nodes="l5Nodes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import LevelStage from '@/components/roadmap/LevelStage.vue'

const knowledgeStore = useKnowledgeStore()
const l1Nodes = computed(() => knowledgeStore.nodesByLevel[1] || [])
const l2Nodes = computed(() => knowledgeStore.nodesByLevel[2] || [])
const l3Nodes = computed(() => knowledgeStore.nodesByLevel[3] || [])
const l4Nodes = computed(() => knowledgeStore.nodesByLevel[4] || [])
const l5Nodes = computed(() => knowledgeStore.nodesByLevel[5] || [])
</script>
