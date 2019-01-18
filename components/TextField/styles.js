import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'

export default {
  TextField: {
    iconStart: {
      transform: 'translate(2.8em, 1em) scale(1)',
      '&$shrink': {
        transform: 'translate(2.8em, 0.6em) scale(.75)'
      }
    },
    shrink: {}
  }
}
