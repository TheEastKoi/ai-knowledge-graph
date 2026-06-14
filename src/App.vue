<template>
  <div class="h-screen flex flex-col overflow-hidden" style="background: var(--color-bg-primary);">
    <NavBar />
    <main class="flex-1 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
</script>
