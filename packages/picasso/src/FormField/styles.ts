import { createStyles } from '@material-ui/core/styles'
import type { BreakpointKeys } from '@toptal/picasso-provider'
import type { Theme } from '@material-ui/core'

import type { LabelSpacing, ResponsiveLabelSpacing } from '../FieldsLayout'

export const getLabelWithName = (breakpoint: BreakpointKeys) => {
  return `--form-label-width--${breakpoint}`
}

export const HORISONTAL_LABEL_COLUMN_WIDTH = '17rem'
export const FORM_LABEL_WIDTH_CSS_VARIABLE = '--form-label-width'
export const DEFAULT_LABEL_WIDTH_VALUE: LabelSpacing = 3

/**
 * Generates CSS variables for each breakpoint to set --form-label-width
 */
export const createBreakpointsForLabelWidth = (theme: Theme) =>
  [...theme.breakpoints.keys].reduce(
    (acc, breakpoint) => ({
      ...acc,
      [theme.breakpoints.up(breakpoint)]: {
        [FORM_LABEL_WIDTH_CSS_VARIABLE]: `var(${getLabelWithName(breakpoint)})`,
      },
    }),
    {}
  )

const isLabelSpacing = (
  labelWidth: LabelSpacing | ResponsiveLabelSpacing
): labelWidth is LabelSpacing => {
  return typeof labelWidth === 'number'
}

/**
 * Generates style attribute `--form-label-width--${breakpoint}` for each breakpoint from labelWidth prop
 */
export const createLabelWidthStyles = (
  labelWidth: LabelSpacing | ResponsiveLabelSpacing
): Record<string, LabelSpacing | BreakpointKeys> => {
  if (isLabelSpacing(labelWidth)) {
    return { [FORM_LABEL_WIDTH_CSS_VARIABLE]: labelWidth }
  }

  return (Object.keys(labelWidth) as BreakpointKeys[]).reduce(
    (acc, breakpoint) => ({
      ...acc,
      [getLabelWithName(breakpoint)]: labelWidth[breakpoint],
    }),
    {}
  )
}

export const createStylesForHorizontalLayout = (theme: Theme) => {
  return {
    display: 'grid',
    // --form-label-width is passed down from cascading style, in this case from Form
    '--label-width': `calc(${HORISONTAL_LABEL_COLUMN_WIDTH} / 4 * var(${FORM_LABEL_WIDTH_CSS_VARIABLE}, ${DEFAULT_LABEL_WIDTH_VALUE}))`,
    gridTemplateColumns: `var(--label-width) 1fr`,
    gap: '0 32px', // 0 and lg, respectively
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
        "label input"
        "hint error"
      `,
    width: '100%',

    // create media queries for each breakpoint to set --form-label-width
    ...createBreakpointsForLabelWidth(theme),
  }
}

export default (theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'start',
      fontSize: '1rem',

      '& + &': {
        marginTop: '1em',
      },
      '& $error + $hint': {
        marginTop: 0,
      },
    },

    adornment: {
      position: 'relative',
      paddingRight: '2rem',
    },
    autoSaveIndicator: {
      position: 'absolute',
      top: 0,
      right: 0,

      '&$hasMultilineCounter': {
        top: '-0.875rem',
      },
    },

    horizontalLayout: createStylesForHorizontalLayout(theme),

    horizontalLayoutAdornment: {
      gridArea: 'error',
    },

    // These classes might still be used in selectors
    hasMultilineCounter: {},
    hint: {},
    error: {},
  })
