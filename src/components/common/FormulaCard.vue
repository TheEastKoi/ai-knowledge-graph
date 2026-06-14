<template>
  <div class="formula-card glass-panel p-5 mb-4 cursor-pointer select-none"
       @click="expanded = !expanded">
    <!-- Header: formula + toggle -->
    <div class="flex items-start gap-4">
      <div class="flex-1 min-w-0">
        <div class="text-[12px] font-medium mb-2" style="color: var(--color-arc-blue-light);">{{ annotation.title }}</div>
        <!-- KaTeX formula -->
        <div class="formula-display py-2 overflow-x-auto" v-html="renderedFormula" />
      </div>
      <div class="shrink-0 transition-transform duration-300 mt-1" :style="{ transform: expanded ? 'rotate(180deg)' : '' }">
        <span style="color: var(--color-text-dim); font-size: 12px;">▼</span>
      </div>
    </div>

    <!-- Expanded: purpose + variable table -->
    <div v-if="expanded" class="mt-4 pt-4 border-t" style="border-color: var(--color-border-subtle);">
      <!-- Purpose -->
      <div class="mb-4 p-3 rounded-lg" style="background: rgba(14,165,233,0.06); border: 1px solid var(--color-border-subtle);">
        <div class="text-[11px] font-semibold mb-1" style="color: var(--color-arc-blue-light);">这个公式在做什么？</div>
        <p class="text-[13px] leading-relaxed m-0" style="color: var(--color-text-secondary);">{{ annotation.purpose }}</p>
      </div>

      <!-- Variable table -->
      <div>
        <div class="text-[11px] font-semibold mb-2" style="color: var(--color-text-dim);">符号含义</div>
        <div class="overflow-hidden rounded-lg border" style="border-color: var(--color-border-subtle);">
          <table class="w-full text-[12px]">
            <thead>
              <tr style="background: rgba(14,165,233,0.06);">
                <th class="text-left px-3 py-2 font-semibold" style="color: var(--color-arc-blue-light);">符号</th>
                <th class="text-left px-3 py-2 font-semibold" style="color: var(--color-text-dim);">名称</th>
                <th class="text-left px-3 py-2 font-semibold" style="color: var(--color-text-dim);">含义</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v, i) in annotation.variables" :key="v.symbol"
                  :style="{ background: i % 2 === 0 ? 'transparent' : 'rgba(14,165,233,0.03)' }">
                <td class="px-3 py-2 font-mono font-semibold" style="color: var(--color-titanium-gold);">{{ v.symbol }}</td>
                <td class="px-3 py-2" style="color: var(--color-text-primary);">{{ v.name }}</td>
                <td class="px-3 py-2" style="color: var(--color-text-muted);">{{ v.meaning }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Collapsed hint -->
    <div v-if="!expanded" class="mt-2 text-[11px]" style="color: var(--color-text-dim);">
      点击展开 — 查看公式含义和符号解释
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import katex from 'katex'
import type { FormulaAnnotation } from '@/types'

const props = defineProps<{ annotation: FormulaAnnotation }>()
const expanded = ref(false)

const renderedFormula = computed(() => {
  try {
    return katex.renderToString(props.annotation.formula, {
      displayMode: true,
      throwOnError: false,
    })
  } catch {
    return `<pre>${props.annotation.formula}</pre>`
  }
})
</script>
