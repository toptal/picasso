import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ sizes: { input }, palette }: Theme) =>
  createStyles({
    root: {},
    rootSmall: {
      padding: '0.25rem 0.625rem'
    },
    rootMedium: {
      padding: input.padding
    },
    rootMultiline: {
      height: 'auto'
    },
    input: {
      padding: 0
    },
    icon: {
      flex: '1 1 0%' // fix for IE11
    },
    counter: {
      color: palette.grey.main,
      fontSize: '0.625rem',
      lineHeight: '1rem'
    },
    counterNegative: {
      color: palette.red.main
    },
    counterMultiline: {
      alignSelf: 'flex-end',
      height: '0.625rem',
      marginBottom: '-0.25rem'
    }
  })
