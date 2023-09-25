import type { BreakpointKeys } from '../../config'
import type { ResponsiveCssProp } from './types'

export const toClassName = (
  breakpoint: BreakpointKeys,
  prop: ResponsiveCssProp
) => {
  return `${breakpoint}--${prop}`
}
