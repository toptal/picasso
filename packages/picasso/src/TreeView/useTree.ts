import { useMemo } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates

import { useNodes } from './useNodes'
import {
  DirectionsType,
  DynamicPointLink,
  DynamicPointNode,
  TreeNodeInterface,
  TreeViewVariant
} from './types'

export interface UseTreeArguments {
  data: TreeNodeInterface
  nodeWidth: number
  nodeHeight: number
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
      const siblingWithChildren: d3.HierarchyPointNode<TreeNodeInterface> =
        siblings[indexWithChildren]

      position =
        siblingWithChildren[coordinateType] +
        (index - indexWithChildren) * nodeSizeAttr
    } else {
      const closeSiblingIndex = Math.floor(index - siblings.length / 2)

      position =
        siblings.length % 2
          ? closeSiblingIndex * nodeSizeAttr
          : closeSiblingIndex * nodeSizeAttr - nodeSizeAttr / 2
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

      return acc + child[coordinateType]
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

  node.children.forEach(child => {
    if (!child.children) {
      calculateNodePosition({ ...options, node: child })
    }
  })

  const halfLength = node.children.length / 2

  if (node.children.length % 2) {
    position = node.children[Math.floor(halfLength)][coordinateType]
  } else {
    const middleChild: d3.HierarchyPointNode<TreeNodeInterface> =
      node.children[halfLength]
    const previousToMiddleChild: d3.HierarchyPointNode<TreeNodeInterface> =
      node.children[halfLength - 1]

    position =
      (middleChild[coordinateType] + previousToMiddleChild[coordinateType]) / 2
  }

  return position
}

const getCalculateNodePositionFn = (coordinateType: CoordinateType) => {
  const calculateNodePosition = (options: CalculateNodePositionOptions) => {
    const { node, aggregationType } = options
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
  nodeWidth,
  nodeHeight,
  direction,
  verticalMargin,
  horizontalMargin,
  variant
}: UseTreeArguments): UseTreeResponse => {
  const rootNode = useMemo(
    () =>
      positionTreeNodes({
        data,
        direction,
        nodeHeight,
        nodeWidth,
        horizontalMargin,
        verticalMargin,
        variant
      }),
    [
      data,
      direction,
      nodeHeight,
      nodeWidth,
      verticalMargin,
      horizontalMargin,
      variant
    ]
  )

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

const positionTreeNodes = ({
  data,
  direction,
  nodeHeight,
  nodeWidth,
  horizontalMargin,
  verticalMargin,
  variant
}: Required<UseTreeArguments>) => {
  const root = d3.hierarchy(data)
  const fullNodeWidth = nodeWidth + 2 * horizontalMargin
  const fullNodeHeight = nodeHeight + 2 * verticalMargin

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
}
