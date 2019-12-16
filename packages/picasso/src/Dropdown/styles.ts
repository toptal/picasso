import { createStyles, Theme } from '@material-ui/core/styles'
import '../Popover/styles'

export default ({ screens, shadows, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    anchor: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    content: {
      fontSize: 'inherit',
      background: palette.common.white,
      maxHeight: `15rem`,
      overflowY: 'auto',
      boxShadow: shadows[0],
      [screens('small')]: {
        maxHeight: '15rem'
      },

      '@media screen and (max-height: 585px)': {
        maxHeight: `calc(50vh - 4.8125rem)`
      }
    },
    popper: {
      boxShadow: shadows[2]
    }
  })
