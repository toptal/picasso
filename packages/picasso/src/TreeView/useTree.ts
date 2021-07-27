import { useMemo } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates

import { useNodes } from './useNodes'
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  HORIZONTAL_MARGIN,
  VERTICAL_MARGIN
} from './variables'
import { DynamicPointLink, DynamicPointNode, TreeNodeInterface } from './types'

export interface UseTreeArguments {
  data: TreeNodeInterface
  nodeWidth?: number
  nodeHeight?: number
  isHorizontal?: boolean
}

export interface UseTreeResponse {
  nodes: DynamicPointNode[]
  links: DynamicPointLink[]
  selectedNode: DynamicPointNode | undefined
}

const calculateNodeXorYPosition = (isX: boolean) => {
  const resultFn = (
    node: HierarchyPointNode<TreeNodeInterface>,
    {
      leaves,
      nodeSizeAttr
    }: { leaves: HierarchyPointNode<TreeNodeInterface>[]; nodeSizeAttr: number }
  ) => {
    if (!node.children || !node.children.length) {
      const index = leaves.findIndex(leaf => leaf === node)
      const position = Math.floor(index - leaves.length / 2) * nodeSizeAttr

      if (isX) {
        node.x = position
      } else {
        node.y = position
      }
    } else {
      const reducedValue =
        node.children.reduce((acc, child) => {
          resultFn(child, { leaves, nodeSizeAttr })

          acc += isX ? child.x : child.y

          return acc
        }, 0) / node.children.length

      if (isX) {
        node.x = reducedValue
      } else {
        node.y = reducedValue
      }
    }

    return node
  }

  return resultFn
}

const calculateNodeXPosition = calculateNodeXorYPosition(true)
const calculateNodeYPosition = calculateNodeXorYPosition(false)

export const useTree = ({
  data,
  nodeWidth = DEFAULT_WIDTH,
  nodeHeight = DEFAULT_HEIGHT,
  isHorizontal = false
}: UseTreeArguments): UseTreeResponse => {
  const fullNodeWidth = nodeWidth + 2 * HORIZONTAL_MARGIN
  const fullNodeHeight = nodeHeight + 2 * VERTICAL_MARGIN

  const rootNode = useMemo(() => {
    const root = d3.hierarchy(data)

    const rootNode = d3
      .tree<TreeNodeInterface>()
      .nodeSize([fullNodeWidth, DEFAULT_HEIGHT])(root)
    const leaves = rootNode.leaves()

    if (!isHorizontal) {
      return calculateNodeXPosition(rootNode, {
        leaves,
        nodeSizeAttr: fullNodeWidth
      })
    }

    return calculateNodeYPosition(rootNode, {
      leaves,
      nodeSizeAttr: fullNodeHeight
    })
  }, [data, fullNodeWidth, fullNodeHeight, isHorizontal])

  const nodes = useNodes(rootNode, isHorizontal)

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
