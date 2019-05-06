import { Theme, createStyles } from '@material-ui/core/styles'

import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({
  spacing: { input, inputLabel, inputIcon, borderWidth }
}: Theme) =>
  createStyles({
    root: {
      fontSize: 'inherit',
      boxSizing: 'border-box',
      height: input.height,
      padding: 0
    },
    rootMultiline: {
      height: 'auto'
    },
    rootFixedWidth: {
      width: input.width
    },
    rootFullWidth: {
      width: '100%'
    },
    input: {
      fontSize: '1.15em',
      border: 'none',
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

      '&$labelIconStart': {
        transform: `translate(
          ${input.paddingLeft + input.paddingRight + inputIcon.width}),
          ${inputLabel.shrinkPaddingTop}
        )
        scale(${inputLabel.shrinkScale})
      `
      }
    },
    labelShrink: {},
    labelIconStart: {},
    icon: {
      fontSize: '1.15em',
      minWidth: inputIcon.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '1em'
    },
    iconStart: {
      marginLeft: input.paddingLeft
    },
    iconEnd: {
      marginRight: input.paddingRight
    }
  })
