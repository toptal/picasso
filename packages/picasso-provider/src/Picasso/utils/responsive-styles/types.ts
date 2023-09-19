import type { SpacingType } from '../../config'

export type ResponsiveCssProp = string // String for now, we can narrow it to CSS props eventually

export type ResponsiveCssSpacings<K extends ResponsiveCssProp> = {
  [k in K]: SpacingType | undefined
}
