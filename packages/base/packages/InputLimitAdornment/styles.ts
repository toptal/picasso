/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    limiterLabel: {
      color: palette.grey.main2,
      fontSize: '0.625rem',
      lineHeight: '1rem',
    },
    limiterLabelError: {
      color: palette.red.main,
    },
  })
