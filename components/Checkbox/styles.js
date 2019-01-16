import { PicassoProvider } from '../Picasso'
import pallete from '../Picasso/pallete'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: '16px',
      padding: 0
    },
    disabled: {
      opacity: 0.5
    }
  }
}))

const label = {
  display: 'inline-flex',
  alignItems: 'center',

  color: pallete.text.primary,
  lineHeight: '17px',
  fontFamily: 'proxima-nova',
  fontWeight: 300,

  cursor: 'pointer',
  userSelect: 'none'
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
  border: `1px solid ${pallete.grey[50]}`
}

const indeterminateIcon = {
  height: '17px',
  width: '17px',
  transition: 'all .1s ease',
  background: pallete.primary.main,
  border: `1px solid ${pallete.primary.dark}`
}

export default {
  label,
  checkedIcon,
  uncheckedIcon,
  indeterminateIcon
}
