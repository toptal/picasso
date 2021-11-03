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

    xxsmall: { fontSize: '1em' },
    xsmall: { fontSize: '1em' },
    small: { fontSize: '2em' },
    medium: { fontSize: '3em' },
    large: { fontSize: '5em' },

    smallFont: {
      fontSize: '0.666666667em'
    },
    largeFont: {
      fontSize: '1em'
    }
  })
