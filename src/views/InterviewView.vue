<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-[22px] font-semibold mb-2" style="color: var(--color-text-primary);">面试题库</h1>
      <p class="text-[14px] mb-8" style="color: var(--color-text-dim);">Focus on Agent/LLM high-frequency interview topics across four stages</p>

      <div v-for="stage in stages" :key="stage.name" class="mb-8">
        <div class="glass-panel-accent p-5 mb-3">
          <h3 class="text-[15px] font-semibold mb-1" style="color: var(--color-armor-red-light);">{{ stage.name }}</h3>
          <p class="text-[13px]" style="color: var(--color-text-dim);">{{ stage.desc }}</p>
        </div>

        <div class="space-y-3">
          <div v-for="item in stage.topics" :key="item.nodeId" @click="toggleExpand(item.nodeId)"
               class="glass-panel p-4 cursor-pointer transition-all duration-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-[11px] font-medium" style="color: var(--color-arc-blue-light);">{{ getNodeName(item.nodeId) }}</span>
                <span class="text-[12px]" style="color: var(--color-text-dim);">{{ item.questionCount }} questions</span>
              </div>
              <span class="transition-transform duration-200" style="color: var(--color-text-dim);"
                    :style="{ transform: expanded === item.nodeId ? 'rotate(180deg)' : '' }">▼</span>
            </div>
            <div v-if="expanded === item.nodeId" class="mt-4 space-y-4">
              <p class="text-[13px] italic" style="color: var(--color-text-dim);">
                Detailed questions will be available after knowledge content is added in Task 5.1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'

const knowledgeStore = useKnowledgeStore()
const expanded = ref<string | null>(null)

function toggleExpand(nodeId: string) {
  expanded.value = expanded.value === nodeId ? null : nodeId
}

function getNodeName(nodeId: string) {
  return knowledgeStore.getNodeById(nodeId)?.name || nodeId
}

const stages = computed(() => [
  {
    name: 'Stage 1 · Foundation',
    desc: 'LLM core principles, Transformer architecture, Agent definition',
    topics: [{ nodeId: 'llm', questionCount: 3 }, { nodeId: 'transformer', questionCount: 3 }, { nodeId: 'agent', questionCount: 2 }],
  },
  {
    name: 'Stage 2 · Core High-Frequency',
    desc: 'RAG, memory systems, tool calling, planning, ReAct framework',
    topics: [{ nodeId: 'rag', questionCount: 4 }, { nodeId: 'memory', questionCount: 3 }, { nodeId: 'toolcall', questionCount: 3 }, { nodeId: 'planning', questionCount: 3 }, { nodeId: 'react', questionCount: 3 }],
  },
  {
    name: 'Stage 3 · Advanced',
    desc: 'Multi-agent systems, Chain of Thought, fine-tuning approaches',
    topics: [{ nodeId: 'multiagent', questionCount: 3 }, { nodeId: 'cot', questionCount: 2 }, { nodeId: 'sft', questionCount: 2 }, { nodeId: 'lora', questionCount: 2 }],
  },
  {
    name: 'Stage 4 · Differentiator',
    desc: 'Security, reliability, evaluation, cost optimization',
    topics: [{ nodeId: 'agent-security', questionCount: 3 }, { nodeId: 'agent-reliability', questionCount: 3 }, { nodeId: 'agent-evaluation', questionCount: 2 }],
  },
])
</script>
