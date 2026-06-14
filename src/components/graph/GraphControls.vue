<template>
  <div class="absolute bottom-5 right-5 flex flex-col gap-2">
    <button
      v-for="ctrl in controls" :key="ctrl.label"
      @click="ctrl.action"
      class="w-9 h-9 flex items-center justify-center rounded-lg text-[16px] border transition-all duration-200"
      style="background: rgba(15,39,72,0.85); border-color: var(--color-border-default); color: var(--color-arc-blue-light);"
      :title="ctrl.label"
    >{{ ctrl.icon }}</button>
  </div>
</template>

<script setup lang="ts">
// Controls are simple UI - zoom handled by D3 zoom behavior in KnowledgeGraph
const controls = [
  { icon: '+', label: 'Zoom in', action: () => {} },
  { icon: '−', label: 'Zoom out', action: () => {} },
  { icon: '⟲', label: 'Reset', action: () => {} },
]
</script>
