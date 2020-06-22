import { createRef, useLayoutEffect, useMemo, useState } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  HORIZONTAL_MARGIN,
  VERTICAL_MARGIN
} from './variables'
import { DynamicPointLink, DynamicPointNode, TreeNodeInterface } from './types'

export interface UseTreeArguments {
  data: TreeNodeInterface
}

export interface UseTreeResponse {
  nodes: DynamicPointNode[]
  links: DynamicPointLink[]
  selectedNode: DynamicPointNode | undefined
}

export interface LevelInfo {
  top: number
  width: number
  height: number
}

const updatePositions = (nodes: DynamicPointNode[]) => {
  const levels: Record<number, LevelInfo> = {}

  nodes
    .sort((left, right) => left.depth - right.depth)
    .forEach(node => {
      const {
        scrollWidth: width,
        scrollHeight: height
      } = node.ref.current!.firstElementChild!

      if (!height || !width) {
        return
      }

      node.y = 0
      node.rect = {
        width,
        height
      }

      if (!node.parent) {
        levels[node.depth] = {
          width,
          height,
          top: 0
        }
      } else {
        const previousLevel = levels[node.depth - 1]

        node.y = previousLevel.top + previousLevel.height + VERTICAL_MARGIN

        levels[node.depth] = {
          width,
          height: Math.max(levels[node.depth]?.height || 0, height),
          top: previousLevel.top + previousLevel.height + VERTICAL_MARGIN
        }
      }
    })

  return levels
}

const getDynamicNodes = (
  nodes: HierarchyPointNode<TreeNodeInterface>[]
): DynamicPointNode[] => {
  return nodes.map(node => {
    return Object.assign(node, {
      ref: createRef<HTMLElement>(),
      rect: {
        width: 0,
        height: 0
      }
    })
  })
}

export const useTree = ({ data }: UseTreeArguments): UseTreeResponse => {
  const [levels, setLevels] = useState<Record<number, LevelInfo>>()
  const rootNode = useMemo(() => {
    const root = d3.hierarchy(data)

    return d3
      .tree<TreeNodeInterface>()
      .nodeSize([DEFAULT_WIDTH + 2 * HORIZONTAL_MARGIN, DEFAULT_HEIGHT])(root)
  }, [data])
  // create a dynamic nodes
  const dynamicNodes = useMemo(() => getDynamicNodes(rootNode.descendants()), [
    rootNode
  ])
  // `nodes` depend on levels and dynamicNodes, so it's another entity
  const nodes = useMemo<DynamicPointNode[]>(() => {
    if (!levels) {
      return dynamicNodes
    }

    return dynamicNodes.map(node => {
      const previousLevel = levels[node.depth - 1]

      if (previousLevel) {
        node.y = previousLevel.top + previousLevel.height + VERTICAL_MARGIN
      }

      return node
    })
  }, [dynamicNodes, levels])

  const links = useMemo(
    () =>
      nodes.reduce<DynamicPointLink[]>((acc, nodePoint) => {
        if (nodePoint.parent) {
          acc.push({
            source: nodePoint.parent,
            target: nodePoint
          })
        }
        return acc
      }, []),
    [nodes]
  )

  const selectedNode = useMemo(() => nodes.find(node => node.data.selected), [
    nodes
  ])

  useLayoutEffect(() => {
    const rootNode = dynamicNodes[0]

    if (!rootNode.ref.current) {
      return
    }

    setLevels(updatePositions(dynamicNodes))
  }, [dynamicNodes])

  return {
    nodes,
    links,
    selectedNode
  }
}
