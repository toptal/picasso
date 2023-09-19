import type { BreakpointKeys, ResponsiveSpacingType } from '../../config'
import { spacingToRem } from '../spacings'
import { toCssVariableName } from './to-css-variable-name'
import type { ResponsiveCssProp } from './types'

/**
 * Creates a CSS class setting the picasso responsive CSS variable of the given CSS property
 * for all breakpoints on the responsive spacing value
 */
export const createVariableValuesJss = (
  spacing: ResponsiveSpacingType,
  prop: ResponsiveCssProp
) => {
  const styles: Record<string, string> = {}

  for (const [brk, value] of Object.entries(spacing)) {
    styles[toCssVariableName(brk as BreakpointKeys, prop)] = spacingToRem(value)
  }

  return styles
}
