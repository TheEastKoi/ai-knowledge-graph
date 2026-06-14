<template>
  <div class="flex flex-col items-center justify-center h-full text-center px-6">
    <div class="text-5xl mb-4 opacity-40">{{ icon }}</div>
    <h2 class="text-lg font-semibold mb-2" style="color: var(--color-text-primary);">{{ title }}</h2>
    <p class="text-[14px] max-w-xs leading-relaxed" style="color: var(--color-text-dim);">{{ description }}</p>
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
