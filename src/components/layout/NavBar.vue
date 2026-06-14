<template>
  <nav class="h-16 flex items-center px-6 gap-6 border-b"
       style="background: rgba(15, 39, 72, 0.85); backdrop-filter: blur(16px); border-color: var(--color-border-default);">
    <!-- Logo -->
    <router-link to="/" class="flex items-center gap-3 no-underline shrink-0">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
           style="background: linear-gradient(135deg, var(--color-armor-red), var(--color-titanium-gold));
                  box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);">
        AI
      </div>
      <span class="text-[15px] font-semibold tracking-tight" style="color: var(--color-text-primary);">
        AI Knowledge Graph
      </span>
    </router-link>

    <!-- Route tabs -->
    <div class="flex items-center gap-1">
      <router-link
        v-for="tab in tabs" :key="tab.path" :to="tab.path"
        class="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 no-underline"
        :style="$route.path === tab.path
          ? 'color: var(--color-arc-blue-light); background: rgba(14,165,233,0.12);'
          : 'color: var(--color-text-dim);'"
      >
        {{ tab.label }}
      </router-link>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-3 ml-auto">
      <!-- Search button -->
      <button
        @click="appStore.toggleSearch()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] border transition-all duration-200"
        style="color: var(--color-text-dim); border-color: var(--color-border-subtle); background: rgba(255,255,255,0.03);"
      >
        <span>⌘K</span>
        <span>搜索</span>
      </button>

      <!-- Mode toggle buttons -->
      <button
        v-for="modeBtn in modeButtons" :key="modeBtn.mode"
        @click="appStore.toggleMode(modeBtn.mode)"
        class="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 border"
        :style="appStore.mode === modeBtn.mode ? modeBtn.activeStyle : modeBtn.inactiveStyle"
      >
        {{ appStore.mode === modeBtn.mode ? modeBtn.activeLabel : modeBtn.label }}
      </button>
    </div>
  </nav>

  <!-- Search panel overlay -->
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
    activeStyle: 'border-color: var(--color-cat-base); color: var(--color-cat-base); background: rgba(34,197,94,0.12);',
    inactiveStyle: 'border-color: var(--color-border-subtle); color: var(--color-text-dim);',
  },
  {
    mode: 'interview' as const,
    label: 'Interview',
    activeLabel: 'Interview On',
    activeStyle: 'border-color: var(--color-armor-red); color: var(--color-armor-red-light); background: rgba(239,68,68,0.12);',
    inactiveStyle: 'border-color: var(--color-border-subtle); color: var(--color-text-dim);',
  },
]
</script>
