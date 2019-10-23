import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputLabel/styles'
import '../InputBase/styles'
import '../Input/styles'
import '../Menu/styles'
import '../MenuItem/styles'
import { alpha } from '../styles'

export default ({ sizes: { input }, palette, zIndex }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: input.width
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    inputRootNative: {
      paddingLeft: input.padding
    },
    inputReadOnly: {
      '&:hover, & input:hover': {
        cursor: 'pointer'
      }
    },
    inputNative: {
      fontSize: '0.8125em',
      padding: 0,
      paddingRight: 0
    },
    select: {
      width: '100%'
    },
    caret: {
      // in specs right spacing is defined relative to 6px icon width, while we use 16px
      // so 5px are left instead of 10px when we use wider icon. Also, should compensate
      // 14px of endAdornment padding
      marginRight: '-0.5625em',
      color: palette.grey.dark,
      fontSize: '1em'
    },
    caretDisabled: {
      color: alpha(palette.grey.dark!, 0.48)
    },
    popper: {
      zIndex: zIndex.modal
    }
  })
