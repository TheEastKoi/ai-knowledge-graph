<template>
  <div class="h-screen flex flex-col overflow-hidden" style="background: var(--color-bg-primary);">
    <NavBar />
    <main class="flex-1 overflow-hidden" :class="{ 'pb-20': appStore.isGuidedTour }">
      <router-view />
    </main>
    <GuideTourBar />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'
import NavBar from '@/components/layout/NavBar.vue'
import GuideTourBar from '@/components/common/GuideTourBar.vue'

const appStore = useAppStore()
</script>
