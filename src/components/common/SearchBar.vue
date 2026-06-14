<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
       style="background: rgba(9, 20, 40, 0.7); backdrop-filter: blur(4px);"
       @click.self="appStore.toggleSearch()">
    <div class="w-[560px] max-w-[90vw] glass-panel-accent p-4">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        placeholder="搜索概念、关键词..."
        class="w-full bg-transparent text-[15px] outline-none py-1"
        style="color: var(--color-text-primary);"
        @keydown.escape="appStore.toggleSearch()"
        @keydown.enter="selectFirst()"
      />
      <div v-if="results.length > 0" class="mt-3 pt-3 max-h-[360px] overflow-y-auto" style="border-top: 1px solid var(--color-border-subtle);">
        <div
          v-for="node in results.slice(0, 10)" :key="node.id"
          @click="goTo(node)"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 hover:bg-[rgba(14,165,233,0.08)]"
        >
          <span class="text-[11px] px-2 py-0.5 rounded-md font-medium"
                :style="{ background: categoryBg[node.category], color: categoryColor[node.category] }">
            L{{ node.level }}
          </span>
          <span class="text-[14px] flex-1" style="color: var(--color-text-primary);">{{ node.name }}</span>
          <span class="text-[12px]" style="color: var(--color-text-dim);">{{ categoryLabel[node.category] }}</span>
        </div>
      </div>
      <div v-else-if="query.length > 0" class="mt-3 pt-6 text-center text-[13px]" style="color: var(--color-text-dim);">
        未找到匹配的概念
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useKnowledgeStore } from '@/stores/knowledgeStore'

const appStore = useAppStore()
const knowledgeStore = useKnowledgeStore()
const router = useRouter()

const query = ref('')
const inputRef = ref<HTMLInputElement>()

onMounted(async () => {
  await nextTick()
  inputRef.value?.focus()
})

const results = computed(() => {
  if (!query.value.trim()) return []
  return knowledgeStore.filteredNodes(query.value, null, null)
})

function selectFirst() {
  if (results.value.length > 0) goTo(results.value[0])
}

function goTo(node: ReturnType<typeof knowledgeStore.filteredNodes>[0]) {
  appStore.toggleSearch()
  appStore.selectNode(node.id)
  router.push(node.id === 'llm' || node.id === 'agent' ? '/' : `/detail/${node.id}`)
}

const categoryLabel: Record<string, string> = { base: '基础', llm: 'LLM', agent: 'Agent' }
const categoryBg: Record<string, string> = {
  base: 'rgba(34,197,94,0.15)',
  llm: 'rgba(59,130,246,0.15)',
  agent: 'rgba(234,179,8,0.15)',
}
const categoryColor: Record<string, string> = {
  base: '#22c55e',
  llm: '#3b82f6',
  agent: '#eab308',
}
</script>
