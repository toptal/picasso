import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    group: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      pointerEvents: 'unset',

      '&:not(:last-child):not(:empty)::after': {
        content: '""',
        height: '1em',
        width: '1px',
        position: 'relative',
        marginLeft: '0.5em',
        marginRight: '0.5em',
        backgroundColor: palette.grey.lighter2,
      },
    },
  })
