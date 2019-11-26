import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ sizes: { input }, palette }: Theme) =>
  createStyles({
    root: {
      padding: input.padding
    },
    rootMultiline: {
      height: 'auto'
    },
    input: {
      fontSize: '0.8125em',
      padding: 0
    },
    icon: {
      flex: '1 1 0%' // fix for IE11
    },
    counter: {
      color: palette.grey.main,
      fontSize: '0.625em',
      lineHeight: '1em'
    },
    counterNegative: {
      color: palette.red.main
    },
    counterMultiline: {
      alignSelf: 'flex-end',
      height: '0.625em',
      marginBottom: '-0.25em'
    }
  })
