import type { Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'
import type { BreakpointKeys } from '@toptal/picasso-provider'

export const toCssVariable = (breakpoint: BreakpointKeys) =>
  `var(--form-label-width--${breakpoint})`

export const toClassName = (breakpoint: BreakpointKeys) =>
  `form-label-width--${breakpoint}`

export const FORM_LABEL_WIDTH_CSS_VARIABLE = '--form-label-width'

const createBreakpointsForLabelWidth = (theme: Theme) =>
  [...theme.breakpoints.keys].reverse().reduce(
    (acc, breakpoint) => ({
      ...acc,
      [theme.breakpoints.up(breakpoint)]: {
        [toClassName(breakpoint)]: {
          [FORM_LABEL_WIDTH_CSS_VARIABLE]: toCssVariable(breakpoint),
        },
      },
    }),
    {}
  )

export default (theme: Theme) =>
  createStyles({
    ...createBreakpointsForLabelWidth(theme),
  })
