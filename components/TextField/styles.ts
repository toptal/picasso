import { Theme } from '@material-ui/core/styles'

import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'

export default ({ spacing: { input, inputLabel, borderWidth } }: Theme) => ({
  root: {
    fontSize: 'inherit',
    boxSizing: 'border-box' as 'border-box',
    height: input.height,
    width: input.width
  },
  rootMultiline: {
    height: 'auto',
    width: input.width
  },
  input: {
    fontSize: '1.15em',
    padding: `
      ${inputLabel.height}
      ${input.paddingLeft}
      0
      ${input.paddingRight}
    `
  },
  inputMultiline: {
    padding: `
      calc(${inputLabel.shrinkPaddingTop} + 1em * ${inputLabel.shrinkScale})
      ${input.paddingLeft}
      0
      ${input.paddingRight}
    `
  },
  label: {
    fontSize: '1.15em',

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
          ${inputLabel.shrinkPaddingTop}
        )
        scale(${inputLabel.shrinkScale})`
    },

    '&$iconStart': {
      transform: 'translate(2.77em, .3em) scale(.75)'
    }
  },
  labelShrink: {},
  iconStart: {}
})
