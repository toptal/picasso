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
      marginRight: '-8px' // override default margin for icon position
    },
    inputMask: {
      fontSize: '0.8125rem',
      border: 'none',
      padding: '0',
      margin: '0',
      outline: 'none'
    }
  })
