import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    root: {
      textTransform: 'uppercase',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    small: {
      fontSize: '0.85em'
    },
    large: {
      fontSize: '1em'
    }
  })
