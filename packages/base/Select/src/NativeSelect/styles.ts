import type { Theme } from '@material-ui/core/styles'
// eslint-disable-next-line import/order
import { createStyles } from '@material-ui/core/styles'

import '../InputLabel/styles'
import '../InputBase/styles'
import '../Input/styles'
import '../Loader/styles'
import { highlightStyles as highlightAutofillStyles } from '@toptal/picasso-input'

export default (theme: Theme) => {
  const { palette } = theme

  return createStyles({
    root: {
      position: 'relative',
      display: 'inline-flex',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    rootFull: {
      width: '100%',
    },
    rootShrink: {
      width: 'auto',
    },
    rootAuto: {},
    rootDisabled: {
      cursor: 'default',
    },
    select: {
      width: '100%',
      padding: '0.5rem',

      '&:focus': {
        backgroundColor: 'inherit',
      },
    },
    nativeInput: {
      padding: 0,
      backgroundColor: palette.common.white,
    },
    placeholder: {
      color: palette.grey.main2,
    },
    startAdornment: {
      position: 'absolute',
      left: '0.625rem',
    },
    endAdornment: {
      position: 'absolute',
      right: '1.625rem',
    },
    startAdornmentPadding: {
      paddingLeft: '2.5625rem',
    },
    endAdornmentPadding: {
      paddingRight: '3.5625rem',
    },
    ...highlightAutofillStyles(theme),
  })
}
