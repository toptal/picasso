import { Theme, createStyles } from '@material-ui/core/styles'

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
      fontSize: '1rem',
      cursor: 'pointer'
    },
    rootFull: {
      width: '100%'
    },
    rootShrink: {
      width: 'auto'
    },
    rootAuto: {},
    rootDisabled: {
      cursor: 'default'
    },
    select: {
      width: '100%',
      padding: '0.5rem',

      '&:focus': {
        backgroundColor: 'inherit'
      }
    },
    inputWrapper: {
      width: 'inherit',
      outline: 0
    },
    outlinedInput: {
      paddingRight: '1.625rem'
    },
    searchOutlinedInput: {
      width: '100%'
    },
    searchInputIcon: {
      marginRight: '0.5rem'
    },
    nativeInput: {
      padding: 0
    },
    placeholder: {
      color: palette.grey.main2
    }
  })
