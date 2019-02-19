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

export default () => ({
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
    padding: '.8em .7em .73em',
    border: 'solid 1px transparent',
    height: '1em'
  },
  inputWithLabel: {
    fontSize: 'inherit',
    padding: '1.2em .7em .33em',
    border: 'solid 1px transparent',
    height: '1em'
  },
  icon: {
    right: 'calc(.7em - 10px)'
  },
  placeholder: {
    opacity: 0.4
  },
  label: {
    transform: 'translate(.7em, .9em) scale(1)',

    '&$labelShrink': {
      transform: 'translate(.7em, .3em) scale(.75)'
    }
  },
  labelShrink: {}
})
