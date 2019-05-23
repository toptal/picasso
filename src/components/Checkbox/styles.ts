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
      opacity: 0.32
    }
  }
}))

export default ({ palette, spacing, transitions }: Theme) =>
  createStyles({
    root: {
      '&:hover $uncheckedIcon': {
        border: `${spacing.borderWidth} solid ${palette.primary.main}`
      }
    },
    disabled: {
      '&:hover $uncheckedIcon': {
        border: `${spacing.borderWidth} solid ${palette.grey[200]}`
      }
    },
    checkedIcon: {
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${
        transitions.easing.easeInOut
      }`,
      background: palette.primary.main,
      border: `${spacing.borderWidth} solid ${palette.primary.main}`,
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
      transition: `all ${transitions.duration.short}ms ${
        transitions.easing.easeInOut
      }`,
      background: palette.common.white,
      border: `${spacing.borderWidth} solid ${palette.grey[200]}`
    },
    indeterminateIcon: {
      position: 'relative',
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${
        transitions.easing.easeInOut
      }`,
      background: palette.primary.main,
      border: `${spacing.borderWidth} solid ${palette.primary.main}`,
      color: palette.common.white,

      '&:before': {
        content: '""',
        position: 'absolute',
        background: 'white',
        width: '0.5em',
        height: spacing.borderWidth,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.1em'
      }
    }
  })
