import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import '../FormControl/styles'
import '../InputLabel/styles'
import '../InputBase/styles'
import '../OutlinedInput/styles'
import '../MenuItem/styles'
import '../List/styles'

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

export default ({ spacing: { borderWidth, input, inputLabel } }: Theme) => ({
  root: {
    height: input.height,
    width: input.width
  },
  rootFullWidth: {
    height: input.height,
    width: '100%',
    display: 'flex'
  },
  input: {
    fontSize: '1.15em',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box' as 'border-box',
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
    boxSizing: 'border-box' as 'border-box',
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
    color: 'inherit'
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
