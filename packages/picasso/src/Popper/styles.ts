/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ zIndex, screens }: Theme) =>
  createStyles({
    root: {
      zIndex: zIndex.modal,
      [screens('xs', 'sm')]: {
        width: '100vw',
        maxWidth: '100vw',
        padding: 0,
        margin: 0,
      },
      '&[x-out-of-boundaries]': {
        display: 'none',
      },
    },
  })
