/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fill: palette.primary.main,
    },
  })
