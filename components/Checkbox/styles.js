import { PicassoProvider } from '../Picasso'
import pallete from '../Picasso/pallete'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: '16px',
      padding: 0
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  }
}))

const root = {}
const disabled = {}

const label = {
  display: 'inline-flex',
  alignItems: 'center',

  color: pallete.text.primary,
  lineHeight: '17px',
  fontFamily: 'proxima-nova',
  fontWeight: 300,

  cursor: 'pointer',
  userSelect: 'none',

  '$disabled&': {
    cursor: 'not-allowed',
    pointerEvents: 'auto'
  }
}

const checkedIcon = {
  height: '17px',
  width: '17px',
  transition: 'all .1s ease',
  background: pallete.primary.main,
  border: `1px solid ${pallete.primary.dark}`
}

const uncheckedIcon = {
  height: '17px',
  width: '17px',
  transition: 'all .1s ease',
  background: pallete.common.white,
  border: `1px solid ${pallete.grey[50]}`,

  // hover
  '$root:hover &': {
    border: `1px solid ${pallete.primary.main}`
  },
  '$label:hover &': {
    border: `1px solid ${pallete.primary.main}`
  },
  // disabled
  '$root$disabled &': {
    border: `1px solid ${pallete.grey[50]}`
  }
}

const indeterminateIcon = {
  height: '17px',
  width: '17px',
  transition: 'all .1s ease',
  background: pallete.primary.main,
  border: `1px solid ${pallete.primary.dark}`
}

export default {
  root,
  disabled,
  label,
  checkedIcon,
  uncheckedIcon,
  indeterminateIcon
}
