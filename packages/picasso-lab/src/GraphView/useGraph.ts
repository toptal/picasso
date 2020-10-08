import { useEffect, useState, RefObject } from 'react'
import * as d3 from 'd3'
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3'

import { GraphData, GraphNodeData, GraphNodeId } from './types'

export interface UseGraphArguments {
  rootRef: RefObject<SVGSVGElement>
  data: GraphData
  selected?: GraphNodeId
  onMouseOver?: (value: GraphNodeData) => void
  onClick?: (value: GraphNodeData) => void
}

interface Graph {
  destroy: () => void
  update: (data: GraphData, selected?: string | number | undefined) => void
}

// export interface UseGraphResponse {
//   onSelectNode: () => NodeData // TODO: Implement select node.
// }

const REPULSION_STENGTH = -2000
const NODE_PADDING = 8
const DEFAULT_NODE_COLOR = '#eee'

export const useGraph = ({
  rootRef,
  data,
  selected,
  onMouseOver,
  onClick
}: UseGraphArguments) => {
  const [graph, setGraph] = useState<Graph>()

  useEffect(() => {
    console.log('new graph')

    let destroyFn = () => {}

    if (rootRef.current) {
      const graph = drawGraph(rootRef.current, onMouseOver, onClick)

      destroyFn = graph.destroy
      setGraph(graph)
    }

    return destroyFn
  }, [])

  useEffect(() => {
    if (graph && rootRef.current) {
      console.log('updateGraph method', graph.update)
      graph.update(data, selected)
    }
  }, [graph, data, selected])
}

const drawGraph = (
  container: SVGSVGElement,
  onMouseOver?: (value: GraphNodeData) => void,
  onClick?: (value: GraphNodeData) => void
) => {
  const ctx = d3.select(container).select('g.main')

  // Calculate current container box.
  const containerRect = container.getBoundingClientRect()
  const height = containerRect.height
  const width = containerRect.width

  const simulation = d3
    .forceSimulation()
    .force(
      'link',
      d3
        .forceLink()
        .distance(80)
        .id((node: any) => node.id)
    )
    .force('charge', d3.forceManyBody().strength(REPULSION_STENGTH))
    .force('center', d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .on('tick', () => {
      const ctx = d3.select(container).select('g.main')

      ctx
        .selectAll('g')
        .attr('transform', (node: any) => `translate(${node.x},${node.y})`)

      ctx
        .selectAll('line')
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y)
    })
    .on('end', () => {
      simulation.stop()
    })

  const updateGraph = (data: GraphData, selected?: GraphNodeId) => {
    // TODO: Add guard to check links always having a node.

    console.log('updateGraph, ', data)
    simulation.nodes(data.nodes)

    const linkForce = simulation.force('link') as d3.ForceLink<
      SimulationNodeDatum,
      SimulationLinkDatum<SimulationNodeDatum>
    >

    linkForce.links(data.links)

    // Initialize the links
    const lines = ctx.selectAll('line').data(data.links)

    lines
      .enter()
      .append('line')
      .style('stroke', '#aaa')

    lines.exit().remove()

    // Initialize the nodes
    const nodes = ctx.selectAll('g').data(data.nodes, (node: any) => node.id)

    const nodeEnter = nodes
      .enter()
      .append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all')
      .on('mouseover', node => {
        if (onMouseOver) onMouseOver(node)
      })
      .on('click', node => {
        if (onClick) onClick(node)
      })

    nodeEnter
      .append('text')
      .attr('dy', '0.31em')
      .attr('text-anchor', 'middle')
      .text((node: GraphNodeData) => node.name)

    nodeEnter
      .append('rect')
      .attr('width', function () {
        // eslint-disable-next-line no-invalid-this
        const text = this.previousSibling
          ? (d3
              .select(this.parentElement)
              .select('text')
              .node() as SVGTextElement)
          : null

        return text ? text.getBBox().width + NODE_PADDING * 2 : 0
      })
      .attr('x', function () {
        // eslint-disable-next-line no-invalid-this
        const text = this.previousSibling
          ? (d3
              .select(this.parentElement)
              .select('text')
              .node() as SVGTextElement)
          : null

        return text ? -(text.getBBox().width / 2 + NODE_PADDING) : 0
      })
      .attr('height', 30)
      .attr('y', -15)
      .attr('fill', (node: GraphNodeData) =>
        node.color ? node.color : DEFAULT_NODE_COLOR
      )
      .attr('fill-opacity', 0.4)
      .attr('stroke', '#ccc')
      .attr('stroke-width', (node: GraphNodeData) =>
        node.id === selected ? 8 : 1
      )
      .attr('stroke-opacity', 1)

    nodes.exit().remove()

    // enter + update
    nodes
      .select('rect')
      .attr('stroke-width', (node: GraphNodeData) =>
        node.id === selected ? 8 : 1
      )
  }

  return {
    destroy: () => {
      simulation.stop()
      // nodes.remove()
      // lines.remove()
    },
    update: updateGraph
  }
}

export default useGraph
