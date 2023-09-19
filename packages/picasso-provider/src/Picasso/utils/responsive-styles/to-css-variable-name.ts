import type { BreakpointKeys } from '../../config'
import type { ResponsiveCssProp } from './types'

export const toCssVariableName = (
  breakpoint: BreakpointKeys,
  prop: ResponsiveCssProp
) => {
  return `--picasso-responsive--${breakpoint}--${prop}`
}
