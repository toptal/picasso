import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: '1rem',
      lineHeight: '1rem',
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

export default ({ palette }: Theme) =>
  createStyles({
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
      color: palette.common.white,

      '&:before': {
        top: '0.5em',
        left: '0.2em',
        width: '0.3em',
        height: '0.15em',
        content: '""',
        position: 'absolute',
        transform: 'rotate(45deg)',
        background: 'white',
        borderRadius: '0.1em'
      },
      '&:after': {
        top: '0.45em',
        left: '0.3em',
        width: '0.55em',
        height: '0.15em',
        content: '""',
        position: 'absolute',
        transform: 'rotate(-45deg)',
        background: 'white',
        borderRadius: '0.1em'
      }
    },
    uncheckedIcon: {
      height: '1em',
      width: '1em',
      transition: 'all .1s ease',
      background: palette.common.white,
      border: `1px solid ${palette.grey[50]}`
    },
    indeterminateIcon: {
      position: 'relative',
      height: '1em',
      width: '1em',
      transition: 'all .1s ease',
      background: palette.primary.main,
      border: `1px solid ${palette.primary.dark}`,
      color: palette.common.white,

      '&:before': {
        content: '""',
        position: 'absolute',
        background: 'white',
        width: '0.7em',
        height: '0.2em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.1em'
      }
    }
  })
