import type { BreakpointKeys } from '@toptal/picasso-provider'

import { DEFAULT_LABEL_WIDTH_SIZE } from '../FieldsLayout'
import type {
  LabelColumnSize,
  ResponsiveLabelColumnSize,
} from '../FieldsLayout'

export const getLabelWithName = (breakpoint: BreakpointKeys) => {
  return `--form-label-width--${breakpoint}`
}

export const FORM_LABEL_WIDTH_CSS_VARIABLE = '--form-label-width'

const isLabelColumnSize = (
  labelWidth: LabelColumnSize | ResponsiveLabelColumnSize
): labelWidth is LabelColumnSize => {
  return typeof labelWidth === 'number'
}

/**
 * Generates style attribute `--form-label-width--${breakpoint}` for each breakpoint from labelWidth prop
 */
export const createLabelWidthStyles = (
  labelWidth: LabelColumnSize | ResponsiveLabelColumnSize
): Record<string, LabelColumnSize | BreakpointKeys> => {
  if (isLabelColumnSize(labelWidth)) {
    return { [FORM_LABEL_WIDTH_CSS_VARIABLE]: labelWidth }
  }

  let defaultLabelWidthSize: LabelColumnSize = DEFAULT_LABEL_WIDTH_SIZE
  const breakpoints = ['md', 'lg', 'xl'] as BreakpointKeys[]

  return breakpoints.reduce<Record<string, LabelColumnSize>>(
    (acc, breakpoint) => {
      if (labelWidth[breakpoint] !== undefined) {
        defaultLabelWidthSize = labelWidth[breakpoint]!
      }

      return {
        ...acc,
        [getLabelWithName(breakpoint)]:
          labelWidth[breakpoint] ?? defaultLabelWidthSize,
      }
    },
    {}
  )
}

export const horizontalLayoutClasses = `
  grid w-full gap-x-[32px] gap-y-0 grid-rows-[auto_auto] 
  grid-cols-[calc(4.25rem*var(--form-label-width,3))_1fr]
  [grid-template-areas:"label_input"_"hint_error"]

  xs:[--form-label-width:var(--form-label-width--xs)]
  sm:[--form-label-width:var(--form-label-width--sm)]
  md:[--form-label-width:var(--form-label-width--md)]
  lg:[--form-label-width:var(--form-label-width--lg)]
  xl:[--form-label-width:var(--form-label-width--xl)]
  `
