import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'

export default {
  input: {
    fontSize: '18px',
    padding: '1.2em .7em .2em'
  },
  label: {
    transform: 'translate(.7em, .9em) scale(1)',

    '&$labelShrink': {
      transform: 'translate(.7em, .3em) scale(.75)'
    },

    '&$iconStart': {
      transform: 'translate(2.77em, .3em) scale(.75)'
    }
  },
  labelShrink: {},
  iconStart: {}
}
