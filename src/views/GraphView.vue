<template>
  <div class="h-full flex">
    <KnowledgeGraph
      class="flex-1"
      @select-node="handleSelectNode"
    />
    <SidePanel
      :node-id="appStore.selectedNodeId"
      @select-node="handleSelectNode"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import KnowledgeGraph from '@/components/graph/KnowledgeGraph.vue'
import SidePanel from '@/components/layout/SidePanel.vue'

const appStore = useAppStore()
const knowledgeStore = useKnowledgeStore()
const route = useRoute()
const router = useRouter()

function handleSelectNode(nodeId: string) {
  appStore.selectNode(nodeId)
}

// When node is selected, update URL hash
watch(() => appStore.selectedNodeId, (nodeId) => {
  if (nodeId) {
    router.replace({ hash: '#' + nodeId })
  } else {
    router.replace({ hash: '' })
  }
})

// On mount, if URL has hash, select that node
onMounted(() => {
  if (route.hash) {
    const nodeId = route.hash.slice(1)
    if (knowledgeStore.getNodeById(nodeId)) {
      appStore.selectNode(nodeId)
    }
  }
})
</script>
