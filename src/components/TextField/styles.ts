import { Theme, createStyles } from '@material-ui/core/styles'

import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ spacing: { input, inputIcon } }: Theme) =>
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
      fontSize: '.8125em',
      border: 'none',
      padding: `
      ${input.paddingTop}
      ${input.paddingRight}
      ${input.paddingBottom}
      ${input.paddingLeft}
    `
    },
    inputMultiline: {
      padding: `
      ${input.paddingTop}
      ${input.paddingRight}
      ${input.paddingBottom}
      ${input.paddingLeft}
    `
    },
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
