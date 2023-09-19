import type { Theme } from '@material-ui/core'

import type { ResponsiveCssProp } from './types'
import { createMediaQueries } from './create-media-queries'

/**
 * Just aggregate all the media queries classes
 * for all responsive props passed
 */
export const mediaQueriesClasses = <K extends ResponsiveCssProp>(
  responsiveProps: readonly K[],
  theme: Theme
) => {
  const mediaQueries: Record<string, Record<string, string>> = {}

  for (const prop of responsiveProps) {
    const newMediaQueries = createMediaQueries(prop, theme)

    for (const [brk, value] of Object.entries(newMediaQueries)) {
      mediaQueries[brk] = {
        ...mediaQueries[brk],
        ...value,
      }
    }
  }

  return mediaQueries
}
