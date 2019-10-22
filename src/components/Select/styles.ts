import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import '../InputLabel/styles'
import '../InputBase/styles'
import '../OutlinedInput/styles'
import '../Menu/styles'
import '../MenuItem/styles'
import { alpha } from '../styles'

PicassoProvider.override(() => ({
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    },
    selectMenu: {
      minHeight: 'auto',
      lineHeight: '1em'
    }
  }
}))

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
    input: {
      padding: 0,
      fontSize: '0.8125em'
    },
    inputRootNative: {
      paddingLeft: input.padding
    },
    inputNative: {
      fontSize: '0.8125em',
      padding: 0,
      paddingRight: 0
    },
    inputPlaceholderDisabled: {
      color: alpha(palette.grey.main2!, 0.48)
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
