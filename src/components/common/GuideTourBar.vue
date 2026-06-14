<template>
  <div
    v-if="appStore.isGuidedTour"
    class="fixed bottom-0 left-0 right-0 z-40 px-6 py-4"
    style="background: rgba(15, 39, 72, 0.92); backdrop-filter: blur(16px); border-top: 1px solid var(--color-border-default);"
  >
    <div class="max-w-5xl mx-auto flex items-center gap-4">
      <!-- Progress bar -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[12px] font-medium" style="color: var(--color-arc-blue-light);">
            Guided Tour
          </span>
          <span class="text-[12px]" style="color: var(--color-text-dim);">
            {{ appStore.guidedTourIndex + 1 }} / {{ appStore.guidedTourPath.length }}
          </span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden" style="background: rgba(14, 165, 233, 0.1);">
          <div
            class="h-full rounded-full transition-all duration-300 ease-out"
            style="background: var(--color-arc-blue);"
            :style="{ width: `${((appStore.guidedTourIndex + 1) / appStore.guidedTourPath.length) * 100}%` }"
          />
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          @click="navigateTour('prev')"
          :disabled="appStore.guidedTourIndex === 0"
          class="px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 flex items-center gap-2"
          :style="appStore.guidedTourIndex === 0
            ? 'border-color: var(--color-border-subtle); color: var(--color-text-dim); opacity: 0.4; cursor: not-allowed;'
            : 'border-color: var(--color-border-default); color: var(--color-text-muted);'"
        >
          <span>←</span> Prev
        </button>

        <span class="text-[14px] font-semibold px-2 min-w-[120px] text-center truncate" style="color: var(--color-text-primary);">
          {{ currentNode?.name || '...' }}
        </span>

        <button
          @click="navigateTour('next')"
          :disabled="appStore.guidedTourIndex >= appStore.guidedTourPath.length - 1"
          class="px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 flex items-center gap-2"
          :style="appStore.guidedTourIndex >= appStore.guidedTourPath.length - 1
            ? 'border-color: var(--color-border-subtle); color: var(--color-text-dim); opacity: 0.4; cursor: not-allowed;'
            : 'border-color: var(--color-arc-blue); color: var(--color-arc-blue-light); background: rgba(14,165,233,0.1);'"
        >
          Next <span>→</span>
        </button>

        <button
          @click="appStore.stopGuidedTour()"
          class="px-3 py-2 rounded-lg text-[13px] transition-all duration-200"
          style="color: var(--color-text-dim);"
          title="Exit tour (Esc)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useKnowledgeStore } from '@/stores/knowledgeStore'

const appStore = useAppStore()
const knowledgeStore = useKnowledgeStore()
const route = useRoute()
const router = useRouter()

const currentNode = computed(() => {
  const id = appStore.guidedTourPath[appStore.guidedTourIndex]
  return id ? knowledgeStore.getNodeById(id) : null
})

function navigateTour(direction: 'next' | 'prev') {
  if (direction === 'next') {
    appStore.tourNext()
  } else {
    appStore.tourPrev()
  }

  const newId = appStore.guidedTourPath[appStore.guidedTourIndex]
  if (!newId) return

  // Sync router: if on detail page, navigate to new detail; if elsewhere, go to graph
  if (route.name === 'detail') {
    router.replace({ name: 'detail', params: { id: newId } })
  } else if (route.name !== 'graph') {
    router.replace({ name: 'graph', hash: '#' + newId })
  } else {
    // On graph view, update hash
    router.replace({ hash: '#' + newId })
  }
}

// Keyboard shortcuts
function handleKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    navigateTour('next')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    navigateTour('prev')
  } else if (e.key === 'Escape') {
    e.preventDefault()
    appStore.stopGuidedTour()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>
