/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      color: palette.grey.dark,
      padding: '0.75rem 1rem',
      borderTop: `${sizes.borderWidth} solid ${palette.grey.light}`,
      fontSize: '0.6875rem',
    },
  })
