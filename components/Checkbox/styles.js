import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: '1em',
      lineHeight: '1em',
      padding: 0,
      margin: '0.25em 0.5em 0.25em 0',

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

export default ({ palette }) => ({
  root: {
    '&:hover $uncheckedIcon': {
      border: `1px solid ${palette.primary.main}`
    }
  },
  disabled: {
    '&:hover $uncheckedIcon': {
      border: `1px solid ${palette.grey[50]}`
    }
  },
  checkedIcon: {
    height: '1em',
    width: '1em',
    transition: 'all .1s ease',
    background: palette.primary.main,
    border: `1px solid ${palette.primary.dark}`,
    color: palette.common.white
  },
  uncheckedIcon: {
    height: '1em',
    width: '1em',
    transition: 'all .1s ease',
    background: palette.common.white,
    border: `1px solid ${palette.grey[50]}`
  },
  indeterminateIcon: {
    height: '1em',
    width: '1em',
    transition: 'all .1s ease',
    background: palette.primary.main,
    border: `1px solid ${palette.primary.dark}`,
    color: palette.common.white
  }
})
