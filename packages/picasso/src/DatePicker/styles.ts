import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared/styles'

export default ({ palette, shadows, sizes }: Theme) =>
  createStyles({
    calendar: {
      outline: 'none',
    },
    footer: {
      backgroundColor: palette.grey.lightest,
      boxShadow: shadows[5],
      borderRadius: `0 0 ${sizes.borderRadius.small} ${sizes.borderRadius.small}`,
      padding: '0.625rem 1.187rem',
      width: '20.5rem',
    },
    calendarContainer: {
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
