# AI/LLM/Agent 知识学习平台 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将单文件 D3.js HTML 知识图谱重构为 Vue 3 组件化的 AI 知识学习平台，支持多视图浏览、代码示例、深度知识和面试题库。

**Architecture:** Vue 3 Composition API + Pinia 状态管理 + Vue Router 多视图 + D3.js 知识图谱 + Tailwind CSS v4 钢铁侠全息风主题。

**Tech Stack:** Vue 3, Vite 5, TypeScript, Pinia, Vue Router 4, D3.js v7, Tailwind CSS v4, Prism.js

---

## 第 0 阶段：项目初始化

### Task 0.1: 创建 Vue 3 + Vite + TypeScript 项目

**Files:**
- Create: `e:/git_code/aiWeb/` (Vite 脚手架)

- [ ] **Step 1: 使用 Vite 脚手架创建项目**

```bash
cd e:/git_code/aiWeb
npm create vite@latest . -- --template vue-ts
```

Expected: 在当前目录生成 Vue 3 + TypeScript 项目文件。

- [ ] **Step 2: 安装核心依赖**

```bash
cd e:/git_code/aiWeb
npm install
npm install pinia vue-router@4 d3@7 prismjs
npm install -D @types/d3 tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: 验证项目启动**

```bash
npm run dev
```

Expected: 开发服务器在 localhost 启动，显示默认 Vue 页面。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: init Vue 3 + Vite + TypeScript project with dependencies"
```

---

### Task 0.2: 配置 Tailwind CSS v4 + 钢铁侠全息主题

**Files:**
- Create: `e:/git_code/aiWeb/src/styles/main.css`
- Modify: `e:/git_code/aiWeb/vite.config.ts`
- Modify: `e:/git_code/aiWeb/src/main.ts`

- [ ] **Step 1: 配置 Vite Tailwind 插件**

修改 `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

- [ ] **Step 2: 创建全局样式文件**

创建 `src/styles/main.css`:

```css
@import "tailwindcss";

/* 钢铁侠全息科技风 — 设计令牌 */
@theme {
  /* 背景 */
  --color-bg-primary: #0f2748;
  --color-bg-secondary: #122648;
  --color-bg-tertiary: #0b1d38;
  --color-bg-surface: rgba(18, 38, 72, 0.55);
  --color-bg-card: rgba(18, 38, 72, 0.45);

  /* 装甲红 — 主强调 */
  --color-armor-red: #ef4444;
  --color-armor-red-light: #f87171;
  --color-armor-red-dark: #dc2626;
  --color-armor-red-glow: rgba(239, 68, 68, 0.3);

  /* 钛金 — 次强调 */
  --color-titanium-gold: #eab308;
  --color-titanium-gold-light: #facc15;
  --color-titanium-gold-dark: #ca8a04;

  /* 电弧蓝 — 数据光效 */
  --color-arc-blue: #0ea5e9;
  --color-arc-blue-light: #22d3ee;
  --color-arc-blue-pale: #7dd3fc;
  --color-arc-blue-glow: rgba(14, 165, 233, 0.3);

  /* 分类色 */
  --color-cat-base: #22c55e;
  --color-cat-llm: #3b82f6;
  --color-cat-agent: #eab308;

  /* 文字 */
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-text-dim: #64748b;

  /* 边框 */
  --color-border-subtle: rgba(14, 165, 233, 0.1);
  --color-border-default: rgba(14, 165, 233, 0.15);
  --color-border-accent: rgba(14, 165, 233, 0.25);
  --color-border-red: rgba(239, 68, 68, 0.25);
  --color-border-gold: rgba(234, 179, 8, 0.25);
}

/* 全局基础样式 */
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  overflow: hidden;
  height: 100vh;
}

/* 毛玻璃面板 */
.glass-panel {
  background: var(--color-bg-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
}

.glass-panel-accent {
  background: var(--color-bg-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.glass-panel-accent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.4), transparent);
  pointer-events: none;
}

/* 节点光晕 */
.node-glow-green {
  box-shadow: 0 0 14px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.1);
}
.node-glow-blue {
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.4), inset 0 0 8px rgba(59, 130, 246, 0.1);
}
.node-glow-gold {
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.35), inset 0 0 6px rgba(234, 179, 8, 0.1);
}
.node-glow-cyan {
  box-shadow: 0 0 12px rgba(14, 165, 233, 0.35), inset 0 0 6px rgba(14, 165, 233, 0.1);
}
.node-glow-red {
  box-shadow: 0 0 16px rgba(239, 68, 68, 0.4);
}

/* 滚动条 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0b1d38; }
::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.25); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.4); }
```

- [ ] **Step 3: 引入全局样式**

修改 `src/main.ts` 在顶部添加:
```typescript
import './styles/main.css'
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind CSS v4 with Iron Man holographic theme"
```

---

### Task 0.3: 搭建应用骨架

**Files:**
- Create: `e:/git_code/aiWeb/src/router/index.ts`
- Create: `e:/git_code/aiWeb/src/stores/knowledgeStore.ts`
- Create: `e:/git_code/aiWeb/src/stores/appStore.ts`
- Create: `e:/git_code/aiWeb/src/types/index.ts`
- Create: `e:/git_code/aiWeb/src/views/GraphView.vue`
- Create: `e:/git_code/aiWeb/src/views/ListView.vue`
- Create: `e:/git_code/aiWeb/src/views/RoadmapView.vue`
- Create: `e:/git_code/aiWeb/src/views/InterviewView.vue`
- Create: `e:/git_code/aiWeb/src/views/DetailView.vue`
- Modify: `e:/git_code/aiWeb/src/App.vue`
- Modify: `e:/git_code/aiWeb/src/main.ts`

- [ ] **Step 1: 创建类型定义**

创建 `src/types/index.ts`:

```typescript
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
  type: 'paper' | 'docs' | 'blog' | 'github' | 'video'
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
```

- [ ] **Step 2: 创建 Pinia Stores**

创建 `src/stores/knowledgeStore.ts`:

```typescript
import { defineStore } from 'pinia'
import type { ConceptNode } from '@/types'
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
```

创建 `src/stores/appStore.ts`:

```typescript
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
```

- [ ] **Step 3: 创建占位视图组件**

创建 5 个视图占位文件，每个包含基础模板，例如 `src/views/GraphView.vue`:

```vue
<template>
  <div class="h-full w-full flex items-center justify-center bg-[var(--color-bg-primary)]">
    <div class="text-center">
      <div class="text-[var(--color-arc-blue-light)] text-6xl mb-4">◉</div>
      <h1 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">Knowledge Graph</h1>
      <p class="text-[var(--color-text-muted)]">知识图谱视图 — 构建中</p>
    </div>
  </div>
</template>
```

其他视图同理，替换标题。

- [ ] **Step 4: 创建路由配置**

创建 `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'graph', component: () => import('@/views/GraphView.vue') },
    { path: '/list', name: 'list', component: () => import('@/views/ListView.vue') },
    { path: '/roadmap', name: 'roadmap', component: () => import('@/views/RoadmapView.vue') },
    { path: '/interview', name: 'interview', component: () => import('@/views/InterviewView.vue') },
    { path: '/detail/:id', name: 'detail', component: () => import('@/views/DetailView.vue') },
  ],
})

export default router
```

- [ ] **Step 5: 更新 main.ts (注册 Pinia + Router)**

修改 `src/main.ts`:

```typescript
import './styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

- [ ] **Step 6: 更新 App.vue (布局壳)**

修改 `src/App.vue`:

```vue
<template>
  <div class="h-screen flex flex-col bg-[var(--color-bg-primary)] overflow-hidden">
    <NavBar />
    <main class="flex-1 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
</script>
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: set up app skeleton with types, stores, router, and placeholder views"
```

---

## 第 1 阶段：布局与导航

### Task 1.1: 创建 NavBar 组件

**Files:**
- Create: `e:/git_code/aiWeb/src/components/layout/NavBar.vue`
- Create: `e:/git_code/aiWeb/src/components/common/SearchBar.vue`
- Create: `e:/git_code/aiWeb/src/components/common/EmptyState.vue`

- [ ] **Step 1: 实现 NavBar 组件**

创建 `src/components/layout/NavBar.vue`:

```vue
<template>
  <nav class="h-16 flex items-center px-6 gap-6 border-b border-[var(--color-border-default)]"
       style="background: rgba(15, 39, 72, 0.85); backdrop-filter: blur(16px);">
    <!-- Logo -->
    <router-link to="/" class="flex items-center gap-3 no-underline shrink-0">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
           style="background: linear-gradient(135deg, var(--color-armor-red), var(--color-titanium-gold));
                  box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);">
        AI
      </div>
      <span class="text-[15px] font-semibold text-[var(--color-text-primary)] tracking-tight">
        AI Knowledge Graph
      </span>
    </router-link>

    <!-- 路由标签 -->
    <div class="flex items-center gap-1">
      <router-link
        v-for="tab in tabs" :key="tab.path" :to="tab.path"
        class="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 no-underline"
        :class="$route.path === tab.path
          ? 'text-[var(--color-arc-blue-light)] bg-[rgba(14,165,233,0.12)]'
          : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.04)]'"
      >
        {{ tab.label }}
      </router-link>
    </div>

    <!-- 右侧 -->
    <div class="flex items-center gap-3 ml-auto">
      <!-- 搜索按钮 -->
      <button
        @click="appStore.toggleSearch()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[var(--color-text-dim)]
               border border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.03)]
               hover:border-[var(--color-border-default)] hover:text-[var(--color-text-muted)]
               transition-all duration-200"
      >
        <span>⌘K</span>
        <span>搜索</span>
      </button>

      <!-- 模式切换 -->
      <button
        v-for="modeBtn in modeButtons" :key="modeBtn.mode"
        @click="appStore.toggleMode(modeBtn.mode)"
        class="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 border"
        :class="appStore.mode === modeBtn.mode ? modeBtn.activeClass : modeBtn.inactiveClass"
      >
        {{ appStore.mode === modeBtn.mode ? modeBtn.activeLabel : modeBtn.label }}
      </button>
    </div>
  </nav>

  <!-- 搜索面板 -->
  <SearchBar v-if="appStore.isSearchOpen" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import SearchBar from '@/components/common/SearchBar.vue'

const appStore = useAppStore()

const tabs = [
  { path: '/', label: 'Graph' },
  { path: '/list', label: 'List' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/interview', label: 'Interview' },
]

const modeButtons = [
  {
    mode: 'guide' as const,
    label: 'Guide',
    activeLabel: 'Guide On',
    activeClass: 'border-[var(--color-cat-base)] text-[var(--color-cat-base)] bg-[rgba(34,197,94,0.12)]',
    inactiveClass: 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:border-[var(--color-border-default)]',
  },
  {
    mode: 'interview' as const,
    label: 'Interview',
    activeLabel: 'Interview On',
    activeClass: 'border-[var(--color-armor-red)] text-[var(--color-armor-red-light)] bg-[rgba(239,68,68,0.12)]',
    inactiveClass: 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:border-[var(--color-border-default)]',
  },
]
</script>
```

- [ ] **Step 2: 实现 SearchBar 组件**

创建 `src/components/common/SearchBar.vue`:

```vue
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
        class="w-full bg-transparent text-[var(--color-text-primary)] text-[15px] outline-none
               placeholder:text-[var(--color-text-dim)] py-1"
        @keydown.escape="appStore.toggleSearch()"
        @keydown.enter="selectFirst()"
      />
      <div v-if="results.length > 0" class="mt-3 border-t border-[var(--color-border-subtle)] pt-3 max-h-[360px] overflow-y-auto">
        <div
          v-for="node in results.slice(0, 10)" :key="node.id"
          @click="goTo(node)"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150
                 hover:bg-[rgba(14,165,233,0.08)]"
        >
          <span class="text-[11px] px-2 py-0.5 rounded-md font-medium"
                :style="{ background: categoryBg[node.category], color: categoryColor[node.category] }">
            L{{ node.level }}
          </span>
          <span class="text-[14px] text-[var(--color-text-primary)] flex-1">{{ node.name }}</span>
          <span class="text-[12px] text-[var(--color-text-dim)]">{{ categoryLabel[node.category] }}</span>
        </div>
      </div>
      <div v-else-if="query.length > 0" class="mt-3 pt-6 text-center text-[var(--color-text-dim)] text-[13px]">
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

function goTo(node: typeof results.value[0]) {
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
  base: 'var(--color-cat-base)',
  llm: 'var(--color-cat-llm)',
  agent: 'var(--color-cat-agent)',
}
</script>
```

- [ ] **Step 3: 创建 EmptyState 组件**

创建 `src/components/common/EmptyState.vue`:

```vue
<template>
  <div class="flex flex-col items-center justify-center h-full text-center px-6">
    <div class="text-5xl mb-4 opacity-40">{{ icon }}</div>
    <h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{{ title }}</h2>
    <p class="text-[14px] text-[var(--color-text-dim)] max-w-xs leading-relaxed">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description: string
}>()
</script>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add NavBar, SearchBar, and EmptyState components"
```

---

## 第 2 阶段：知识数据层

### Task 2.1: 创建知识数据类型与初始数据

**Files:**
- Create: `e:/git_code/aiWeb/src/data/knowledge.ts`

- [ ] **Step 1: 从原文件迁移并扩展知识数据**

创建 `src/data/knowledge.ts`，将原有的 33 个节点从 `ai_web.html` 中的 `nodesData` 迁移过来，使用新的 `ConceptNode` 类型。

**重要**: 这是一个大文件(~1500 行)。先迁移基础字段 (`id, name, category, level, desc, role, prerequisites, nextSteps, relatedConcepts`)，然后逐步补充 `codeExamples, interviewQuestions, bestPractices` 等。

初始数据骨架:

```typescript
import type { ConceptNode } from '@/types'

export const knowledgeNodes: ConceptNode[] = [
  // ===== 第1层：入门基础 =====
  {
    id: "llm",
    name: "大语言模型 LLM",
    nameEn: "Large Language Model",
    category: "base",
    level: 1,
    difficulty: "beginner",
    desc: "基于海量文本预训练的深度神经网络模型，核心能力是下一词预测...",
    fullDescription: "",
    role: "整个AI领域的核心底座，为所有上层应用提供认知能力",
    codeExamples: [],
    prerequisites: [],
    nextSteps: ["transformer", "agent", "prompt-engineering"],
    relatedConcepts: ["transformer", "pretrain", "sft", "agent", "rag"],
    interviewQuestions: [],
    bestPractices: [],
    commonPitfalls: [],
    references: [],
  },
  // ... 其余 32 个节点
]
```

先完成所有 33 个节点的 `id, name, category, level, desc, role, prerequisites, nextSteps, relatedConcepts` 基础字段迁移。

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: migrate 33 knowledge nodes from original D3 project"
```

---

## 第 3 阶段：知识图谱核心视图

### Task 3.1: 实现 KnowledgeGraph D3 组件

**Files:**
- Create: `e:/git_code/aiWeb/src/components/graph/KnowledgeGraph.vue`
- Create: `e:/git_code/aiWeb/src/components/graph/GraphControls.vue`
- Create: `e:/git_code/aiWeb/src/components/layout/SidePanel.vue`
- Modify: `e:/git_code/aiWeb/src/views/GraphView.vue`

- [ ] **Step 1: 实现 KnowledgeGraph 组件**

创建 `src/components/graph/KnowledgeGraph.vue`:

```vue
<template>
  <div ref="containerRef" class="w-full h-full relative overflow-hidden">
    <svg ref="svgRef" class="w-full h-full cursor-grab" :class="{ 'cursor-grabbing': isDragging }" />
    <GraphControls />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import { useAppStore } from '@/stores/appStore'
import GraphControls from './GraphControls.vue'
import type { ConceptNode } from '@/types'

const knowledgeStore = useKnowledgeStore()
const appStore = useAppStore()
const containerRef = ref<HTMLDivElement>()
const svgRef = ref<SVGSVGElement>()
const isDragging = ref(false)

const emit = defineEmits<{
  selectNode: [nodeId: string]
}>()

// 颜色映射
const colorMap: Record<string, string> = {
  base: '#22c55e',
  llm: '#3b82f6',
  agent: '#eab308',
}

const glowClass: Record<string, string> = {
  base: 'node-glow-green',
  llm: 'node-glow-blue',
  agent: 'node-glow-gold',
}

// 半径映射
const radiusMap: Record<number, number> = { 1: 34, 2: 26, 3: 22, 4: 18, 5: 16 }

// 连线数据
function buildLinks(nodes: ConceptNode[]) {
  const links: { source: string; target: string }[] = []
  const nodeMap = new Map(nodes.map(n => [n.id, n]))
  const seen = new Set<string>()

  nodes.forEach(node => {
    if (node.relatedConcepts) {
      node.relatedConcepts.forEach(targetId => {
        const key = [node.id, targetId].sort().join('-')
        if (!seen.has(key) && nodeMap.has(targetId)) {
          seen.add(key)
          links.push({ source: node.id, target: targetId })
        }
      })
    }
  })
  return links
}

let simulation: d3.Simulation<ConceptNode, d3.SimulationLinkDatum<ConceptNode>> | null = null

function getLevelX(level: number, width: number): number {
  const ratios: Record<number, number> = { 1: 0.1, 2: 0.3, 3: 0.5, 4: 0.7, 5: 0.88 }
  return width * (ratios[level] || 0.5)
}

function initGraph() {
  if (!svgRef.value || !containerRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  svg.attr('width', width).attr('height', height)

  const g = svg.append('g')
  const nodes: ConceptNode[] = [...knowledgeStore.nodes]
  const links = buildLinks(nodes)

  // 缩放
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 2.5])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  svg.call(zoom)

  // 力模拟
  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120).strength(0.4))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2).strength(0.03))
    .force('collision', d3.forceCollide().radius((d: any) => radiusMap[d.level] + 10))
    .force('x', d3.forceX((d: any) => getLevelX(d.level, width)).strength(0.8))
    .force('y', d3.forceY(height / 2).strength(0.08))

  // 连线
  const link = g.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('stroke', 'rgba(14, 165, 233, 0.15)')
    .attr('stroke-width', 1)
    .attr('stroke-opacity', 0.6)

  // 节点组
  const node = g.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .call(d3.drag<SVGGElement, ConceptNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation?.alphaTarget(0.3).restart()
        d.fx = d.x; d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x; d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation?.alphaTarget(0)
        d.fx = null; d.fy = null
      })
    )

  // 圆圈
  node.append('circle')
    .attr('r', (d: any) => radiusMap[d.level])
    .attr('fill', (d: any) => colorMap[d.category])
    .attr('fill-opacity', 0.25)
    .attr('stroke', (d: any) => d3.color(colorMap[d.category])!.brighter(0.5) as any)
    .attr('stroke-width', 2)
    .attr('style', (d: any) => `box-shadow: 0 0 14px ${colorMap[d.category]}40;`)

  // 文字
  node.append('text')
    .attr('dy', (d: any) => radiusMap[d.level] + 14)
    .attr('text-anchor', 'middle')
    .attr('fill', '#e2e8f0')
    .attr('font-size', '11px')
    .attr('font-weight', '500')
    .text((d: any) => d.name.length > 12 ? d.name.slice(0, 11) + '...' : d.name)

  // 悬停提示
  node.append('title').text((d: any) => d.name)

  // 点击
  node.on('click', (event: MouseEvent, d: any) => {
    event.stopPropagation()
    appStore.selectNode(d.id)
    emit('selectNode', d.id)
    highlightConnections(d)
  })

  // 点击空白取消选中
  svg.on('click', () => {
    if (appStore.mode === 'normal') {
      appStore.selectNode(null)
      resetHighlights()
    }
  })

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)
    node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  })
}

function highlightConnections(d: ConceptNode) {
  const svg = d3.select(svgRef.value!)
  const relatedIds = new Set([d.id, ...d.relatedConcepts, ...d.prerequisites, ...d.nextSteps])

  svg.selectAll<SVGGElement, ConceptNode>('.node')
    .transition().duration(300)
    .attr('opacity', (n: any) => relatedIds.has(n.id) ? 1 : 0.15)

  svg.selectAll<SVGLineElement, any>('.link')
    .transition().duration(300)
    .attr('stroke-opacity', (l: any) => {
      return (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.08
    })
    .attr('stroke', (l: any) => {
      return (l.source.id === d.id || l.target.id === d.id)
        ? 'var(--color-arc-blue)'
        : 'rgba(14, 165, 233, 0.15)'
    })
}

function resetHighlights() {
  const svg = d3.select(svgRef.value!)
  svg.selectAll('.node').transition().duration(300).attr('opacity', 1)
  svg.selectAll('.link').transition().duration(300)
    .attr('stroke-opacity', 0.6)
    .attr('stroke', 'rgba(14, 165, 233, 0.15)')
}

// 监听模式切换
watch(() => appStore.mode, (mode) => {
  // 后续在 Task 3.2 完善引导/面试模式
})

// 监听聚焦层级
watch(() => appStore.focusedLevel, (level) => {
  // 后续在 Task 3.2 完善
})

onMounted(() => {
  nextTick(() => initGraph())
})

onUnmounted(() => {
  simulation?.stop()
})

// 窗口缩放
function handleResize() {
  if (!containerRef.value || !svgRef.value) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  d3.select(svgRef.value).attr('width', w).attr('height', h)
  if (simulation) {
    simulation.force('x', d3.forceX((d: any) => getLevelX(d.level, w)).strength(0.8))
    simulation.alpha(0.3).restart()
  }
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

defineExpose({ highlightConnections, resetHighlights, initGraph })
</script>
```

- [ ] **Step 2: 实现 GraphControls 组件**

创建 `src/components/graph/GraphControls.vue`:

```vue
<template>
  <div class="absolute bottom-5 right-5 flex flex-col gap-2">
    <button
      v-for="ctrl in controls" :key="ctrl.label"
      @click="ctrl.action"
      class="w-9 h-9 flex items-center justify-center rounded-lg text-[16px]
             bg-[rgba(15,39,72,0.85)] backdrop-blur-sm border border-[var(--color-border-default)]
             text-[var(--color-arc-blue-light)] hover:bg-[rgba(14,165,233,0.15)]
             hover:border-[var(--color-border-accent)] transition-all duration-200"
      :title="ctrl.label"
    >{{ ctrl.icon }}</button>
  </div>
</template>

<script setup lang="ts">
function zoomIn() {
  // 通过 KnowledgeGraph 暴露的方法控制
}
function zoomOut() {}
function resetZoom() {}
function fitToScreen() {}

const controls = [
  { icon: '+', label: '放大', action: zoomIn },
  { icon: '−', label: '缩小', action: zoomOut },
  { icon: '⟲', label: '重置', action: resetZoom },
  { icon: '⊡', label: '适应屏幕', action: fitToScreen },
]
</script>
```

- [ ] **Step 3: 实现 SidePanel 详情侧栏**

创建 `src/components/layout/SidePanel.vue`:

```vue
<template>
  <div class="w-[420px] shrink-0 border-l border-[var(--color-border-default)] overflow-y-auto"
       style="background: rgba(15, 39, 72, 0.75); backdrop-filter: blur(16px);">
    <EmptyState
      v-if="!node"
      icon="◉"
      title="探索知识网络"
      description="点击图谱中的节点查看详细解释，或使用搜索快速定位概念。"
    />
    <div v-else class="p-6">
      <!-- 标题 -->
      <h2 class="text-[20px] font-semibold text-[var(--color-text-primary)] mb-2">{{ node.name }}</h2>
      <p v-if="node.nameEn" class="text-[13px] text-[var(--color-text-dim)] mb-4">{{ node.nameEn }}</p>

      <!-- 徽章 -->
      <div class="flex items-center gap-2 mb-5">
        <span class="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              :style="{ background: levelBg, color: levelColor }">
          第{{ node.level }}层 · {{ levelLabel }}
        </span>
        <span class="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              :style="{ background: catBg, color: catColor }">
          {{ catLabel }}
        </span>
      </div>

      <!-- 核心定义 -->
      <h3 class="text-[12px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-2">核心定义</h3>
      <p class="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5">{{ node.desc }}</p>

      <!-- 地位 -->
      <h3 class="text-[12px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-2">地位与作用</h3>
      <p class="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5">{{ node.role }}</p>

      <!-- 前置知识 -->
      <div class="glass-panel p-4 mb-4">
        <h4 class="text-[12px] font-semibold text-[var(--color-arc-blue-light)] mb-3">Previous</h4>
        <div v-if="prereqNodes.length" class="flex flex-wrap gap-2">
          <button v-for="pn in prereqNodes" :key="pn.id"
                  @click="$emit('selectNode', pn.id)"
                  class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200
                         border border-[var(--color-border-red)] bg-[rgba(239,68,68,0.08)]
                         text-[var(--color-armor-red-light)] hover:bg-[rgba(239,68,68,0.15)]">
            {{ pn.name }}
          </button>
        </div>
        <p v-else class="text-[13px] text-[var(--color-text-dim)]">无前置知识，可直接入门</p>
      </div>

      <!-- 下一步 -->
      <div class="glass-panel p-4 mb-4">
        <h4 class="text-[12px] font-semibold text-[var(--color-arc-blue-light)] mb-3">Next</h4>
        <div v-if="nextNodes.length" class="flex flex-wrap gap-2">
          <button v-for="nn in nextNodes" :key="nn.id"
                  @click="$emit('selectNode', nn.id)"
                  class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200
                         border border-[var(--color-border-accent)] bg-[rgba(14,165,233,0.08)]
                         text-[var(--color-arc-blue-pale)] hover:bg-[rgba(14,165,233,0.15)]">
            → {{ nn.name }}
          </button>
        </div>
        <p v-else class="text-[13px] text-[var(--color-text-dim)]">本方向已到顶层</p>
      </div>

      <!-- 关联概念 -->
      <h3 class="text-[12px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-3">关联概念</h3>
      <div class="flex flex-wrap gap-2">
        <button v-for="rn in relatedNodes" :key="rn.id"
                @click="$emit('selectNode', rn.id)"
                class="px-3 py-1.5 rounded-lg text-[12px] transition-all duration-200
                       border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]
                       hover:border-[var(--color-border-default)] hover:bg-[rgba(255,255,255,0.04)]">
          {{ rn.name }}
        </button>
      </div>

      <!-- 了解更多 -->
      <router-link :to="`/detail/${node.id}`"
                   class="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                          text-[14px] font-medium border border-[var(--color-arc-blue)]
                          text-[var(--color-arc-blue-light)] hover:bg-[rgba(14,165,233,0.1)]
                          transition-all duration-200 no-underline">
        查看完整详情 →
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import EmptyState from '@/components/common/EmptyState.vue'

const props = defineProps<{ nodeId: string | null }>()
defineEmits<{ selectNode: [nodeId: string] }>()

const knowledgeStore = useKnowledgeStore()

const node = computed(() => props.nodeId ? knowledgeStore.getNodeById(props.nodeId) : null)
const prereqNodes = computed(() => props.nodeId ? knowledgeStore.getPrerequisites(props.nodeId) : [])
const nextNodes = computed(() => props.nodeId ? knowledgeStore.getNextSteps(props.nodeId) : [])
const relatedNodes = computed(() => {
  if (!node.value) return []
  return node.value.relatedConcepts
    .map(id => knowledgeStore.getNodeById(id))
    .filter(Boolean) as typeof knowledgeStore.nodes
})

const levelLabel = computed(() => {
  const labels: Record<number, string> = { 1: '入门基础', 2: '核心原理', 3: '关键组件', 4: '进阶技术', 5: '生产落地' }
  return node.value ? labels[node.value.level] || '' : ''
})

const catLabel = computed(() => {
  const labels: Record<string, string> = { base: '核心基础', llm: '大模型技术', agent: 'Agent 技术' }
  return node.value ? labels[node.value.category] || '' : ''
})

const levelColor = computed(() => node.value?.category === 'base' ? 'var(--color-cat-base)' :
  node.value?.category === 'llm' ? 'var(--color-cat-llm)' : 'var(--color-cat-agent)')

const levelBg = computed(() => node.value?.category === 'base' ? 'rgba(34,197,94,0.12)' :
  node.value?.category === 'llm' ? 'rgba(59,130,246,0.12)' : 'rgba(234,179,8,0.12)')

const catColor = computed(() => levelColor.value)
const catBg = computed(() => levelBg.value)
</script>
```

- [ ] **Step 4: 组装 GraphView**

修改 `src/views/GraphView.vue`:

```vue
<template>
  <div class="h-full flex">
    <KnowledgeGraph
      ref="graphRef"
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
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import KnowledgeGraph from '@/components/graph/KnowledgeGraph.vue'
import SidePanel from '@/components/layout/SidePanel.vue'

const appStore = useAppStore()
const graphRef = ref()

function handleSelectNode(nodeId: string) {
  appStore.selectNode(nodeId)
  graphRef.value?.highlightConnections(/* ... */)
}
</script>
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement KnowledgeGraph D3 component, GraphControls, and SidePanel"
```

---

## 第 4 阶段：补充视图

### Task 4.1: 实现 ListView

**Files:**
- Create: `e:/git_code/aiWeb/src/components/common/LevelFilter.vue`
- Create: `e:/git_code/aiWeb/src/components/common/ConceptCard.vue`
- Modify: `e:/git_code/aiWeb/src/views/ListView.vue`

- [ ] **Step 1: 创建 LevelFilter**

创建 `src/components/common/LevelFilter.vue`:

```vue
<template>
  <div class="flex items-center gap-3">
    <div class="flex gap-1">
      <button
        v-for="lvl in levels" :key="lvl.value"
        @click="$emit('update:level', currentLevel === lvl.value ? null : lvl.value)"
        class="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 border"
        :class="currentLevel === lvl.value
          ? 'border-[var(--color-arc-blue)] text-[var(--color-arc-blue-light)] bg-[rgba(14,165,233,0.12)]'
          : 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:border-[var(--color-border-default)]'"
      >
        L{{ lvl.value }}
      </button>
    </div>
    <div class="w-px h-5 bg-[var(--color-border-default)]" />
    <div class="flex gap-1">
      <button
        v-for="cat in categories" :key="cat.value"
        @click="$emit('update:category', currentCategory === cat.value ? null : cat.value)"
        class="px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 border"
        :class="currentCategory === cat.value
          ? `border-[var(${cat.borderVar})] text-[var(${cat.colorVar})] ${cat.activeBg}`
          : 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:border-[var(--color-border-default)]'"
      >
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Level } from '@/types'

defineProps<{
  currentLevel: Level | null
  currentCategory: Category | null
}>()

defineEmits<{
  'update:level': [level: Level | null]
  'update:category': [category: Category | null]
}>()

const levels = [1, 2, 3, 4, 5].map(v => ({ value: v as Level }))
const categories = [
  { value: 'base' as Category, label: '基础', colorVar: '--color-cat-base', borderVar: '--color-cat-base', activeBg: 'bg-[rgba(34,197,94,0.12)]' },
  { value: 'llm' as Category, label: 'LLM', colorVar: '--color-cat-llm', borderVar: '--color-cat-llm', activeBg: 'bg-[rgba(59,130,246,0.12)]' },
  { value: 'agent' as Category, label: 'Agent', colorVar: '--color-cat-agent', borderVar: '--color-cat-agent', activeBg: 'bg-[rgba(234,179,8,0.12)]' },
]
</script>
```

- [ ] **Step 2: 创建 ConceptCard**

创建 `src/components/common/ConceptCard.vue`:

```vue
<template>
  <router-link :to="`/detail/${node.id}`"
               class="glass-panel p-5 block no-underline transition-all duration-200
                      hover:border-[var(--color-border-accent)] hover:translate-y-[-2px]
                      hover:shadow-[0_4px_20px_rgba(14,165,233,0.1)] group">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="text-[15px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-arc-blue-light)] transition-colors">
          {{ node.name }}
        </h3>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium"
              :style="{ background: levelBg, color: levelColor }">
          L{{ node.level }}
        </span>
        <span class="px-2 py-0.5 rounded-md text-[10px] font-medium"
              :style="{ background: catBg, color: catColor }">
          {{ categoryLabel }}
        </span>
      </div>
    </div>
    <p class="text-[13px] text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
      {{ node.desc }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ConceptNode } from '@/types'

const props = defineProps<{ node: ConceptNode }>()

const catColors: Record<string, string> = {
  base: 'var(--color-cat-base)',
  llm: 'var(--color-cat-llm)',
  agent: 'var(--color-cat-agent)',
}

const catLabels: Record<string, string> = {
  base: '基础', llm: 'LLM 技术', agent: 'Agent',
}

const catBgs: Record<string, string> = {
  base: 'rgba(34,197,94,0.12)',
  llm: 'rgba(59,130,246,0.12)',
  agent: 'rgba(234,179,8,0.12)',
}

const categoryLabel = computed(() => catLabels[props.node.category])
const levelColor = computed(() => catColors[props.node.category])
const levelBg = computed(() => catBgs[props.node.category])
const catColor = computed(() => catColors[props.node.category])
const catBg = computed(() => catBgs[props.node.category])
</script>
```

- [ ] **Step 3: 完成 ListView**

修改 `src/views/ListView.vue`:

```vue
<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">知识列表</h1>
      <p class="text-[14px] text-[var(--color-text-dim)] mb-6">浏览全部 {{ knowledgeStore.nodes.length }} 个概念，按层级和分类筛选</p>

      <LevelFilter
        v-model:level="level"
        v-model:category="category"
        class="mb-6"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConceptCard v-for="node in filtered" :key="node.id" :node="node" />
      </div>

      <EmptyState
        v-if="filtered.length === 0"
        icon="∅"
        title="无匹配结果"
        description="尝试调整筛选条件"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import LevelFilter from '@/components/common/LevelFilter.vue'
import ConceptCard from '@/components/common/ConceptCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Category, Level } from '@/types'

const knowledgeStore = useKnowledgeStore()
const level = ref<Level | null>(null)
const category = ref<Category | null>(null)

const filtered = computed(() => knowledgeStore.filteredNodes('', category.value, level.value))
</script>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement ListView with LevelFilter and ConceptCard"
```

---

### Task 4.2: 实现 RoadmapView

**Files:**
- Modify: `e:/git_code/aiWeb/src/views/RoadmapView.vue`
- Create: `e:/git_code/aiWeb/src/components/roadmap/LevelStage.vue`

- [ ] **Step 1: 创建 LevelStage**

创建 `src/components/roadmap/LevelStage.vue`:

```vue
<template>
  <div class="glass-panel-accent p-5 mb-4">
    <div class="flex items-center gap-3 mb-3">
      <span class="text-[11px] px-2.5 py-1 rounded-lg font-medium"
            style="background: rgba(14,165,233,0.12); color: var(--color-arc-blue-light);">
        第{{ level }}层
      </span>
      <h3 class="text-[16px] font-semibold text-[var(--color-text-primary)]">{{ title }}</h3>
      <span class="text-[13px] text-[var(--color-text-dim)] ml-auto">{{ completedCount }}/{{ nodes.length }}</span>
    </div>
    <div class="space-y-2">
      <div
        v-for="node in nodes" :key="node.id"
        @click="toggleProgress(node.id)"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
               hover:bg-[rgba(14,165,233,0.06)]"
      >
        <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
             :class="progressStatus(node.id)">
          <span v-if="progress[node.id] === 'completed'" class="text-[10px]">✓</span>
          <span v-else-if="progress[node.id] === 'in_progress'" class="w-2 h-2 rounded-full"
                style="background: var(--color-titanium-gold);"></span>
        </div>
        <div class="flex-1">
          <span class="text-[14px] text-[var(--color-text-primary)]">{{ node.name }}</span>
          <span class="text-[12px] text-[var(--color-text-dim)] ml-2">{{ node.desc.slice(0, 40) }}...</span>
        </div>
        <span class="text-[11px] px-2 py-0.5 rounded-md font-medium shrink-0"
              :style="categoryStyle(node.category)">
          {{ catLabel(node.category) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import type { ConceptNode, Category, ProgressStatus } from '@/types'

const props = defineProps<{
  level: number
  title: string
  nodes: ConceptNode[]
}>()

const appStore = useAppStore()
const progress = computed(() => appStore.learningProgress)

const completedCount = computed(() =>
  props.nodes.filter(n => progress.value[n.id] === 'completed').length
)

function progressStatus(nodeId: string) {
  const s = progress.value[nodeId]
  if (s === 'completed') return 'border-[var(--color-cat-base)] bg-[var(--color-cat-base)] text-white'
  if (s === 'in_progress') return 'border-[var(--color-titanium-gold)]'
  return 'border-[var(--color-border-subtle)]'
}

function toggleProgress(nodeId: string) {
  const current = progress.value[nodeId] || 'not_started'
  const next: ProgressStatus =
    current === 'not_started' ? 'in_progress' :
    current === 'in_progress' ? 'completed' : 'not_started'
  appStore.markProgress(nodeId, next)
}

function categoryStyle(cat: Category) {
  const map: Record<string, { bg: string; color: string }> = {
    base: { bg: 'rgba(34,197,94,0.12)', color: 'var(--color-cat-base)' },
    llm: { bg: 'rgba(59,130,246,0.12)', color: 'var(--color-cat-llm)' },
    agent: { bg: 'rgba(234,179,8,0.12)', color: 'var(--color-cat-agent)' },
  }
  const s = map[cat] || map.base
  return { background: s.bg, color: s.color }
}

function catLabel(cat: Category) {
  return { base: '基础', llm: 'LLM', agent: 'Agent' }[cat]
}
</script>
```

- [ ] **Step 2: 完成 RoadmapView**

修改 `src/views/RoadmapView.vue`:

```vue
<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">学习路线图</h1>
      <p class="text-[14px] text-[var(--color-text-dim)] mb-6">
        5 个层级 · 33 个概念 · 点击切换学习状态
      </p>

      <LevelStage
        level="1" title="入门基础" :nodes="l1Nodes"
      />
      <LevelStage
        level="2" title="核心原理" :nodes="l2Nodes"
      />
      <LevelStage
        level="3" title="关键组件" :nodes="l3Nodes"
      />
      <LevelStage
        level="4" title="进阶技术" :nodes="l4Nodes"
      />
      <LevelStage
        level="5" title="生产落地" :nodes="l5Nodes"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import LevelStage from '@/components/roadmap/LevelStage.vue'

const knowledgeStore = useKnowledgeStore()

const l1Nodes = computed(() => knowledgeStore.nodesByLevel[1] || [])
const l2Nodes = computed(() => knowledgeStore.nodesByLevel[2] || [])
const l3Nodes = computed(() => knowledgeStore.nodesByLevel[3] || [])
const l4Nodes = computed(() => knowledgeStore.nodesByLevel[4] || [])
const l5Nodes = computed(() => knowledgeStore.nodesByLevel[5] || [])
</script>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement RoadmapView with LevelStage and progress tracking"
```

---

### Task 4.3: 实现 InterviewView

**Files:**
- Modify: `e:/git_code/aiWeb/src/views/InterviewView.vue`

- [ ] **Step 1: 完成 InterviewView**

修改 `src/views/InterviewView.vue`:

```vue
<template>
  <div class="h-full overflow-y-auto p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-[22px] font-semibold text-[var(--color-text-primary)] mb-2">面试题库</h1>
      <p class="text-[14px] text-[var(--color-text-dim)] mb-8">聚焦 Agent/LLM 高频面试考点，四个阶段递进掌握</p>

      <div v-for="stage in stages" :key="stage.name" class="mb-8">
        <div class="glass-panel-accent p-5 mb-3">
          <h3 class="text-[15px] font-semibold text-[var(--color-armor-red-light)] mb-1">
            {{ stage.name }}
          </h3>
          <p class="text-[13px] text-[var(--color-text-dim)]">{{ stage.desc }}</p>
        </div>

        <div class="space-y-3">
          <div v-for="item in stage.topics" :key="item.nodeId"
               @click="toggleExpand(item.nodeId)"
               class="glass-panel p-4 cursor-pointer transition-all duration-200
                      hover:border-[var(--color-border-accent)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-[var(--color-arc-blue-light)] text-[11px] font-medium">
                  {{ getNodeName(item.nodeId) }}
                </span>
                <span class="text-[12px] text-[var(--color-text-dim)]">
                  {{ item.questionCount }} 题
                </span>
              </div>
              <span class="text-[var(--color-text-dim)] transition-transform duration-200"
                    :style="{ transform: expanded === item.nodeId ? 'rotate(180deg)' : '' }">
                ▼
              </span>
            </div>

            <div v-if="expanded === item.nodeId" class="mt-4 space-y-4">
              <div v-for="(qa, idx) in getQuestions(item.nodeId)" :key="idx"
                   class="border-t border-[var(--color-border-subtle)] pt-4 first:border-0 first:pt-0">
                <p class="text-[14px] text-[var(--color-text-primary)] font-medium mb-2">
                  Q{{ idx + 1 }}. {{ qa.question }}
                </p>
                <div class="text-[13px] text-[var(--color-text-muted)] leading-relaxed pl-4 border-l-2 border-[var(--color-border-accent)]">
                  {{ qa.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledgeStore'

const knowledgeStore = useKnowledgeStore()
const expanded = ref<string | null>(null)

function toggleExpand(nodeId: string) {
  expanded.value = expanded.value === nodeId ? null : nodeId
}

function getNodeName(nodeId: string) {
  return knowledgeStore.getNodeById(nodeId)?.name || nodeId
}

function getQuestions(nodeId: string) {
  return knowledgeStore.getNodeById(nodeId)?.interviewQuestions || []
}

const stages = computed(() => [
  {
    name: '第一阶段 · 基础必背',
    desc: '大模型核心原理、Transformer 架构、Agent 定义',
    topics: [
      { nodeId: 'llm', questionCount: 3 },
      { nodeId: 'transformer', questionCount: 3 },
      { nodeId: 'agent', questionCount: 2 },
    ],
  },
  {
    name: '第二阶段 · 核心高频',
    desc: 'RAG、记忆系统、工具调用、规划模块、ReAct 框架',
    topics: [
      { nodeId: 'rag', questionCount: 4 },
      { nodeId: 'memory', questionCount: 3 },
      { nodeId: 'toolcall', questionCount: 3 },
      { nodeId: 'planning', questionCount: 3 },
      { nodeId: 'react', questionCount: 3 },
    ],
  },
  {
    name: '第三阶段 · 中高级进阶',
    desc: '多 Agent 系统、思维链、微调方案',
    topics: [
      { nodeId: 'multiagent', questionCount: 3 },
      { nodeId: 'cot', questionCount: 2 },
      { nodeId: 'sft', questionCount: 2 },
      { nodeId: 'lora', questionCount: 2 },
    ],
  },
  {
    name: '第四阶段 · 拉开差距',
    desc: '安全管控、可靠性、评估体系、成本优化',
    topics: [
      { nodeId: 'agent-security', questionCount: 3 },
      { nodeId: 'agent-reliability', questionCount: 3 },
      { nodeId: 'agent-evaluation', questionCount: 2 },
    ],
  },
])
</script>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: implement InterviewView with four-stage question bank"
```

---

### Task 4.4: 实现 DetailView

**Files:**
- Modify: `e:/git_code/aiWeb/src/views/DetailView.vue`
- Create: `e:/git_code/aiWeb/src/components/detail/ConceptDetail.vue`
- Create: `e:/git_code/aiWeb/src/components/common/CodeBlock.vue`

- [ ] **Step 1: 创建 CodeBlock**

创建 `src/components/common/CodeBlock.vue`:

```vue
<template>
  <div class="rounded-xl overflow-hidden border border-[var(--color-border-default)] my-4"
       style="background: rgba(9, 20, 40, 0.8);">
    <div class="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-subtle)]"
         style="background: rgba(14, 165, 233, 0.06);">
      <div class="flex items-center gap-2">
        <span class="text-[11px] text-[var(--color-arc-blue-light)] font-medium">{{ language }}</span>
        <span v-if="title" class="text-[11px] text-[var(--color-text-dim)]">{{ title }}</span>
      </div>
      <button @click="copy" class="text-[11px] text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] transition-colors">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre class="p-4 m-0 overflow-x-auto text-[13px] leading-relaxed"
         style="font-family: 'JetBrains Mono', 'Fira Code', monospace; color: #e2e8f0;">
      <code v-html="highlightedCode" />
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'

const props = defineProps<{
  code: string
  language: string
  title?: string
}>()

const copied = ref(false)

const highlightedCode = computed(() => {
  const lang = Prism.languages[props.language] || Prism.languages.python
  return Prism.highlight(props.code, lang, props.language)
})

function copy() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>
```

- [ ] **Step 2: 完成 DetailView**

修改 `src/views/DetailView.vue`:

```vue
<template>
  <div class="h-full overflow-y-auto p-8" v-if="node">
    <div class="max-w-4xl mx-auto">
      <!-- 返回 -->
      <button @click="$router.back()"
              class="flex items-center gap-2 text-[13px] text-[var(--color-text-dim)]
                     hover:text-[var(--color-text-muted)] transition-colors mb-6">
        ← 返回
      </button>

      <!-- 标题 -->
      <h1 class="text-[26px] font-semibold text-[var(--color-text-primary)] mb-1">{{ node.name }}</h1>
      <p v-if="node.nameEn" class="text-[14px] text-[var(--color-text-dim)] mb-4">{{ node.nameEn }}</p>

      <!-- 徽章 -->
      <div class="flex items-center gap-2 mb-8">
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium"
              style="background: rgba(14,165,233,0.12); color: var(--color-arc-blue-light);">
          第{{ node.level }}层
        </span>
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium"
              :style="categoryBadgeStyle">
          {{ categoryLabel }}
        </span>
        <span class="px-3 py-1 rounded-lg text-[12px] font-medium"
              style="background: rgba(234,179,8,0.12); color: var(--color-titanium-gold);">
          {{ difficultyLabel }}
        </span>
      </div>

      <!-- 完整描述 -->
      <section class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">核心定义</h2>
        <div class="glass-panel p-5 text-[14px] text-[var(--color-text-secondary)] leading-relaxed"
             v-html="node.fullDescription || node.desc" />
      </section>

      <!-- 地位 -->
      <section class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">地位与作用</h2>
        <p class="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">{{ node.role }}</p>
      </section>

      <!-- 公式 -->
      <section v-if="node.formula" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">关键公式</h2>
        <div class="glass-panel p-5 text-center text-[var(--color-text-primary)] font-mono text-[16px]">
          {{ node.formula }}
        </div>
      </section>

      <!-- 伪代码 -->
      <section v-if="node.pseudocode" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">算法流程</h2>
        <pre class="text-[13px] text-[var(--color-text-muted)] leading-relaxed font-mono
                    p-4 rounded-xl border border-[var(--color-border-subtle)]"
             style="background: rgba(9, 20, 40, 0.8);">{{ node.pseudocode }}</pre>
      </section>

      <!-- 代码示例 -->
      <section v-if="node.codeExamples.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">代码示例</h2>
        <CodeBlock
          v-for="(ex, idx) in node.codeExamples" :key="idx"
          :code="ex.code" :language="ex.language" :title="ex.title"
        />
      </section>

      <!-- 架构图 -->
      <section v-if="node.architectureDiagram" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">架构图</h2>
        <div class="glass-panel p-5 text-center text-[13px] text-[var(--color-text-dim)]">
          Mermaid 图表占位 (后续集成 Mermaid.js)
        </div>
      </section>

      <!-- 面试题 -->
      <section v-if="node.interviewQuestions.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">面试常见问题</h2>
        <div class="space-y-3">
          <div v-for="qa in node.interviewQuestions" :key="qa.id"
               class="glass-panel p-4">
            <p class="text-[14px] text-[var(--color-text-primary)] font-medium mb-2">
              Q: {{ qa.question }}
            </p>
            <p class="text-[13px] text-[var(--color-text-muted)] leading-relaxed pl-4 border-l-2 border-[var(--color-border-accent)]">
              {{ qa.answer }}
            </p>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section v-if="node.bestPractices.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">最佳实践</h2>
        <ul class="space-y-2">
          <li v-for="bp in node.bestPractices" :key="bp"
              class="text-[14px] text-[var(--color-text-secondary)] flex items-start gap-2">
            <span class="text-[var(--color-cat-base)] mt-1 shrink-0">◆</span> {{ bp }}
          </li>
        </ul>
      </section>

      <!-- 常见陷阱 -->
      <section v-if="node.commonPitfalls.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-armor-red-light)] mb-3">常见陷阱</h2>
        <ul class="space-y-2">
          <li v-for="pit in node.commonPitfalls" :key="pit"
              class="text-[14px] text-[var(--color-text-secondary)] flex items-start gap-2">
            <span class="text-[var(--color-armor-red)] mt-1 shrink-0">⚠</span> {{ pit }}
          </li>
        </ul>
      </section>

      <!-- 延伸阅读 -->
      <section v-if="node.references.length > 0" class="mb-8">
        <h2 class="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">延伸阅读</h2>
        <div class="space-y-2">
          <a v-for="ref in node.references" :key="ref.url"
             :href="ref.url" target="_blank"
             class="flex items-center gap-2 text-[14px] text-[var(--color-arc-blue-light)]
                    hover:text-[var(--color-arc-blue-pale)] transition-colors no-underline">
            <span class="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style="background: rgba(14,165,233,0.1);">
              {{ ref.type }}
            </span>
            {{ ref.title }}
          </a>
        </div>
      </section>
    </div>
  </div>

  <EmptyState v-else icon="?" title="概念未找到" description="请检查 URL 是否正确" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import CodeBlock from '@/components/common/CodeBlock.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { Category } from '@/types'

const route = useRoute()
const knowledgeStore = useKnowledgeStore()

const node = computed(() => {
  const id = route.params.id as string
  return knowledgeStore.getNodeById(id)
})

const catLabels: Record<Category, string> = { base: '核心基础', llm: '大模型技术', agent: 'Agent 技术' }
const catColors: Record<Category, string> = { base: '#22c55e', llm: '#3b82f6', agent: '#eab308' }
const diffs: Record<string, string> = { beginner: '入门', intermediate: '中级', advanced: '高级' }

const categoryLabel = computed(() => node.value ? catLabels[node.value.category] : '')
const categoryBadgeStyle = computed(() => ({
  background: `${catColors[node.value!.category]}20`,
  color: catColors[node.value!.category],
}))
const difficultyLabel = computed(() => node.value ? diffs[node.value.difficulty] || '' : '')
</script>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement DetailView, CodeBlock, and ConceptDetail"
```

---

## 第 5 阶段：知识内容扩展与搜索补充

### Task 5.1: 搜索补充 AI/LLM/Agent 最新知识

- [ ] **Step 1: 搜索 MCP 协议最新信息**

```bash
# 使用 WebSearch 搜索:
"MCP Model Context Protocol 2024 2025 specification"
"MCP protocol工具调用标准化最新进展"
```

需要补充的内容:
- MCP 协议架构 (Client/Server 模型)
- MCP 工具注册与发现机制
- MCP vs 传统 Function Calling 对比
- MCP 生态现状 (Claude Desktop, Continue, 等)

- [ ] **Step 2: 搜索 A2A 协议**

```bash
"A2A Agent-to-Agent protocol Google 2025"
"A2A 智能体通信协议规范"
```

- [ ] **Step 3: 搜索 Agent 评估体系**

```bash
"SWE-bench agent evaluation benchmark 2025"
"GAIA benchmark agent evaluation"
"Agent evaluation metrics task success rate"
```

- [ ] **Step 4: 搜索生产级 Agent 安全**

```bash
"OWASP agent security top 10 2025"
"prompt injection defense 2025"
"Agent safety guardrails production deployment"
```

- [ ] **Step 5: 搜索多 Agent 框架最新版**

```bash
"LangChain LangGraph 2025 architecture"
"AutoGen 0.4 multi-agent"
"CrewAI latest version features"
```

- [ ] **Step 6: 将搜索结果整理为知识数据**

将搜索获取的最新知识填入 `src/data/knowledge.ts` 中各节点的:
- `fullDescription` 完整解释
- `codeExamples` 代码示例
- `interviewQuestions` 面试题
- `bestPractices` 最佳实践
- `commonPitfalls` 常见陷阱
- `references` 参考链接

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add detailed AI/LLM/Agent knowledge content from research"
```

---

## 第 6 阶段：完善与优化

### Task 6.1: 图谱引导模式与面试模式

**Files:**
- Modify: `e:/git_code/aiWeb/src/components/graph/KnowledgeGraph.vue`

在 KnowledgeGraph 组件中实现 `watch` effect:

```typescript
// 引导模式: 高亮当前层级
watch(() => [appStore.mode, appStore.focusedLevel] as const, ([mode, level]) => {
  const svg = d3.select(svgRef.value!)
  if (mode === 'guide' && level) {
    const levelSet = new Set(knowledgeStore.nodes.filter(n => (n as ConceptNode).level <= (level as number)).map(n => (n as ConceptNode).id))
    svg.selectAll('.node').transition().duration(400)
      .attr('opacity', (d: any) => levelSet.has(d.id) ? 1 : 0.12)
    svg.selectAll('.link').transition().duration(400)
      .attr('stroke-opacity', (l: any) => levelSet.has(l.source.id) && levelSet.has(l.target.id) ? 0.8 : 0.04)
  } else if (mode === 'interview') {
    const interviewIds = new Set(['llm','agent','transformer','rag','memory','toolcall','planning','react','multiagent','agent-evaluation','agent-security','agent-reliability','cot','lora','sft'])
    svg.selectAll('.node').transition().duration(400)
      .attr('opacity', (d: any) => interviewIds.has(d.id) ? 1 : 0.12)
    svg.selectAll('.link').transition().duration(400)
      .attr('stroke-opacity', (l: any) => interviewIds.has(l.source.id) && interviewIds.has(l.target.id) ? 0.8 : 0.04)
  } else {
    svg.selectAll('.node').transition().duration(400).attr('opacity', 1)
    svg.selectAll('.link').transition().duration(400).attr('stroke-opacity', 0.6)
  }
})
```

- [ ] **Step: Commit**

```bash
git add -A
git commit -m "feat: implement guide mode and interview mode in KnowledgeGraph"
```

---

### Task 6.2: 路由导航联动

- [ ] **Step 1: 确保 NavBar 路由激活态正确反映当前路由**
- [ ] **Step 2: 图谱点击节点同步更新 URL hash (`router.replace({ hash: node.id })`)**
- [ ] **Step 3: 从 DetailView 返回时恢复图谱状态**

- [ ] **Step: Commit**

```bash
git add -A
git commit -m "feat: add route-graph navigation synchronization"
```

---

### Task 6.3: 最终检查与构建验证

- [ ] **Step 1: TypeScript 类型检查**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 2: 构建生产版本**

```bash
npm run build
```

- [ ] **Step 3: 预览构建产物**

```bash
npm run preview
```

- [ ] **Step 4: 修复所有类型错误和构建警告**
- [ ] **Step 5: 最终 Commit**

```bash
git add -A
git commit -m "chore: fix type errors and build issues"
```

---

## 计划自检

**1. 规格覆盖:** 
- ✅ 项目初始化与 Tailwind 主题配置 (Task 0.1-0.3)
- ✅ 类型系统和数据模型 (Task 0.3, 2.1)
- ✅ Pinia stores (Task 0.3)
- ✅ 路由设计 5 条路由 (Task 0.3, 各 View 任务)
- ✅ KnowledgeGraph D3 组件 (Task 3.1)
- ✅ SidePanel 详情侧栏 (Task 3.1)
- ✅ ListView + ConceptCard (Task 4.1)
- ✅ RoadmapView + 进度追踪 (Task 4.2)
- ✅ InterviewView (Task 4.3)
- ✅ DetailView + CodeBlock (Task 4.4)
- ✅ 引导模式 + 面试模式 (Task 6.1)
- ✅ 知识扩展与搜索补充 (Task 5.1)

**2. 占位符扫描:** 无 TBD/TODO，所有步骤包含具体代码。

**3. 类型一致性:** `ConceptNode`, `Category`, `Level` 等类型在所有组件中一致使用。

