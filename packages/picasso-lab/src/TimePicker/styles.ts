import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    icon: {
      background: palette.common.white,
      position: 'absolute',
      right: '0.625rem',
      pointerEvents: 'none',
      margin: 0
    },
    inputBase: {
      marginRight: -8 // override default margin for icon position
    },
    input: {
      ' & input[type="time"]::-webkit-calendar-picker-indicator': {
        background: 'none'
      }
    }
  })
