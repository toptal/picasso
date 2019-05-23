import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import '../FormControl/styles'
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

const CARRET_ICON_LEFT_PADDING = '.4em'

export default ({ spacing: { input, inputIcon }, palette }: Theme) =>
  createStyles({
    root: {
      height: input.height,
      width: input.width
    },
    rootFull: {
      width: '100%',
      display: 'flex'
    },
    rootShrink: {
      width: 'auto',
      '& $input': {
        paddingRight: `calc(${input.padding} + 1em)`
      }
    },
    rootAuto: {},
    input: {
      fontSize: '.8125em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: input.padding,
      border: 'none'
    },
    inputPlaceholder: {
      color: palette.grey[400]
    },
    inputPlaceholderDisabled: {
      color: alpha(palette.grey[400], 0.48)
    },
    select: {
      width: '100%'
    },
    caret: {
      top: 'calc(50% - 0.5em)',
      right: `calc(${input.padding} - ${CARRET_ICON_LEFT_PADDING})`,
      fontSize: '1.5em',
      color: palette.grey[400],
      width: '1em'
    },
    caretDisabled: {
      color: alpha(palette.grey[400], 0.48)
    },
    placeholder: {
      opacity: 0.4
    },
    icon: {
      color: palette.grey[400],
      fontSize: '16px',
      minWidth: inputIcon.width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '16px'
    },
    iconStart: {
      marginRight: input.padding
    },
    iconEnd: {
      marginLeft: input.padding,
      marginRight: `calc(${input.padding} + ${CARRET_ICON_LEFT_PADDING})`,
      justifyContent: 'flex-end',
      flexGrow: 1
    },
    iconDisabled: {
      color: alpha(palette.grey[400], 0.48)
    }
  })
