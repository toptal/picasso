/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
import { listStyleTypes } from '@toptal/picasso-list-item/styles'
import { palette } from '@toptal/picasso-utils'

export default ({ typography }: Theme) =>
  createStyles({
    root: {
      fontSize: typography.fontSizes.medium,
      color: palette.common.black,
      marginTop: rem(4),
      paddingLeft: rem(16),
    },
    unordered: {
      paddingLeft: rem(24),
    },
    firstLevel: {
      paddingLeft: rem(16),
    },
    ...listStyleTypes,
  })
