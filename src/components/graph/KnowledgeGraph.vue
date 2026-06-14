<template>
  <div ref="containerRef" class="w-full h-full relative overflow-hidden">
    <svg ref="svgRef" class="w-full h-full cursor-grab" :class="{ 'cursor-grabbing': isDragging }" />
    <GraphControls />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as d3 from 'd3'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import { useAppStore } from '@/stores/appStore'
import GraphControls from './GraphControls.vue'
import type { ConceptNode } from '@/types'

const knowledgeStore = useKnowledgeStore()
const appStore = useAppStore()
const containerRef = ref<HTMLDivElement>()
const svgRef = ref<SVGSVGElement>()
const isDragging = ref(false)

const emit = defineEmits<{
  selectNode: [nodeId: string]
}>()

const colorMap: Record<string, string> = {
  base: '#22c55e',
  llm: '#3b82f6',
  agent: '#eab308',
}

const radiusMap: Record<number, number> = { 1: 34, 2: 26, 3: 22, 4: 18, 5: 16 }

function buildLinks(nodes: ConceptNode[]) {
  const links: { source: string; target: string }[] = []
  const nodeMap = new Map(nodes.map(n => [n.id, n]))
  const seen = new Set<string>()

  nodes.forEach(node => {
    if (node.relatedConcepts) {
      node.relatedConcepts.forEach(targetId => {
        const key = [node.id, targetId].sort().join('-')
        if (!seen.has(key) && nodeMap.has(targetId)) {
          seen.add(key)
          links.push({ source: node.id, target: targetId })
        }
      })
    }
  })
  return links
}

let simulation: d3.Simulation<any, any> | null = null
let zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null

function getLevelX(level: number, width: number): number {
  const ratios: Record<number, number> = { 1: 0.1, 2: 0.3, 3: 0.5, 4: 0.7, 5: 0.88 }
  return width * (ratios[level] || 0.5)
}

function initGraph() {
  if (!svgRef.value || !containerRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  svg.attr('width', width).attr('height', height)

  const g = svg.append('g')
  const nodes = [...knowledgeStore.nodes] as any[]
  const links = buildLinks(nodes)

  zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 2.5])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  svg.call(zoomBehavior)

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120).strength(0.4))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2).strength(0.03))
    .force('collision', d3.forceCollide().radius((d: any) => radiusMap[d.level] + 10))
    .force('x', d3.forceX((d: any) => getLevelX(d.level, width)).strength(0.8))
    .force('y', d3.forceY(height / 2).strength(0.08))

  const link = g.append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('stroke', 'rgba(14, 165, 233, 0.15)')
    .attr('stroke-width', 1)
    .attr('stroke-opacity', 0.6)

  const dragBehavior = d3.drag<any, any>()
    .on('start', (event: any, d: any) => {
      if (!event.active) simulation?.alphaTarget(0.3).restart()
      d.fx = d.x; d.fy = d.y
      isDragging.value = true
    })
    .on('drag', (event: any, d: any) => {
      d.fx = event.x; d.fy = event.y
    })
    .on('end', (event: any, d: any) => {
      if (!event.active) simulation?.alphaTarget(0)
      d.fx = null; d.fy = null
      isDragging.value = false
    })

  const node = (g.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .style('cursor', 'pointer') as any)
    .call(dragBehavior)

  // Circles
  node.append('circle')
    .attr('r', (d: any) => radiusMap[d.level])
    .attr('fill', (d: any) => colorMap[d.category])
    .attr('fill-opacity', 0.25)
    .attr('stroke', (d: any) => d3.color(colorMap[d.category])!.brighter(0.5) as any)
    .attr('stroke-width', 2)
    .attr('style', (d: any) => `filter: drop-shadow(0 0 8px ${colorMap[d.category]}40);`)

  // Text labels
  node.append('text')
    .attr('dy', (d: any) => radiusMap[d.level] + 14)
    .attr('text-anchor', 'middle')
    .attr('fill', '#e2e8f0')
    .attr('font-size', '11px')
    .attr('font-weight', '500')
    .text((d: any) => d.name.length > 12 ? d.name.slice(0, 11) + '...' : d.name)

  // Tooltips
  node.append('title').text((d: any) => d.name)

  // Click handler
  node.on('click', (event: MouseEvent, d: any) => {
    event.stopPropagation()
    appStore.selectNode(d.id)
    emit('selectNode', d.id)
    highlightConnections(d)
  })

  // Click background to deselect
  svg.on('click', () => {
    if (appStore.mode === 'normal') {
      appStore.selectNode(null)
      resetHighlights()
    }
  })

  if (simulation) {
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })
  }
}

function highlightConnections(d: ConceptNode) {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  const relatedIds = new Set([d.id, ...d.relatedConcepts, ...d.prerequisites, ...d.nextSteps])

  svg.selectAll<SVGGElement, any>('.node')
    .transition().duration(300)
    .attr('opacity', (n: any) => relatedIds.has(n.id) ? 1 : 0.15)

  svg.selectAll<SVGLineElement, any>('.link')
    .transition().duration(300)
    .attr('stroke-opacity', (l: any) => {
      return (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.08
    })
    .attr('stroke', (l: any) => {
      return (l.source.id === d.id || l.target.id === d.id)
        ? '#0ea5e9'
        : 'rgba(14, 165, 233, 0.15)'
    })
}

function resetHighlights() {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('.node').transition().duration(300).attr('opacity', 1)
  svg.selectAll('.link').transition().duration(300)
    .attr('stroke-opacity', 0.6)
    .attr('stroke', 'rgba(14, 165, 233, 0.15)')
}

// Window resize handler
function handleResize() {
  if (!containerRef.value || !svgRef.value) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  d3.select(svgRef.value).attr('width', w).attr('height', h)
  if (simulation) {
    simulation.force('x', d3.forceX((d: any) => getLevelX(d.level, w)).strength(0.8))
    simulation.alpha(0.3).restart()
  }
}

onMounted(() => {
  nextTick(() => initGraph())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  simulation?.stop()
  window.removeEventListener('resize', handleResize)
})

defineExpose({ highlightConnections, resetHighlights })
</script>
