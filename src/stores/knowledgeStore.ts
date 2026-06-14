import { defineStore } from 'pinia'
import type { ConceptNode, Category, Level } from '@/types'
import { knowledgeNodes } from '@/data/knowledge'

export const useKnowledgeStore = defineStore('knowledge', {
  state: () => ({
    nodes: knowledgeNodes as ConceptNode[],
  }),
  getters: {
    nodeMap: (state) => {
      const map: Record<string, ConceptNode> = {}
      state.nodes.forEach(n => map[n.id] = n)
      return map
    },
    nodesByCategory: (state) => {
      const map: Record<string, ConceptNode[]> = { base: [], llm: [], agent: [] }
      state.nodes.forEach(n => map[n.category].push(n))
      return map
    },
    nodesByLevel: (state) => {
      const map: Record<number, ConceptNode[]> = {}
      state.nodes.forEach(n => {
        if (!map[n.level]) map[n.level] = []
        map[n.level].push(n)
      })
      return map
    },
    getNodeById: (state) => (id: string): ConceptNode | undefined => {
      return state.nodes.find(n => n.id === id)
    },
    getPrerequisites: (state) => (nodeId: string): ConceptNode[] => {
      const node = state.nodes.find(n => n.id === nodeId)
      if (!node) return []
      return node.prerequisites.map(id => state.nodes.find(n => n.id === id)).filter(Boolean) as ConceptNode[]
    },
    getNextSteps: (state) => (nodeId: string): ConceptNode[] => {
      const node = state.nodes.find(n => n.id === nodeId)
      if (!node) return []
      return node.nextSteps.map(id => state.nodes.find(n => n.id === id)).filter(Boolean) as ConceptNode[]
    },
    learningPath: (state) => {
      const order = [
        'math-foundation', 'dl-foundation', 'llm', 'agent',
        'transformer', 'attention', 'bpe', 'prompt-engineering',
        'pretrain', 'sft', 'rlhf', 'emergence', 'cot',
        'planning', 'memory', 'toolcall',
        'react', 'plan-execute', 'reflection', 'memory-layers',
        'rag', 'embedding', 'lora', 'dpo', 'context-window',
        'mcp', 'multiagent', 'langchain', 'autogen', 'crewai', 'a2a',
        'quantization', 'agent-evaluation', 'agent-security',
        'agent-reliability', 'agent-vs-chatbot'
      ]
      return order.map(id => state.nodes.find(n => n.id === id)).filter(Boolean) as ConceptNode[]
    },
    filteredNodes: (state) => (query: string, category: Category | null, level: Level | null) => {
      return state.nodes.filter(n => {
        if (category && n.category !== category) return false
        if (level && n.level !== level) return false
        if (query) {
          const q = query.toLowerCase()
          return n.name.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
        }
        return true
      })
    }
  }
})
