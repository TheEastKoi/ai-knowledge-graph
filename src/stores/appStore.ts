import { defineStore } from 'pinia'
import type { Level, ProgressStatus } from '@/types'

const PROGRESS_KEY = 'ai-knowledge-progress'

function loadProgress(): Record<string, ProgressStatus> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(progress: Record<string, ProgressStatus>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export const useAppStore = defineStore('app', {
  state: () => ({
    mode: 'normal' as 'normal' | 'guide' | 'interview',
    selectedNodeId: null as string | null,
    searchQuery: '',
    learningProgress: loadProgress(),
    focusedLevel: null as Level | null,
    isSearchOpen: false,
  }),
  actions: {
    selectNode(nodeId: string | null) {
      this.selectedNodeId = nodeId
    },
    setMode(mode: 'normal' | 'guide' | 'interview') {
      this.mode = mode
      if (mode !== 'guide') this.focusedLevel = null
    },
    toggleMode(mode: 'normal' | 'guide' | 'interview') {
      if (this.mode === mode) {
        this.setMode('normal')
      } else {
        this.setMode(mode)
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen
    },
    markProgress(nodeId: string, status: ProgressStatus) {
      this.learningProgress = { ...this.learningProgress, [nodeId]: status }
      saveProgress(this.learningProgress)
    },
    focusLevel(level: Level | null) {
      this.focusedLevel = level
    },
  },
})
