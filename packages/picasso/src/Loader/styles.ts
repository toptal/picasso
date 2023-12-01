/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    spinnerBlue: {
      color: palette.primary.main,
    },
    spinnerInherit: {
      color: 'inherit',
    },
    label: {
      marginTop: '1rem',
    },
    inline: {
      display: 'inline-flex',
    },
  })
