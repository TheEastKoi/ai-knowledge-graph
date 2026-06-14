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
import { useAppStore } from '@/stores/appStore'
import KnowledgeGraph from '@/components/graph/KnowledgeGraph.vue'
import SidePanel from '@/components/layout/SidePanel.vue'

const appStore = useAppStore()

function handleSelectNode(nodeId: string) {
  appStore.selectNode(nodeId)
}
</script>
