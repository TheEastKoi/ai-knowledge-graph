<template>
  <div ref="containerRef" class="w-full h-full relative overflow-hidden" style="background: var(--color-bg-primary);">
    <!-- HUD Grid Background -->
    <canvas ref="gridCanvas" class="absolute inset-0 pointer-events-none" style="opacity: 0.12;" />
    <svg ref="svgRef" class="w-full h-full cursor-grab relative z-10" :class="{ 'cursor-grabbing': isDragging }" />
    <GraphControls />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as d3 from 'd3'
import { useKnowledgeStore } from '@/stores/knowledgeStore'
import { useAppStore } from '@/stores/appStore'
import GraphControls from './GraphControls.vue'
import type { ConceptNode } from '@/types'

const knowledgeStore = useKnowledgeStore()
const appStore = useAppStore()
const containerRef = ref<HTMLDivElement>()
const svgRef = ref<SVGSVGElement>()
const gridCanvas = ref<HTMLCanvasElement>()
const isDragging = ref(false)

const emit = defineEmits<{ selectNode: [nodeId: string] }>()

// Iron Man Holographic color palette
const colors = {
  base: { fill: '#22c55e', glow: 'rgba(34,197,94,0.5)', stroke: '#4ade80' },
  llm: { fill: '#3b82f6', glow: 'rgba(59,130,246,0.5)', stroke: '#60a5fa' },
  agent: { fill: '#eab308', glow: 'rgba(234,179,8,0.5)', stroke: '#facc15' },
}

const radiusMap: Record<number, number> = { 1: 30, 2: 24, 3: 19, 4: 16, 5: 14 }

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

function getLevelX(level: number, width: number): number {
  const ratios: Record<number, number> = { 1: 0.1, 2: 0.28, 3: 0.48, 4: 0.68, 5: 0.86 }
  return width * (ratios[level] || 0.5)
}

// Draw HUD grid background
function drawGrid() {
  if (!gridCanvas.value || !containerRef.value) return
  const canvas = gridCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  canvas.width = w
  canvas.height = h

  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)'
  ctx.lineWidth = 0.5

  const gridSize = 40
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  // Dots at intersections
  ctx.fillStyle = 'rgba(14, 165, 233, 0.18)'
  for (let x = 0; x < w; x += gridSize) {
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function initGraph() {
  if (!svgRef.value || !containerRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  svg.attr('width', width).attr('height', height)

  // Draw grid
  drawGrid()

  // Level separator lines
  const levelLabels = ['入门基础', '核心原理', '关键组件', '进阶技术', '生产落地']
  for (let lv = 1; lv <= 5; lv++) {
    const x = getLevelX(lv, width)
    svg.append('line')
      .attr('x1', x).attr('y1', 40)
      .attr('x2', x).attr('y2', height - 20)
      .attr('stroke', 'rgba(14, 165, 233, 0.08)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,6')

    svg.append('text')
      .attr('x', x).attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(14, 165, 233, 0.25)')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .text(`L${lv} · ${levelLabels[lv - 1]}`)
  }

  const g = svg.append('g')
  const nodes = [...knowledgeStore.nodes] as any[]
  const links = buildLinks(nodes)

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 2.5])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  svg.call(zoom)

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id).distance(140).strength(0.35))
    .force('charge', d3.forceManyBody().strength(-350))
    .force('center', d3.forceCenter(width / 2, height / 2).strength(0.02))
    .force('collision', d3.forceCollide().radius((d: any) => radiusMap[d.level] + 15))
    .force('x', d3.forceX((d: any) => getLevelX(d.level, width)).strength(0.9))
    .force('y', d3.forceY(height / 2).strength(0.08))

  // Curved links using path arcs
  const linkGroup = g.append('g')
  const linkPaths = linkGroup.selectAll('path')
    .data(links)
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', 'rgba(14, 165, 233, 0.1)')
    .attr('stroke-width', 0.8)
    .attr('stroke-opacity', 0.5)

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

  const nodeGroup = g.append('g')

  // Node groups
  const node = nodeGroup.selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .call(dragBehavior)

  // Outer glow ring
  node.append('circle')
    .attr('class', 'node-glow')
    .attr('r', (d: any) => radiusMap[d.level] + 6)
    .attr('fill', 'none')
    .attr('stroke', (d: any) => colors[d.category as keyof typeof colors].glow)
    .attr('stroke-width', 1)
    .attr('opacity', 0.3)

  // Main circle
  node.append('circle')
    .attr('class', 'node-main')
    .attr('r', (d: any) => radiusMap[d.level])
    .attr('fill', (d: any) => colors[d.category as keyof typeof colors].fill)
    .attr('fill-opacity', 0.2)
    .attr('stroke', (d: any) => colors[d.category as keyof typeof colors].stroke)
    .attr('stroke-width', 1.5)

  // Inner dot for core nodes (level 1-2)
  node.filter((d: any) => d.level <= 2)
    .append('circle')
    .attr('class', 'node-inner')
    .attr('r', 4)
    .attr('fill', (d: any) => colors[d.category as keyof typeof colors].stroke)
    .attr('opacity', 0.6)

  // Text labels - always visible
  node.append('text')
    .attr('class', 'node-label')
    .attr('dy', (d: any) => radiusMap[d.level] + 13)
    .attr('text-anchor', 'middle')
    .attr('fill', '#94a3b8')
    .attr('font-size', (d: any) => d.level <= 2 ? '11px' : '10px')
    .attr('font-weight', '500')
    .attr('opacity', 0.8)
    .text((d: any) => {
      const n = d.name.length > 10 ? d.name.slice(0, 9) + '…' : d.name
      return n
    })

  // Tooltip
  node.append('title').text((d: any) => d.name)

  // Hover effects (use d3.selectAll to avoid type narrowing issues)
  d3.selectAll<SVGGElement, any>('.node')
    .on('mouseenter', function(_event: any, d: any) {
      const sel = d3.select(this)
      sel.select('.node-glow')
        .transition().duration(200)
        .attr('opacity', 0.8)
        .attr('r', radiusMap[d.level] + 8)
      sel.select('.node-main')
        .transition().duration(200)
        .attr('fill-opacity', 0.4)
      sel.select('.node-label')
        .transition().duration(200)
        .attr('opacity', 1)
    })
    .on('mouseleave', function(_event: any, d: any) {
      const sel = d3.select(this)
      sel.select('.node-glow')
        .transition().duration(300)
        .attr('opacity', 0.3)
        .attr('r', radiusMap[d.level] + 6)
      sel.select('.node-main')
        .transition().duration(300)
        .attr('fill-opacity', 0.2)
      sel.select('.node-label')
        .transition().duration(300)
        .attr('opacity', 0.8)
    })
    .on('click', (event: MouseEvent, d: any) => {
      event.stopPropagation()
      appStore.selectNode(d.id)
      appStore.markProgress(d.id, 'in_progress')
      emit('selectNode', d.id)
      highlightConnections(d)
    })
    .on('dblclick', (event: MouseEvent, d: any) => {
      event.stopPropagation()
      window.location.hash = `#/detail/${d.id}`
    })

  // Click background deselect
  svg.on('click', () => {
    if (appStore.mode === 'normal') {
      appStore.selectNode(null)
      resetHighlights()
    }
  })

  simulation.on('tick', () => {
    linkPaths.attr('d', (d: any) => {
      const dx = d.target.x - d.source.x
      const dy = d.target.y - d.source.y
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.5
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
    })
    node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  })
}

function highlightConnections(d: ConceptNode) {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  const relatedIds = new Set([d.id, ...d.relatedConcepts, ...d.prerequisites, ...d.nextSteps])

  svg.selectAll<SVGGElement, any>('.node')
    .transition().duration(400)
    .attr('opacity', (n: any) => relatedIds.has(n.id) ? 1 : 0.08)

  svg.selectAll<SVGPathElement, any>('.link')
    .transition().duration(400)
    .attr('stroke-opacity', (l: any) =>
      (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.03
    )
    .attr('stroke', (l: any) =>
      (l.source.id === d.id || l.target.id === d.id) ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.06)'
    )
    .attr('stroke-width', (l: any) =>
      (l.source.id === d.id || l.target.id === d.id) ? 1.5 : 0.5
    )

  // Show labels for highlighted nodes
  svg.selectAll<SVGGElement, any>('.node')
    .filter((n: any) => relatedIds.has(n.id))
    .select('.node-label')
    .transition().duration(300)
    .attr('opacity', 1)

  // Pulse animation on selected node
  svg.selectAll<SVGGElement, any>('.node')
    .filter((n: any) => n.id === d.id)
    .select('.node-glow')
    .transition().duration(600)
    .attr('opacity', 1)
    .attr('r', (d2: any) => radiusMap[d2.level] + 10)
    .transition().duration(600)
    .attr('opacity', 0.5)
    .attr('r', (d2: any) => radiusMap[d2.level] + 6)
}

function resetHighlights() {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('.node').transition().duration(400).attr('opacity', 1)
  svg.selectAll('.link').transition().duration(400)
    .attr('stroke-opacity', 0.5)
    .attr('stroke', 'rgba(14, 165, 233, 0.1)')
    .attr('stroke-width', 0.8)
  svg.selectAll('.node-label')
    .transition().duration(300)
    .attr('opacity', 0.8)
  svg.selectAll('.node-glow')
    .transition().duration(300)
    .attr('opacity', 0.3)
    .attr('r', (d: any) => radiusMap[d.level] + 6)
}

function handleResize() {
  if (!containerRef.value || !svgRef.value) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  d3.select(svgRef.value).attr('width', w).attr('height', h)
  if (simulation) {
    simulation.force('x', d3.forceX((d: any) => getLevelX(d.level, w)).strength(0.9))
    simulation.alpha(0.3).restart()
  }
  drawGrid()
}

onMounted(() => {
  nextTick(() => initGraph())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  simulation?.stop()
  window.removeEventListener('resize', handleResize)
})

// Watch for selectedNodeId changes (guided tour, etc.)
watch(() => appStore.selectedNodeId, (nodeId) => {
  if (!svgRef.value || !nodeId) return
  const node = knowledgeStore.getNodeById(nodeId)
  if (!node) return
  highlightConnections(node)

  // Auto-center on the selected node
  const svg = d3.select(svgRef.value)
  const transform = d3.zoomTransform(svg.node()!)
  const w = containerRef.value?.clientWidth || 1200
  const h = containerRef.value?.clientHeight || 800
  const n = knowledgeStore.nodes.find((n: ConceptNode) => n.id === nodeId) as any
  if (!n || n.x === undefined) return

  const tx = w / 2 - n.x * transform.k
  const ty = h / 2 - n.y * transform.k
  svg.transition().duration(500).call(
    d3.zoom<SVGSVGElement, unknown>().transform as any,
    d3.zoomIdentity.translate(tx, ty).scale(transform.k)
  )
})

// Guide/interview mode
watch(() => [appStore.mode, appStore.focusedLevel] as const, ([mode, level]) => {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)

  if (mode === 'guide' && level) {
    const levelSet = new Set(knowledgeStore.nodes.filter(n => n.level <= level).map(n => n.id))
    svg.selectAll('.node').transition().duration(400)
      .attr('opacity', (d: any) => levelSet.has(d.id) ? 1 : 0.06)
    svg.selectAll('.link').transition().duration(400)
      .attr('stroke-opacity', (l: any) =>
        levelSet.has(l.source.id) && levelSet.has(l.target.id) ? 0.6 : 0.02
      )
  } else if (mode === 'interview') {
    const iIds = new Set(['llm','agent','transformer','rag','memory','toolcall','planning','react','multiagent','agent-evaluation','agent-security','agent-reliability','cot','lora','sft'])
    svg.selectAll('.node').transition().duration(400)
      .attr('opacity', (d: any) => iIds.has(d.id) ? 1 : 0.06)
    svg.selectAll('.link').transition().duration(400)
      .attr('stroke-opacity', (l: any) => iIds.has(l.source.id) && iIds.has(l.target.id) ? 0.6 : 0.02)
  } else if (!appStore.isGuidedTour) {
    svg.selectAll('.node').transition().duration(400).attr('opacity', 1)
    svg.selectAll('.link').transition().duration(400).attr('stroke-opacity', 0.5)
  }
})

defineExpose({ highlightConnections, resetHighlights })
</script>
