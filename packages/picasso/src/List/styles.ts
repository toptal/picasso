import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { listStyleTypes } from '../ListItem/styles'
import { palette } from '../utils'

export default ({ typography }: Theme) =>
  createStyles({
    root: {
      fontSize: typography.fontSizes.medium,
      color: palette.common.black,
      marginTop: '4px',
      paddingLeft: '16px',
    },
    unordered: {
      paddingLeft: '24px',
    },
    firstLevel: {
      paddingLeft: '16px',
    },
    ...listStyleTypes,
  })
