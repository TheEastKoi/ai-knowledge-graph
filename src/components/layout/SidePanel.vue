<template>
  <div class="w-[420px] shrink-0 border-l overflow-y-auto"
       style="background: rgba(15, 39, 72, 0.75); backdrop-filter: blur(16px); border-color: var(--color-border-default);">
    <EmptyState
      v-if="!node"
      icon="◉"
      title="探索知识网络"
      description="点击图谱中的节点查看详细解释，或使用搜索快速定位概念。"
    />
    <div v-else class="p-6">
      <h2 class="text-[20px] font-semibold mb-2" style="color: var(--color-text-primary);">{{ node.name }}</h2>
      <p v-if="node.nameEn" class="text-[13px] mb-4" style="color: var(--color-text-dim);">{{ node.nameEn }}</p>

      <!-- Badges -->
      <div class="flex items-center gap-2 mb-5">
        <span class="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              :style="{ background: levelBg, color: levelColor }">
          第{{ node.level }}层 · {{ levelLabel }}
        </span>
        <span class="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              :style="{ background: catBg, color: catColor }">
          {{ catLabel }}
        </span>
      </div>

      <!-- Description -->
      <h3 class="text-[12px] font-semibold uppercase tracking-wider mb-2" style="color: var(--color-text-dim);">Core Definition</h3>
      <p class="text-[14px] leading-relaxed mb-5" style="color: var(--color-text-secondary);">{{ node.desc }}</p>

      <h3 class="text-[12px] font-semibold uppercase tracking-wider mb-2" style="color: var(--color-text-dim);">Role</h3>
      <p class="text-[14px] leading-relaxed mb-5" style="color: var(--color-text-secondary);">{{ node.role }}</p>

      <!-- Prerequisites -->
      <div class="glass-panel p-4 mb-4">
        <h4 class="text-[12px] font-semibold mb-3" style="color: var(--color-arc-blue-light);">Previous</h4>
        <div v-if="prereqNodes.length" class="flex flex-wrap gap-2">
          <button v-for="pn in prereqNodes" :key="pn.id"
                  @click="$emit('selectNode', pn.id)"
                  class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200 border"
                  style="border-color: rgba(239,68,68,0.25); background: rgba(239,68,68,0.08); color: var(--color-armor-red-light);">
            {{ pn.name }}
          </button>
        </div>
        <p v-else class="text-[13px]" style="color: var(--color-text-dim);">No prerequisites - start here!</p>
      </div>

      <!-- Next Steps -->
      <div class="glass-panel p-4 mb-4">
        <h4 class="text-[12px] font-semibold mb-3" style="color: var(--color-arc-blue-light);">Next</h4>
        <div v-if="nextNodes.length" class="flex flex-wrap gap-2">
          <button v-for="nn in nextNodes" :key="nn.id"
                  @click="$emit('selectNode', nn.id)"
                  class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200 border"
                  style="border-color: rgba(14,165,233,0.25); background: rgba(14,165,233,0.08); color: var(--color-arc-blue-pale);">
            &rarr; {{ nn.name }}
          </button>
        </div>
        <p v-else class="text-[13px]" style="color: var(--color-text-dim);">Top of this branch</p>
      </div>

      <!-- Related -->
      <h3 class="text-[12px] font-semibold uppercase tracking-wider mb-3" style="color: var(--color-text-dim);">Related</h3>
      <div class="flex flex-wrap gap-2">
        <button v-for="rn in relatedNodes" :key="rn.id"
                @click="$emit('selectNode', rn.id)"
                class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200 border"
                style="border-color: var(--color-border-subtle); color: var(--color-text-muted);">
          {{ rn.name }}
        </button>
      </div>

      <!-- Link to full detail -->
      <router-link :to="`/detail/${node.id}`"
                   class="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[14px] font-medium border transition-all duration-200 no-underline"
                   style="border-color: var(--color-arc-blue); color: var(--color-arc-blue-light);">
        View Full Details &rarr;
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import EmptyState from '@/components/common/EmptyState.vue'

const props = defineProps<{ nodeId: string | null }>()
defineEmits<{ selectNode: [nodeId: string] }>()

const knowledgeStore = useKnowledgeStore()

const node = computed(() => props.nodeId ? knowledgeStore.getNodeById(props.nodeId) : null)
const prereqNodes = computed(() => props.nodeId ? knowledgeStore.getPrerequisites(props.nodeId) : [])
const nextNodes = computed(() => props.nodeId ? knowledgeStore.getNextSteps(props.nodeId) : [])
const relatedNodes = computed(() => {
  if (!node.value) return []
  return node.value.relatedConcepts
    .map(id => knowledgeStore.getNodeById(id))
    .filter(Boolean) as any[]
})

const levelLabel = computed(() => {
  const labels: Record<number, string> = { 1: '入门基础', 2: '核心原理', 3: '关键组件', 4: '进阶技术', 5: '生产落地' }
  return node.value ? labels[node.value.level] || '' : ''
})

const catLabel = computed(() => {
  const labels: Record<string, string> = { base: '核心基础', llm: '大模型技术', agent: 'Agent 技术' }
  return node.value ? labels[node.value.category] || '' : ''
})

const catColors: Record<string, string> = { base: '#22c55e', llm: '#3b82f6', agent: '#eab308' }
const catBgs: Record<string, string> = { base: 'rgba(34,197,94,0.12)', llm: 'rgba(59,130,246,0.12)', agent: 'rgba(234,179,8,0.12)' }

const levelColor = computed(() => node.value ? catColors[node.value.category] : '#22c55e')
const levelBg = computed(() => node.value ? catBgs[node.value.category] : 'rgba(34,197,94,0.12)')
const catColor = computed(() => levelColor.value)
const catBg = computed(() => levelBg.value)
</script>
