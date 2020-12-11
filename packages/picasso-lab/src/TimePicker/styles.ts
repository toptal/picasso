import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      cursor: 'default'
    },
    icon: {
      background: palette.common.white,
      position: 'absolute',
      right: '0.625rem',
      pointerEvents: 'none',
      margin: 0,
      userSelect: 'none'
    },
    inputBase: {
      marginRight: '-8px', // override default margin for icon position

      // override styles for native 'clock' icon for type='time'
      '&::-webkit-calendar-picker-indicator': {
        outline: 'none',
        cursor: 'pointer'
      }
    },
    inputMask: {
      fontSize: '0.8125rem',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none'
    }
  })
