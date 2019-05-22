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

export default ({ spacing: { input }, palette }: Theme) =>
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
        paddingRight: `calc(${input.paddingRight} + 1em)`
      }
    },
    rootAuto: {},
    input: {
      fontSize: '.8125em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: `
      ${input.paddingTop}
      ${input.paddingRight}
      ${input.paddingBottom}
      ${input.paddingLeft}
    `,
      border: 'none'
    },
    select: {
      width: '100%'
    },
    icon: {
      top: 'calc(50% - 0.5em)',
      right: `calc(${input.paddingRight} - ${CARRET_ICON_LEFT_PADDING})`,
      fontSize: '1.5em',
      color: palette.grey[400],
      width: '1em'
    },
    iconDisabled: {
      color: alpha(palette.grey[400], 0.48)
    },
    placeholder: {
      opacity: 0.4
    }
  })
