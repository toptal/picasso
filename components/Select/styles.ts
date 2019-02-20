import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import '../FormControl/styles'
import '../InputLabel/styles'
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
  rootFullWidth: {
    width: 'auto',
    display: 'flex',
    wrap: 'nowrap'
  },
  root: {
    width: '14em',
    fontSize: '18px'
  },
  input: {
    fontSize: 'inherit',
    padding: `
      ${input.paddingTop}
      ${input.paddingLeft}
      ${input.paddingBottom}
      ${input.paddingRight}
    `,
    border: `solid ${borderWidth} transparent`,
    height: '1em'
  },
  inputWithLabel: {
    fontSize: 'inherit',
    padding: `
      calc(${input.paddingTop} + ${inputLabel.height})
      ${input.paddingLeft}
      calc(${input.paddingBottom} - ${inputLabel.height})
      ${input.paddingRight}
    `,
    border: `solid ${borderWidth} transparent`,
    height: '1em'
  },
  icon: {
    right: `calc(${input.paddingRight} - ${CARRET_ICON_LEFT_PADDING})`
  },
  placeholder: {
    opacity: 0.4
  },
  label: {
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
          .3em
        )
        scale(.75)`
    }
  },
  labelShrink: {}
})
