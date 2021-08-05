import { useMemo } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates

import { useNodes } from './useNodes'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './variables'
import {
  DirectionsType,
  DynamicPointLink,
  DynamicPointNode,
  TreeNodeInterface,
  TreeViewVariant
} from './types'

export interface UseTreeArguments {
  data: TreeNodeInterface
  nodeWidth?: number
  nodeHeight?: number
  direction: DirectionsType
  verticalMargin: number
  horizontalMargin: number
  variant: TreeViewVariant
}

export interface UseTreeResponse {
  nodes: DynamicPointNode[]
  links: DynamicPointLink[]
  selectedNode: DynamicPointNode | undefined
}

type NodeAggregationType = 'siblings' | 'leaves'

const calculateNodeXorYPosition = (isX: boolean) => {
  const resultFn = (
    node: HierarchyPointNode<TreeNodeInterface>,
    {
      leaves,
      nodeSizeAttr,
      aggregationType = 'leaves'
    }: {
      leaves: HierarchyPointNode<TreeNodeInterface>[]
      nodeSizeAttr: number
      aggregationType: NodeAggregationType
    }
  ) => {
    let index = 0
    let position = 0
    const xOrY = isX ? 'x' : 'y'

    if (!node.children || !node.children.length) {
      if (aggregationType === 'leaves') {
        index = leaves.findIndex(leaf => leaf === node)
        position = Math.floor(index - leaves.length / 2) * nodeSizeAttr
      } else {
        const siblings = node?.parent?.children

        if (siblings) {
          index = siblings.findIndex(leaf => leaf === node)
          position =
            siblings.length % 2
              ? Math.floor(index - siblings.length / 2) * nodeSizeAttr
              : Math.floor(index - siblings.length / 2) * nodeSizeAttr -
                nodeSizeAttr / 2
        }
      }
    } else {
      if (aggregationType === 'leaves') {
        position =
          node.children.reduce((acc, child) => {
            resultFn(child, { leaves, nodeSizeAttr, aggregationType })

            acc += isX ? child.x : child.y

            return acc
          }, 0) / node.children.length
      } else {
        node.children.reduce((acc, child) => {
          resultFn(child, { leaves, nodeSizeAttr, aggregationType })

          return acc
        }, 0)

        const halfLength = node.children.length / 2

        if (node.children.length % 2) {
          position = node.children[Math.floor(halfLength)][xOrY]
        } else {
          position =
            (node.children[halfLength][xOrY] +
              node.children[halfLength - 1][xOrY]) /
            2
        }
      }
    }

    node[xOrY] = position

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
  direction,
  verticalMargin,
  horizontalMargin,
  variant
}: UseTreeArguments): UseTreeResponse => {
  const fullNodeWidth = nodeWidth + 2 * horizontalMargin
  const fullNodeHeight = nodeHeight + 2 * verticalMargin

  const rootNode = useMemo(() => {
    const root = d3.hierarchy(data)

    const rootNode = d3
      .tree<TreeNodeInterface>()
      .nodeSize([fullNodeWidth, DEFAULT_HEIGHT])(root)
    const leaves = rootNode.leaves()

    if (direction === 'vertical') {
      return calculateNodeXPosition(rootNode, {
        leaves,
        nodeSizeAttr: fullNodeWidth,
        aggregationType: variant === 'normal' ? 'leaves' : 'siblings'
      })
    }

    return calculateNodeYPosition(rootNode, {
      leaves,
      nodeSizeAttr: fullNodeHeight,
      aggregationType: variant === 'normal' ? 'leaves' : 'siblings'
    })
  }, [data, fullNodeWidth, fullNodeHeight, direction, variant])

  const nodes = useNodes(rootNode, direction, verticalMargin, horizontalMargin)

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
