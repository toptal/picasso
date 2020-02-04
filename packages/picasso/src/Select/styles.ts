import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

import '../InputLabel/styles'
import '../InputBase/styles'
import '../Input/styles'
import '../Menu/styles'
import '../MenuItem/styles'
import '../Loader/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'inline-flex',
      fontSize: '1rem'
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    select: {
      width: '100%',
      zIndex: 1,
      padding: '0.625rem',

      '&:focus': {
        backgroundColor: 'inherit'
      }
    },
    inputWrapper: {
      width: 'inherit',
      outline: 0
    },
    input: {
      zIndex: 1,
      paddingRight: 'calc(0.625rem + 1rem)'
    },
    readOnlyInput: {
      cursor: 'pointer'
    },
    nativeInput: {
      padding: 0
    },
    placeholder: {
      color: palette.grey.main2
    },
    caret: {
      position: 'absolute',
      top: 'calc(50% - 0.5rem)',
      // in specs right spacing is defined relative to 6px icon width, while we use 16px
      // so 5px are left instead of 10px when we use wider icon.
      right: '0.3125rem',
      color: palette.grey.dark,
      fontSize: '1rem'
    },
    caretDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    nativeStartAdornment: {
      position: 'absolute',
      left: '0.625rem'
    },
    nativeEndAdornment: {
      position: 'absolute',
      right: '1.625rem'
    },
    nativeStartAdornmentPadding: {
      paddingLeft: '2.5625rem'
    },
    nativeEndAdornmentPadding: {
      paddingRight: '3.5625rem'
    }
  })
