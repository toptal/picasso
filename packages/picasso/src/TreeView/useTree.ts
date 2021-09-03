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
type CoordinateType = 'x' | 'y'

type CalculateNodePositionOptions = {
  node: HierarchyPointNode<TreeNodeInterface>
  leaves: HierarchyPointNode<TreeNodeInterface>[]
  nodeSizeAttr: number
  aggregationType: NodeAggregationType
}

const getPositionLeavesAndNoChildren = (
  options: CalculateNodePositionOptions
) => {
  const { leaves, node, nodeSizeAttr } = options
  const index = leaves.findIndex(leaf => leaf === node)
  const position = Math.floor(index - leaves.length / 2) * nodeSizeAttr

  return position
}

const getPositionNoLeavesAndNoChildren = (
  coordinateType: CoordinateType,
  options: CalculateNodePositionOptions
) => {
  const { node, nodeSizeAttr } = options
  const siblings = node?.parent?.children
  let position = 0

  if (siblings) {
    const index: number = siblings.findIndex(leaf => leaf === node)
    const indexWithChildren: number = siblings.findIndex(leaf => leaf.children)

    if (indexWithChildren !== -1) {
      position =
        siblings[indexWithChildren][coordinateType] +
        (index - indexWithChildren) * nodeSizeAttr
    } else {
      position =
        siblings.length % 2
          ? Math.floor(index - siblings.length / 2) * nodeSizeAttr
          : Math.floor(index - siblings.length / 2) * nodeSizeAttr -
            nodeSizeAttr / 2
    }
  }

  return position
}

const getPositionLeavesAndChildren = (
  calculateNodePosition: (
    options: CalculateNodePositionOptions
  ) => d3.HierarchyPointNode<TreeNodeInterface>,
  coordinateType: CoordinateType,
  options: CalculateNodePositionOptions
) => {
  const { node } = options

  node.children = node.children || []
  const position: number =
    node.children.reduce((acc, child) => {
      calculateNodePosition({ ...options, node: child })

      acc += child[coordinateType]

      return acc
    }, 0) / node.children.length

  return position
}

const getPositionNoLeavesButChildren = (
  calculateNodePosition: (
    options: CalculateNodePositionOptions
  ) => d3.HierarchyPointNode<TreeNodeInterface>,
  coordinateType: CoordinateType,
  options: CalculateNodePositionOptions
) => {
  let position = 0

  const { node } = options

  node.children = node.children || []

  const childWithChildrenIndex = node.children.findIndex(
    child => child.children
  )

  if (childWithChildrenIndex !== -1) {
    calculateNodePosition({
      ...options,
      node: node.children[childWithChildrenIndex]
    })
  }

  node.children.reduce((acc, child) => {
    if (!child.children) {
      calculateNodePosition({ ...options, node: child })
    }

    return acc
  }, 0)

  const halfLength = node.children.length / 2

  if (node.children.length % 2) {
    position = node.children[Math.floor(halfLength)][coordinateType]
  } else {
    position =
      (node.children[halfLength][coordinateType] +
        node.children[halfLength - 1][coordinateType]) /
      2
  }

  return position
}

const getCalculateNodePositionFn = (coordinateType: CoordinateType) => {
  const calculateNodePosition = (options: CalculateNodePositionOptions) => {
    const { node, aggregationType = 'leaves' } = options
    let position = 0

    if (!node.children || !node.children.length) {
      if (aggregationType === 'leaves') {
        position = getPositionLeavesAndNoChildren(options)
      } else {
        position = getPositionNoLeavesAndNoChildren(coordinateType, options)
      }
    } else {
      if (aggregationType === 'leaves') {
        position = getPositionLeavesAndChildren(
          calculateNodePosition,
          coordinateType,
          options
        )
      } else {
        position = getPositionNoLeavesButChildren(
          calculateNodePosition,
          coordinateType,
          options
        )
      }
    }

    node[coordinateType] = position

    return node
  }

  return calculateNodePosition
}

const calculateNodeXPosition = getCalculateNodePositionFn('x')
const calculateNodeYPosition = getCalculateNodePositionFn('y')

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
      .nodeSize([nodeWidth, nodeHeight])(root)
    const leaves = rootNode.leaves()

    if (direction === 'vertical') {
      return calculateNodeXPosition({
        node: rootNode,
        leaves,
        nodeSizeAttr: fullNodeWidth,
        aggregationType: variant === 'normal' ? 'leaves' : 'siblings'
      })
    }

    return calculateNodeYPosition({
      node: rootNode,
      leaves,
      nodeSizeAttr: fullNodeHeight,
      aggregationType: variant === 'normal' ? 'leaves' : 'siblings'
    })
  }, [data, fullNodeWidth, fullNodeHeight, direction, variant, nodeHeight, nodeWidth])

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
