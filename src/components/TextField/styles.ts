import { Theme, createStyles } from '@material-ui/core/styles'

import '../FormControl/styles'
import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ spacing: { input, inputIcon } }: Theme) =>
  createStyles({
    root: {
      padding: input.padding
    },
    rootMultiline: {
      height: 'auto'
    },
    rootFullWidth: {
      width: '100%'
    },
    input: {
      fontSize: '0.8125em',
      padding: 0
    },
    icon: {
      fontSize: '1em',
      minWidth: inputIcon.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '1em'
    },
    iconStart: {
      marginRight: '0.5em'
    },
    iconEnd: {
      marginLeft: '0.5em'
    }
  })
