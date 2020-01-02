import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      top: '0.875em',
      right: '0.875em',
      background: 'transparent',
      border: 0,
      padding: 0,

      '&:hover': {
        background: 'transparent'
      }
    }
  })
