import type { BreakpointKeys } from '../../config'
import { toClassName } from './to-class-name'
import { toCssVariableName } from './to-css-variable-name'
import type { ResponsiveCssProp } from './types'

/**
 * Creates a CSS class for a given breakpoint and CSS property
 * that sets the value of the CSS property to the value of the CSS variable
 * for that breakpoint and CSS property.
 *
 * Simplified example, for `margin-top` CSS property and `xs` breakpoint:
 * ```css
 * .xs--margin-top {
 *    margin-top: var(--picasso-responsive--xs--margin-top);
 * }
 * ```
 */
export const createJssVariableClassNames = (
  breakpoint: BreakpointKeys,
  cssProp: ResponsiveCssProp
) => {
  const className = toClassName(breakpoint, cssProp)
  const variable = `var(${toCssVariableName(breakpoint, cssProp)})`

  return {
    [className]: {
      [cssProp]: variable,
    },
  }
}
