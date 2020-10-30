import { useMemo } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates

import { useNodes } from './useNodes'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, HORIZONTAL_MARGIN } from './variables'
import { DynamicPointLink, DynamicPointNode, TreeNodeInterface } from './types'

export interface UseTreeArguments {
  data: TreeNodeInterface
  nodeWidth?: number
}

export interface UseTreeResponse {
  nodes: DynamicPointNode[]
  links: DynamicPointLink[]
  selectedNode: DynamicPointNode | undefined
}

const calculateNodeXPosition = (
  node: HierarchyPointNode<TreeNodeInterface>,
  {
    leaves,
    nodeWidth
  }: { leaves: HierarchyPointNode<TreeNodeInterface>[]; nodeWidth: number }
) => {
  if (!node.children || !node.children.length) {
    const index = leaves.findIndex(leaf => leaf === node)

    node.x = Math.floor(index - leaves.length / 2) * nodeWidth
  } else {
    node.x =
      node.children.reduce((acc, child) => {
        calculateNodeXPosition(child, { leaves, nodeWidth })

        acc += child.x

        return acc
      }, 0) / node.children.length
  }

  return node
}

export const useTree = ({
  data,
  nodeWidth = DEFAULT_WIDTH
}: UseTreeArguments): UseTreeResponse => {
  const fullNodeWidth = nodeWidth + 2 * HORIZONTAL_MARGIN

  const rootNode = useMemo(() => {
    const root = d3.hierarchy(data)

    const rootNode = d3
      .tree<TreeNodeInterface>()
      .nodeSize([fullNodeWidth, DEFAULT_HEIGHT])(root)
    const leaves = rootNode.leaves()

    return calculateNodeXPosition(rootNode, {
      leaves,
      nodeWidth: fullNodeWidth
    })
  }, [data])

  const nodes = useNodes(rootNode)

  const links = useMemo(
    () =>
      nodes.reduce<DynamicPointLink[]>(
        (acc: DynamicPointLink[], nodePoint: DynamicPointNode) => {
          if (nodePoint.parent) {
            acc.push({
              source: nodePoint.parent,
              target: nodePoint
            })
          }

          return acc
        },
        []
      ),
    [nodes]
  )

  const selectedNode = useMemo(() => nodes.find(node => node.data.selected), [
    nodes
  ])

  return {
    nodes,
    links,
    selectedNode
  }
}
