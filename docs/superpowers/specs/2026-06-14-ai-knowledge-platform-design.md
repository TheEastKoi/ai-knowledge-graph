# AI/LLM/Agent 知识学习平台 — 设计规格

**日期**: 2026-06-14
**状态**: 已确认
**版本**: 1.0

## 1. 项目概述

将现有的单文件 D3.js 知识图谱 (`ai_web.html`) 拆解重构为 Vue 3 组件化的 AI 知识学习平台。保留原有的 5 层知识体系和交互式图谱，增加多视图浏览、代码示例、深度知识内容和面试题库。

### 1.1 设计定位

**设计解读**: 面向开发者的 AI/LLM/Agent 交互式知识学习平台，科技学术风格，强调内容深度和代码实践。

- 调性: 钢铁侠全息科技风 (Iron Man Holographic Tech)
  - 金红装甲强调 × 亮蓝全息底 × 毛玻璃面板 × 节点光晕
- 背景底: 亮蓝全息 (`#0f2748`) — 通透的科技蓝底色
- 面板: 半透明毛玻璃 (`rgba(18,38,72,0.55)` + `backdrop-blur(12px)`)
- 面板边框: `rgba(14,165,233,0.15)` + 顶部渐变光线
- 主强调色: 装甲红 Crimson (`#ef4444` / `#f87171`) — 标题、选中态、核心强调
- 次强调色: 钛金 Gold (`#eab308` / `#facc15`) — Agent 分类、等级标记、点缀
- 数据蓝光: 电弧蓝 Arc Blue (`#0ea5e9` / `#22d3ee` / `#7dd3fc`) — 数据高亮、链接光效、代码
- 节点光晕: 各分类色强光晕效果 (`box-shadow: 0 0 14px`)
- 分类色: 基础绿 `#22c55e` / LLM 蓝 `#3b82f6` / Agent 金 `#eab308`
- 文字: 浅灰白 (`#f1f5f9` / `#e2e8f0` / `#94a3b8`)

### 1.2 Taste-Skill Dial 设置

- `DESIGN_VARIANCE: 6` — 微不对称，图谱为主 + 侧栏
- `MOTION_INTENSITY: 4` — 克制动效，节点过渡 + 滚动揭示
- `VISUAL_DENSITY: 5` — 知识学习平台的中等信息密度

## 2. 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Vue 3 (Composition API) | `<script setup>` + TypeScript |
| 构建 | Vite 5 | HMR 极速开发 |
| 路由 | Vue Router 4 | 5 条路由 |
| 状态 | Pinia | `knowledgeStore` + `appStore` |
| 样式 | Tailwind CSS v4 | 暗色主题 + Cyan 主色 |
| 可视化 | D3.js v7 | 知识图谱力导向图 |
| 代码高亮 | Prism.js | 语法高亮 + 复制 |
| 图表 | Mermaid.js | 概念架构图渲染 |
| 动效 | Motion (optional) | 微交互动效 |
| 图标 | Phosphor Icons | 一致图标语言 |

## 3. 项目结构

```
aiWeb/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tailwind.config.ts
  src/
    main.ts
    App.vue
    router/
      index.ts
    stores/
      knowledgeStore.ts
      appStore.ts
    data/
      knowledge.ts          # 33+ 概念节点数据
      interview.ts          # 面试题库
      types.ts              # 共享类型
    views/
      GraphView.vue         # 图谱主视图 (/)
      ListView.vue          # 列表浏览 (/list)
      RoadmapView.vue       # 学习路线图 (/roadmap)
      InterviewView.vue     # 面试题库 (/interview)
      DetailView.vue        # 知识点详情 (/detail/:id)
    components/
      layout/
        AppLayout.vue       # 全局布局壳
        NavBar.vue          # 顶部导航
        SidePanel.vue       # 详情侧栏
      graph/
        KnowledgeGraph.vue  # D3 图谱封装
        GraphControls.vue   # 缩放/层级控制
      common/
        ConceptCard.vue     # 知识卡片
        CodeBlock.vue       # 代码展示块
        SearchBar.vue       # 全局搜索 (Cmd+K)
        LevelFilter.vue     # 层级筛选器
        EmptyState.vue      # 空状态
      detail/
        ConceptDetail.vue   # 概念详情
        RelatedConcepts.vue # 关联概念
        InterviewQA.vue     # 面试问答
      roadmap/
        LevelStage.vue      # 层级阶段卡片
        ProgressBar.vue     # 学习进度条
    composables/
      useKnowledge.ts       # 知识数据查询
      useSearch.ts          # 搜索逻辑
      useProgress.ts        # 学习进度 localStorage
    utils/
      d3-graph.ts           # D3 图初始化与更新
      find-path.ts          # 学习路径计算
    types/
      index.ts              # 类型定义
```

## 4. 路由设计

| 路由 | 组件 | 描述 |
|------|------|------|
| `/` | GraphView | 默认视图，D3 交互式知识图谱 + 侧栏详情 |
| `/list` | ListView | 卡片/列表混合浏览，支持层级和分类过滤 |
| `/roadmap` | RoadmapView | 5 层学习路线图，追踪学习进度 |
| `/interview` | InterviewView | 面试题库，四阶段分类，含参考答案 |
| `/detail/:id` | DetailView | 独立详情页：完整解释 + 代码 + 公式 + 图表 |

路由间通过 NavBar 切换。图谱视图中点击节点 → 侧栏弹详情；点击"了解更多" → 跳转 `/detail/:id`。

## 5. 组件设计

### 5.1 布局组件

**AppLayout** — 全局壳组件
- 提供统一的暗色背景和网格纹理
- 包含 NavBar + RouterView
- 响应式：移动端隐藏侧栏

**NavBar** — 顶部导航
- Logo + 标题 "AI Knowledge Graph"
- 5 个路由标签 (Graph / List / Roadmap / Interview)
- 搜索入口 (Cmd+K 呼出)
- 模式切换: 正常 / 引导 / 面试

### 5.2 图谱组件

**KnowledgeGraph** — 核心 D3 组件
- 基于 D3.js v7 力导向图
- 5 层水平分层布局 (forceX)
- 节点按层级和分类着色
- 交互: 拖拽 / 缩放 / 点击高亮 / 悬停提示
- 模式: 正常 (自由探索) / 引导 (层级递进) / 面试 (仅高亮考点)
- 响应式: 窗口 resize 重新计算布局
- 通过 props 接收数据，emit 事件通知父组件

**GraphControls** — 图谱控制
- 缩放按钮 (+, -, 重置)
- 层级筛选切换
- 分类图例

### 5.3 通用组件

**ConceptCard** — 知识卡片
- Props: concept 对象
- 展示: 层级徽章、分类标签、名称、简述
- 点击跳转详情

**CodeBlock** — 代码块
- Props: code (字符串), language (默认 python)
- Prism.js 语法高亮
- 复制按钮
- 语言标签

**SearchBar** — 全局搜索
- Cmd+K 快捷键触发
- 命令面板式 UI
- 模糊搜索概念名称和描述
- 选择后跳转对应视图

**LevelFilter** — 层级过滤
- 5 层 Tab 切换
- 分类多选 (基础/LLM/Agent)

### 5.4 详情组件

**ConceptDetail** — 概念完整详情
- 层级徽章 + 分类标签
- 核心定义 (500-800 字)
- 地位与作用
- 前置知识标签 (可点击)
- 下一步学习标签 (可点击)
- 代码示例 (CodeBlock)
- 面试题 (InterviewQA)
- 延伸阅读链接

**RelatedConcepts** — 关联概念
- 网状标签展示
- 点击跳转

**InterviewQA** — 面试问答
- 题目 + 展开/折叠答案
- 难度标签

## 6. 数据模型

### 6.1 概念节点

```typescript
type Category = 'base' | 'llm' | 'agent'
type Level = 1 | 2 | 3 | 4 | 5
type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface ConceptNode {
  id: string
  name: string
  category: Category
  level: Level
  difficulty: Difficulty
  
  // 核心内容
  desc: string                    // 简短定义 (用于卡片)
  fullDescription: string         // 完整解释 (500-800 字，Markdown)
  role: string                    // 地位与作用
  formula?: string                // 关键公式 (LaTeX)
  pseudocode?: string             // 算法伪代码
  
  // 代码示例
  codeExamples: CodeExample[]
  
  // 关系
  prerequisites: string[]         // 前置知识 ID
  nextSteps: string[]             // 下一步知识 ID
  relatedConcepts: string[]       // 关联概念 ID
  
  // Mermaid 图表
  architectureDiagram?: string    // 架构图 (Mermaid DSL)
  flowDiagram?: string            // 流程图 (Mermaid DSL)
  
  // 面试
  interviewQuestions: InterviewQuestion[]
  
  // 参考
  bestPractices: string[]         // 最佳实践
  commonPitfalls: string[]        // 常见陷阱
  references: Reference[]         // 延伸阅读
  
  // 展示
  icon?: string                   // 图标名 (Phosphor)
}

interface CodeExample {
  language: string                // python | javascript | typescript | bash
  title: string                   // 代码示例标题
  code: string                    // 源代码
  description?: string            // 代码说明
}

interface InterviewQuestion {
  id: string
  question: string                // 问题
  answer: string                  // 参考答案 (Markdown)
  difficulty: Difficulty
  tags: string[]
}

interface Reference {
  title: string
  url: string
  type: 'paper' | 'docs' | 'blog' | 'github' | 'video'
}
```

### 6.2 应用状态

```typescript
// appStore
interface AppState {
  mode: 'normal' | 'guide' | 'interview'
  selectedNodeId: string | null
  searchQuery: string
  learningProgress: Record<string, ProgressStatus>
}

type ProgressStatus = 'not_started' | 'in_progress' | 'completed'
```

## 7. 数据流

```
knowledgeStore (全局知识数据)
  │
  ├─→ GraphView ─→ KnowledgeGraph (全部节点 + 连线)
  │                  └─→ SidePanel (选中节点详情)
  │
  ├─→ ListView ─→ LevelFilter + ConceptCard[] (过滤后)
  │
  ├─→ RoadmapView ─→ ProgressBar + LevelStage[] (合并进度)
  │
  ├─→ InterviewView ─→ InterviewQA[] (按阶段/难度)
  │
  └─→ DetailView ─→ ConceptDetail (单节点完整数据)

appStore (应用状态)
  ├─→ mode ─→ KnowledgeGraph (切换高亮模式)
  ├─→ selectedNodeId ─→ SidePanel / DetailView
  ├─→ learningProgress ─→ RoadmapView (localStorage 持久化)
  └─→ searchQuery ─→ SearchBar + ListView
```

## 8. 知识内容扩展

### 8.1 扩展范围

现有 33 个概念节点，每个扩展为完整学习资料：

| 内容项 | 状态 | 扩展说明 |
|--------|------|--------|
| 核心定义 | 已有 | 扩展至 500-800 字 |
| 完整解释 | 新增 | Markdown 格式，含类比和案例 |
| 数学公式 | 新增 | LaTeX 格式 (如 Attention 的 QKV 公式) |
| 伪代码 | 新增 | 算法流程 (如 ReAct 循环) |
| 代码示例 | 新增 | Python/JS，1-3 段/概念 |
| 架构图 | 新增 | Mermaid 流程图/时序图 |
| 面试题 | 扩展 | 每个概念 2-4 题 + 答案 |
| 最佳实践 | 新增 | 生产环境经验 |
| 延伸阅读 | 新增 | 论文/文档/博客链接 |

### 8.2 需要搜索补充的知识

以下领域需要搜索最新资料进行补充：

1. MCP 协议最新规范和实践
2. A2A 智能体通信协议细节
3. AutoGen / CrewAI 最新版本 API
4. LangChain 最新架构变化
5. DPO vs RLHF 最新研究对比
6. Agent 评估体系 (如 SWE-bench, GAIA)
7. 生产级 Agent 安全最佳实践
8. 模型量化最新方案 (GPTQ, AWQ, GGUF)
9. 多 Agent 编排最新模式

## 9. 性能目标

- LCP < 2.0s (D3 图初始渲染)
- 节点交互响应 < 100ms
- 搜索响应 < 50ms (本地模糊搜索)
- 代码分割: 路由级懒加载
- D3 图缩放/拖拽 60fps
- Mermaid 图表异步渲染

## 10. 非功能需求

- **暗色模式**: 默认暗色，不提供亮色切换 (保持科技学术感)
- **响应式**: 桌面优先，移动端部分视图降级 (图谱改为列表)
- **可访问性**: WCAG AA 对比度，键盘导航支持
- **持久化**: 学习进度存 localStorage
- **SEO**: 静态预渲染关键概念页面 (后续迭代)
