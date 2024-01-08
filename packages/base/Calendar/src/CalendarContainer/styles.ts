import { rem } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, shadows, sizes }: Theme) =>
  createStyles({
    root: {
      padding: rem('24px'),
      color: palette.grey.darker,
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '20.5rem',
      maxWidth: '20.5rem',
      boxShadow: shadows[5],
      borderRadius: sizes.borderRadius.small,
      backgroundColor: palette.common.white,
    },
    hasFooter: {
      borderRadius: `${sizes.borderRadius.small} ${sizes.borderRadius.small} 0 0`,
    },
    flexible: {
      maxWidth: 'unset',
    },
  })
