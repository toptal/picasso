import { PicassoProvider } from '../Picasso'
import pallete from '../Picasso/pallete'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: `${2 * pallete.unit}px`,
      lineHeight: `${2 * pallete.unit}px`,
      padding: 0,

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    },
    disabled: {
      opacity: 0.5
    }
  }
}))

export default {
  root: {
    '&:hover $uncheckedIcon': {
      border: `1px solid ${pallete.primary.main}`
    }
  },
  disabled: {
    '&:hover $uncheckedIcon': {
      border: `1px solid ${pallete.grey[50]}`
    }
  },
  checkedIcon: {
    height: `${2 * pallete.unit}px`,
    width: `${2 * pallete.unit}px`,
    transition: 'all .1s ease',
    background: pallete.primary.main,
    border: `1px solid ${pallete.primary.dark}`
  },
  uncheckedIcon: {
    height: `${2 * pallete.unit}px`,
    width: `${2 * pallete.unit}px`,
    transition: 'all .1s ease',
    background: pallete.common.white,
    border: `1px solid ${pallete.grey[50]}`
  },
  indeterminateIcon: {
    height: `${2 * pallete.unit}px`,
    width: `${2 * pallete.unit}px`,
    transition: 'all .1s ease',
    background: pallete.primary.main,
    border: `1px solid ${pallete.primary.dark}`
  }
}
