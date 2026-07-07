import cx from 'classnames'

import { generateVariableInlineStyles } from './generate-variable-inline-styles'
import { getBreakpointClassNamesToUse } from './get-breakpoint-class-names-to-use'
import { injectResponsiveStyles } from './inject-responsive-styles'
import type { ResponsiveCssProp, ResponsiveCssSpacings } from './types'

const makeResponsiveSpacingProps = <K extends ResponsiveCssProp>(
  props: readonly K[],
  name: string
) => {
  const useResponsiveClassNames = (propValues: ResponsiveCssSpacings<K>) => {
    // Inject the media-query stylesheet on first use (client-only, idempotent),
    // during render so the classes' CSS is present synchronously.
    injectResponsiveStyles(props, name)

    const classNames = getBreakpointClassNamesToUse(props, propValues)

    return {
      className: cx(...classNames.map(className => `${name}-${className}`)),
      style: generateVariableInlineStyles(props, propValues),
    }
  }

  return useResponsiveClassNames
}

export default makeResponsiveSpacingProps
