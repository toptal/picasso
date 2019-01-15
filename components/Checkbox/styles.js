/* eslint-disable no-unused-vars */
import color from 'color'

import { PicassoProvider } from '../Picasso'

const checkedIcon = {
  color: '#fff',
  opacity: 1,
  textAlign: 'center',
  height: '17px',
  width: '17px',
  transition: 'all .1s ease',
  background: '#204ecf',
  border: '1px solid #d4d4d5',
  borderColor: 'rgba(34, 36, 38, .35)',
  borderRadius: '0'
}

PicassoProvider.override(({ pallete }) => ({}))

export default {
  Checkbox: {
    root: {
      fontSize: '16px',
      padding: 0
    },
    colorSecondary: {
      color: '#d4d4d5',
      borderColor: '1px solid #d4d4d5',

      '&$checked': {
        color: '#fff',
        borderColor: 'rgba(34, 36, 38, .35)'
      }
    },
    checked: {}
  }
}
