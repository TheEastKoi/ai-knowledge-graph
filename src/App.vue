<template>
  <div class="h-screen flex flex-col overflow-hidden" style="background: var(--color-bg-primary);">
    <div class="h-16 flex items-center px-6 border-b" style="background: rgba(15, 39, 72, 0.85); backdrop-filter: blur(16px); border-color: var(--color-border-default);">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
             style="background: linear-gradient(135deg, var(--color-armor-red), var(--color-titanium-gold)); box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);">
          AI
        </div>
        <span class="text-[15px] font-semibold tracking-tight" style="color: var(--color-text-primary);">AI Knowledge Graph</span>
      </div>
      <span class="text-[13px] ml-4" style="color: var(--color-text-dim);">Loading components...</span>
    </div>
    <main class="flex-1 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>
