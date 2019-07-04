import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ spacing: { input } }: Theme) =>
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
    }
  })
