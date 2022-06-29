import { createStyles, Theme } from '@material-ui/core/styles'

import { rem } from '~/packages/shared/src'

export default ({ palette, shadows }: Theme) =>
  createStyles({
    calendar: {
      outline: 'none',
    },
    footer: {
      marginTop: '-0.09rem',
      backgroundColor: palette.grey.lightest,
      boxShadow: shadows[5],
      borderRadius: '0 0 4px 4px',
      color: palette.grey.dark,
      fontSize: rem('13px'),
      padding: '0.625rem 1.187rem',
      width: '20.5rem',
    },
  })
