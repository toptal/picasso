import React, { RefObject } from 'react'
import { HierarchyPointNode } from 'd3-hierarchy'
import { ZoomBehavior } from 'd3-zoom'

export interface TreeViewContextProps {
  zoom?: ZoomBehavior<SVGSVGElement, unknown>
  ref?: SVGSVGElement
  zoomHandler?: (step: number) => void
}

export interface TreeNodeInterface {
  id: string
  selected: boolean
  selectedOffset?: {
    x?: number
    y?: number
  }
  disabled: boolean
  children?: TreeNodeInterface[]
  info: Record<string, any>
}

export type DynamicPointNode = HierarchyPointNode<TreeNodeInterface> & {
  ref: RefObject<SVGGElement>
  rect: {
    width: number
    height: number
  }
}

export type DynamicPointLink = {
  source: DynamicPointNode
  target: DynamicPointNode
}

export type DirectionsType = 'vertical' | 'horizontal'

export type Vector2 = {
  x: number
  y: number
}

export interface TreeViewPropsBase {
  /** Root node of the Tree */
  data: TreeNodeInterface
  /** Custom function for rendering Node. It expects the `node: HierarchyPointNode<TreeNodeInterface>` as an argument */
  renderNode?: (
    pointNode: HierarchyPointNode<TreeNodeInterface>
  ) => React.ReactNode
  /** exact node width in pixels. Default value is 236 */
  nodeWidth?: number
  /** exact node height in pixels. Default value is 59 */
  nodeHeight?: number
  /** Props related to tree direction */
  directionProps?: {
    /** Determines the direction of the TreeView: vertical - top-to-bottom (default) or */
    direction?: DirectionsType
    /** Overrides default vertical margin - minimum vertical distance between nodes */
    verticalMargin?: number
    /** Overrides default horizontal margin - minimum horizontal distance between nodes */
    horizontalMargin?: number
    /** Variants of the tree: currently supports normal (default) and compact - special compact variant of the tree that works only for trees with one node with children per depth level */
    variant?: TreeViewVariant
  }
}

export type TreeViewVariant = 'normal' | 'compact'
