/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    indicators: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '1.3em',
      position: 'absolute',
      bottom: '0.375rem',
    },
    indicated: {
      content: '""',
      height: '0.25rem',
      width: '0.25rem',
      borderRadius: '50%',
      background: palette.yellow.main,
    },
    today: {
      height: '0.25rem',
      width: '0.25rem',
      borderRadius: '50%',
      background: palette.blue.main,
    },
    selected: {
      background: palette.common.white,
    },
  })
