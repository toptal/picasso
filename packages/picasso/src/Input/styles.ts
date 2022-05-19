import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: palette.common.white,
      cursor: 'text'
    },
    rootMultiline: {
      height: 'auto'
    },
    rootMultilineLimiter: {
      minHeight: '3.75rem',
      paddingBottom: '1.875rem'
    },
    rootMultilineResizable: {
      resize: 'vertical',
      overflow: 'hidden',
      '&::-webkit-resizer': {
        backgroundSize: '0.5rem 0.5rem',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyB2aWV3Qm94PScwIDAgOCA4JyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgY2xpcC1ydWxlPSdldmVub2RkJyBkPSdNNi42NDYzNiAwLjY0NjQ4NEw3LjM1MzQ3IDEuMzUzNTlMMS4zNTM0NyA3LjM1MzU5TDAuNjQ2MzYyIDYuNjQ2NDhMNi42NDYzNiAwLjY0NjQ4NFpNNy4zNTM0NyA0LjM1MzU5TDQuMzUzNDcgNy4zNTM1OUwzLjY0NjM2IDYuNjQ2NDhMNi42NDYzNiAzLjY0NjQ4TDcuMzUzNDcgNC4zNTM1OVonIGZpbGw9JyNEOEQ5REMnLz48L3N2Zz4=")`
      }
    },
    inputMultilineResizable: {
      height: '100% !important'
    }
  })
