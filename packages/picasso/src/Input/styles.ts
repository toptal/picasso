import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: palette.common.white
    },
    rootMultiline: {
      height: 'auto'
    },
    rootMultilineLimiter: {
      minHeight: '3.75rem',
      paddingBottom: '1.875rem'
    },
    inputMultilineResizable: {
      resize: 'vertical'
    },
    icon: {
      flex: '1 1 0%' // fix for IE11
    },
    limiter: {
      color: palette.grey.main2,
      fontSize: '0.625rem',
      lineHeight: '1rem'
    },
    limiterNegative: {
      color: palette.red.main
    },
    limiterMultiline: {
      position: 'absolute',
      bottom: 0,
      width: 'calc(100% - 1.25rem)',
      height: '1.25rem',
      justifyContent: 'flex-start',
      margin: 0,
      padding: '0.25rem 0',
      borderTop: `1px solid ${palette.grey.lighter2}`
    }
  })
