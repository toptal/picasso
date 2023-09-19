import type { BreakpointKeys } from '../../config'
import { isResponsiveSpacing } from '../../config'
import { toClassName } from './to-class-name'
import type { ResponsiveCssSpacings } from './types'

/**
 * Filter which media queries CSS classes should be applied,
 * we want to the element to fallback to the previous layer, so we only apply
 * the media queries that are explicitly set on spacing value
 */
export const getBreakpointClassNamesToUse = <K extends string>(
  props: readonly K[],
  propSizes: ResponsiveCssSpacings<K>
) => {
  const classNames = new Set<string>()

  for (const prop of props) {
    const spacing = propSizes[prop]

    if (spacing && isResponsiveSpacing(spacing)) {
      Object.keys(spacing)
        .map(brk => toClassName(brk as BreakpointKeys, prop))
        .forEach(classNames.add, classNames)
    }
  }

  return [...classNames]
}
