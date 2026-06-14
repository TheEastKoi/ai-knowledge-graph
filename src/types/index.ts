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

export interface VariableExplanation {
  symbol: string       // 符号，如 Q, K, V, d_k
  name: string         // 中文名，如 "查询矩阵"
  meaning: string      // 一句话解释
}

export interface FormulaAnnotation {
  id: string           // 唯一标识
  title: string        // 公式名称，如 "缩放点积注意力"
  formula: string      // LaTeX 公式
  purpose: string      // 这个公式在干什么（通俗解释）
  variables: VariableExplanation[]  // 每个符号的含义
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

  prerequisites: string[]
  nextSteps: string[]
  relatedConcepts: string[]

  interviewQuestions: InterviewQuestion[]
  bestPractices: string[]
  commonPitfalls: string[]
  references: Reference[]

  formulaAnnotations?: FormulaAnnotation[]
}

export interface AppState {
  mode: 'normal' | 'guide' | 'interview'
  selectedNodeId: string | null
  searchQuery: string
  learningProgress: Record<string, ProgressStatus>
  focusedLevel: Level | null
}
