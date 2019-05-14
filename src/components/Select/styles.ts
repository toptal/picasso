import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import '../FormControl/styles'
import '../InputLabel/styles'
import '../InputBase/styles'
import '../OutlinedInput/styles'
import '../Menu/styles'
import '../MenuItem/styles'

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

export default ({ shape: { borderWidth, input, inputLabel } }: Theme) =>
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
      fontSize: '1.15em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: `
      0
      ${input.paddingLeft}
      0
      ${input.paddingRight}
    `,
      border: 'none'
    },
    select: {
      width: '100%'
    },
    inputWithLabel: {
      fontSize: '1.15em',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '100%',
      padding: `
      ${inputLabel.height}
      ${input.paddingLeft}
      0
      ${input.paddingRight}
    `,
      border: `solid ${borderWidth} transparent`
    },
    icon: {
      top: 'calc(50% - 0.5em)',
      right: `calc(${input.paddingRight} - ${CARRET_ICON_LEFT_PADDING})`,
      fontSize: '1.5em',
      color: 'inherit',
      width: '1em'
    },
    placeholder: {
      opacity: 0.4
    },
    label: {
      fontSize: '1.15em',

      transform: `
      translate(
        calc(${input.paddingLeft} + ${borderWidth}),
        calc(${input.paddingTop} + ${borderWidth})
      )
      scale(1)`,

      '&$labelShrink': {
        transform: `
        translate(
          calc(${input.paddingLeft} + ${borderWidth}),
          ${inputLabel.shrinkPaddingTop}
        )
        scale(${inputLabel.shrinkScale})`
      }
    },
    labelShrink: {}
  })
