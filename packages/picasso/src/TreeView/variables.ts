import type { DirectionsType, TreeViewVariant, Vector2 } from './types'

export const DEFAULT_VERTICAL_MARGIN_H = 10
export const DEFAULT_VERTICAL_MARGIN_V = 97
export const DEFAULT_HORIZONTAL_MARGIN_H = 59
export const DEFAULT_HORIZONTAL_MARGIN_V = 59
export const DEFAULT_WIDTH = 236
export const DEFAULT_HEIGHT = 59
export const DEFAULT_SCALE_EXTENT: [number, number] = [0.1, 5]
export const ZERO_VECTOR2: Vector2 = { x: 0, y: 0 }

export const TreeViewPropsDefaults = {
  nodeWidth: DEFAULT_WIDTH,
  nodeHeight: DEFAULT_HEIGHT,
  directionProps: {
    direction: 'vertical' as DirectionsType,
    variant: 'normal' as TreeViewVariant,
  },
}
