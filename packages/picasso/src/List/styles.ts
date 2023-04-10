import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { em, fromPx } from '@toptal/picasso-shared'

import { listStyleTypes } from '../ListItem/styles'
import { palette } from '../utils'

export default ({ typography }: Theme) => {
  const toEmUnit = (px: number) => em(px, fromPx(typography.fontSizes.medium))

  return createStyles({
    root: {
      fontSize: typography.fontSizes.medium,
      color: palette.common.black,
      marginTop: toEmUnit(4),
      paddingLeft: toEmUnit(16),
    },
    unordered: {
      paddingLeft: toEmUnit(24),
    },
    firstLevel: {
      paddingLeft: toEmUnit(16),
    },
    ...listStyleTypes,
  })
}
