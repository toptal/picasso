import { PicassoProvider } from '../Picasso'

import '../InputBase/styles'
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
    width: '14em'
  },
  rootWithLabel: {
    marginTop: '1.2em'
  },
  input: {
    fontSize: 'inherit',
    padding: '.9em .7em .67em'
  },
  placeholder: {
    opacity: 0.4
  },
  label: {
    '&$labelShrink': {
      transform: 'translate(0, 0) scale(.75)'
    }
  },
  labelShrink: {}
})
