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
      lineHeight: '1em',
      fontSize: '16px'
    }
  }
}))

export default {
  outlinedInput: {
    padding: '0.9em 2em 0.9em 0.9em'
  }
}
