import { HierarchyPointNode } from 'd3-hierarchy'
import { RefObject } from 'react'
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
  ref: RefObject<HTMLElement>
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

export type TreeViewVariant = 'normal' | 'compact'
