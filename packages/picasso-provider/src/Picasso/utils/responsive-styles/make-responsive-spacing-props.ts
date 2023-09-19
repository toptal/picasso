import cx from 'classnames'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import { mediaQueriesClasses } from './media-queries-classes'
import type { ResponsiveCssProp, ResponsiveCssSpacings } from './types'
import { getBreakpointClassNamesToUse } from './get-breakpoint-class-names-to-use'
import { generateVariableInlineStyles } from './generate-variable-inline-styles'

const makeResponsiveSpacingProps = <K extends ResponsiveCssProp>(
  props: readonly K[],
  name: string
) => {
  const useStyles = makeStyles<Theme>(
    (theme: Theme) => mediaQueriesClasses(props, theme),
    {
      name: name,
    }
  )

  const useResponsiveClassNames = (propValues: ResponsiveCssSpacings<K>) => {
    const classes = useStyles()
    const mediaQueries = getBreakpointClassNamesToUse(props, propValues)

    return {
      className: cx(...mediaQueries.map(brkClassName => classes[brkClassName])),
      style: generateVariableInlineStyles(props, propValues),
    }
  }

  return useResponsiveClassNames
}

export default makeResponsiveSpacingProps
