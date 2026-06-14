<template>
  <div class="rounded-xl overflow-hidden border my-4" style="background: rgba(9, 20, 40, 0.8); border-color: var(--color-border-default);">
    <div class="flex items-center justify-between px-4 py-2 border-b" style="background: rgba(14, 165, 233, 0.06); border-color: var(--color-border-subtle);">
      <div class="flex items-center gap-2">
        <span class="text-[11px] font-medium" style="color: var(--color-arc-blue-light);">{{ language }}</span>
        <span v-if="title" class="text-[11px]" style="color: var(--color-text-dim);">{{ title }}</span>
      </div>
      <button @click="copy" class="text-[11px] transition-colors" style="color: var(--color-text-dim);">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre class="p-4 m-0 overflow-x-auto text-[13px] leading-relaxed" style="font-family: 'JetBrains Mono', 'Fira Code', monospace; color: #e2e8f0;"><code v-html="highlightedCode" /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'

const props = defineProps<{ code: string; language: string; title?: string }>()
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
