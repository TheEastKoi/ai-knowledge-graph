# AI Knowledge Graph

交互式 AI/LLM/Agent 知识学习平台 —— D3.js 力导向图可视化知识网络，支持一键引导遍历、Markdown 详解、数学公式渲染和面试题库。

## 功能

- **交互式知识图谱** — D3.js 力导向图，5 层递进结构，36 个概念节点
- **一键引导模式** — 按 `→` 键遍历全部知识网络，自动居中定位
- **多视图浏览** — Graph / List / Roadmap / Interview / Detail
- **详细知识内容** — 每个概念 300-500 字中文详解 + 代码示例 + 参考链接
- **Markdown + LaTeX 渲染** — 支持 Markdown 排版和 KaTeX 数学公式
- **学习进度追踪** — Roadmap 视图支持三态切换，localStorage 持久化
- **面试题库** — 4 阶段递进式 Agent/LLM 面试考点
- **全局搜索** — Cmd+K 命令面板，模糊搜索 36 个概念
- **钢铁侠全息科技风** — 亮蓝底色 + 装甲红 + 钛金 + 电弧蓝，毛玻璃面板 + 节点光晕

## 技术栈

- Vue 3 (Composition API) + TypeScript
- Vite 5 构建
- Pinia 状态管理 + Vue Router 4
- D3.js v7 力导向图
- Tailwind CSS v4 主题系统
- Marked (Markdown) + KaTeX (数学公式)
- Prism.js 代码高亮

## 快速开始

```bash
npm install
npm run dev
```

## 使用方式

1. 打开后默认显示知识图谱，点击任意节点查看详情
2. 点击导航栏 **`▶ 一键引导`** 开始遍历学习
3. 按 **`→`** 下一个概念，**`←`** 上一个，**`Esc`** 退出引导
4. 切换到 **List** 视图按层级/分类筛选浏览
5. 切换到 **Roadmap** 视图追踪学习进度
6. 切换到 **Interview** 视图查看面试题库
7. 按 **`Cmd+K`** 全局搜索任意概念

## 项目结构

```
src/
├── types/index.ts          # TypeScript 类型定义
├── data/knowledge.ts       # 36 个概念节点数据
├── stores/
│   ├── knowledgeStore.ts   # 知识数据仓库
│   └── appStore.ts         # 应用状态 + 引导遍历
├── router/index.ts         # 5 条懒加载路由
├── views/                  # 5 个视图页面
├── components/
│   ├── graph/              # D3.js 图谱组件
│   ├── layout/             # 布局组件 (NavBar, SidePanel)
│   └── common/             # 通用组件 (GuideTourBar, SearchBar, CodeBlock...)
└── styles/main.css         # 钢铁侠全息主题
```
