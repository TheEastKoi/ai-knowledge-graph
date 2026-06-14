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
    // Guided tour
    isGuidedTour: false,
    guidedTourIndex: 0,
  }),
  getters: {
    guidedTourPath: () => {
      // The recommended learning order
      return [
        'llm', 'agent',
        'math-foundation', 'dl-foundation', 'transformer', 'attention', 'prompt-engineering',
        'pretrain', 'bpe', 'sft', 'rlhf', 'dpo', 'emergence', 'cot',
        'planning', 'memory', 'toolcall',
        'react', 'plan-execute', 'reflection', 'memory-layers',
        'rag', 'embedding', 'lora', 'context-window',
        'mcp', 'multiagent', 'langchain', 'autogen', 'crewai', 'a2a',
        'quantization', 'agent-evaluation', 'agent-security',
        'agent-reliability', 'agent-vs-chatbot'
      ]
    },
  },
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
    // Guided tour actions
    startGuidedTour() {
      this.isGuidedTour = true
      this.guidedTourIndex = 0
      this.mode = 'normal'
      const firstId = this.guidedTourPath[0]
      if (firstId) this.selectNode(firstId)
    },
    stopGuidedTour() {
      this.isGuidedTour = false
    },
    tourNext() {
      if (this.guidedTourIndex < this.guidedTourPath.length - 1) {
        this.guidedTourIndex++
        this.selectNode(this.guidedTourPath[this.guidedTourIndex])
      }
    },
    tourPrev() {
      if (this.guidedTourIndex > 0) {
        this.guidedTourIndex--
        this.selectNode(this.guidedTourPath[this.guidedTourIndex])
      }
    },
    tourGoTo(index: number) {
      if (index >= 0 && index < this.guidedTourPath.length) {
        this.guidedTourIndex = index
        this.selectNode(this.guidedTourPath[index])
      }
    },
  },
})
