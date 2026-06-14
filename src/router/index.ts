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
