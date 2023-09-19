import { isResponsiveSpacing } from '../../config'
import { createVariableValuesJss } from './create-variable-values-jss'
import { defaultCssProp } from './default-css-prop'
import type { ResponsiveCssSpacings } from './types'

export const generateVariableInlineStyles = <K extends string>(
  props: readonly K[],
  values: ResponsiveCssSpacings<K>
) => {
  const styles: Record<string, string> = {}

  for (const prop of props) {
    const value = values[prop]

    if (value) {
      Object.assign(
        styles,
        isResponsiveSpacing(value)
          ? createVariableValuesJss(value, prop)
          : defaultCssProp(value, prop)
      )
    }
  }

  return styles
}
