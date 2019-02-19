import { Theme } from '@material-ui/core/styles'

import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'

export default ({ spacing: { input, inputLabel, borderWidth } }: Theme) => ({
  input: {
    fontSize: '18px',
    padding: `
      calc(${input.paddingTop} + ${inputLabel.height})
      ${input.paddingLeft}
      calc(${input.paddingBottom} - ${inputLabel.height})
      ${input.paddingRight}
    `,
    height: '1em'
  },
  label: {
    transform: `
      translate(
        calc(${input.paddingLeft} + ${borderWidth}),
        calc(${input.paddingTop} + ${borderWidth})
      )
      scale(1)`,

    '&$labelShrink': {
      transform: `
        translate(
          calc(${input.paddingLeft} + ${borderWidth}),
          .3em
        )
        scale(.75)`
    },

    '&$iconStart': {
      transform: 'translate(2.77em, .3em) scale(.75)'
    }
  },
  labelShrink: {},
  iconStart: {}
})
