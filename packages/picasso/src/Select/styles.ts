import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

import '../InputLabel/styles'
import '../InputBase/styles'
import '../Input/styles'
import '../Menu/styles'
import '../MenuItem/styles'
import '../Loader/styles'

export default ({ palette, zIndex }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'inline-flex'
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    selectWrapper: {
      padding: 0
    },
    select: {
      width: '100%',
      zIndex: 1,
      fontSize: '0.8125em',

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
      paddingRight: 'calc(0.625em + 1em)'
    },
    inputMultiple: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    placeholder: {
      color: palette.grey.main2
    },
    caret: {
      position: 'absolute',
      top: 'calc(50% - 0.5em)',
      // in specs right spacing is defined relative to 6px icon width, while we use 16px
      // so 5px are left instead of 10px when we use wider icon.
      right: '0.3125em',
      color: palette.grey.dark,
      fontSize: '1em'
    },
    caretDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    popper: {
      zIndex: zIndex.modal
    },
    nativeStartAdornment: {
      position: 'absolute',
      left: '0.625em'
    },
    nativeEndAdornment: {
      position: 'absolute',
      right: '1.625em'
    },
    nativeStartAdornmentPadding: {
      paddingLeft: '2.5625em'
    },
    nativeEndAdornmentPadding: {
      paddingRight: '3.5625em'
    }
  })
