import type { Theme } from '@material-ui/core/styles'

import { createJssVariableClassNames } from './create-jss-variable-class-names'
import type { ResponsiveCssProp } from './types'

/**
 * Creates a CSS class for *every* breakpoint and a given CSS property
 * containing a media query for that breakpoint and sets the value of the CSS property
 * to the value of the CSS variable for that breakpoint and CSS property.
 *
 * Simplified example, for `margin-top` CSS property and `xs` breakpoint:
 * ```css
 * @media (min-width: 0px) {
 *   .xs--margin-top {
 *     margin-top: var(--picasso-responsive--xs--margin-top);
 *   }
 * }
 * ```
 */
export const createMediaQueries = (
  cssProp: ResponsiveCssProp,
  theme: Theme
) => {
  const mediaQueries: Record<string, {}> = {}

  for (const breakpoint of [...theme.breakpoints.keys].reverse()) {
    mediaQueries[theme.breakpoints.up(breakpoint)] =
      createJssVariableClassNames(breakpoint, cssProp)
  }

  return mediaQueries
}
