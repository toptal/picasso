import { PicassoProvider } from '../Picasso'
import pallete from '../Picasso/pallete'

const unit = 8

PicassoProvider.override(() => ({
  MuiFormControlLabel: {
    root: {
      fontSize: `${2 * unit}px`,
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',

      color: pallete.text.primary,
      lineHeight: `${2 * unit}px`,
      fontFamily: 'proxima-nova',
      fontWeight: 300,
      fontSize: '1em',
      marginLeft: '0.5em',

      cursor: 'pointer',
      userSelect: 'none',

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    }
  },
  MuiCheckbox: {
    root: {
      fontSize: `${2 * unit}px`,
      lineHeight: `${2 * unit}px`,
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

const root = {
  '&:hover $uncheckedIcon': {
    border: `1px solid ${pallete.primary.main}`
  }
}

const disabled = {
  '&:hover $uncheckedIcon': {
    border: `1px solid ${pallete.grey[50]}`
  }
}

const checkedIcon = {
  height: `${2 * unit}px`,
  width: `${2 * unit}px`,
  transition: 'all .1s ease',
  background: pallete.primary.main,
  border: `1px solid ${pallete.primary.dark}`
}

const uncheckedIcon = {
  height: `${2 * unit}px`,
  width: `${2 * unit}px`,
  transition: 'all .1s ease',
  background: pallete.common.white,
  border: `1px solid ${pallete.grey[50]}`
}

const indeterminateIcon = {
  height: `${2 * unit}px`,
  width: `${2 * unit}px`,
  transition: 'all .1s ease',
  background: pallete.primary.main,
  border: `1px solid ${pallete.primary.dark}`
}

export default {
  root,
  disabled,
  checkedIcon,
  uncheckedIcon,
  indeterminateIcon
}
