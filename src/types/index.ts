export type Category = 'base' | 'llm' | 'agent'
export type Level = 1 | 2 | 3 | 4 | 5
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

export interface CodeExample {
  language: string
  title: string
  code: string
  description?: string
}

export interface InterviewQuestion {
  id: string
  question: string
  answer: string
  difficulty: Difficulty
  tags: string[]
}

export interface Reference {
  title: string
  url: string
  type: 'paper' | 'docs' | 'blog' | 'github' | 'video' | 'book'
}

export interface ConceptNode {
  id: string
  name: string
  nameEn?: string
  category: Category
  level: Level
  difficulty: Difficulty

  desc: string
  fullDescription: string
  role: string

  formula?: string
  pseudocode?: string
  codeExamples: CodeExample[]
  architectureDiagram?: string
  flowDiagram?: string

  prerequisites: string[]
  nextSteps: string[]
  relatedConcepts: string[]

  interviewQuestions: InterviewQuestion[]
  bestPractices: string[]
  commonPitfalls: string[]
  references: Reference[]
}

export interface AppState {
  mode: 'normal' | 'guide' | 'interview'
  selectedNodeId: string | null
  searchQuery: string
  learningProgress: Record<string, ProgressStatus>
  focusedLevel: Level | null
}
