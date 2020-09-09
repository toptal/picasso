import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

const controlWidth = '1em'
const labelMargin = '0.5em'

PicassoProvider.override(() => ({
  MuiCheckbox: {
    root: {
      fontSize: '1rem',
      lineHeight: '1rem',
      padding: 0,

      '&$disabled': {
        opacity: 0.48
      }
    }
  }
}))

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      '&:hover $uncheckedIcon': {
        border: `${sizes.borderWidth} solid ${palette.primary.main}`
      }
    },
    withLabel: {
      alignSelf: 'flex-start'
    },
    disabled: {
      '&:hover $uncheckedIcon': {
        border: `${sizes.borderWidth} solid ${palette.grey.main}`
      }
    },
    focused: {
      '& $uncheckedIcon': {
        border: `${sizes.borderWidth} solid ${palette.primary.main}`
      }
    },
    checkedIcon: {
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.primary.main,
      border: `${sizes.borderWidth} solid ${palette.primary.main}`,
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
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.common.white,
      border: `${sizes.borderWidth} solid ${palette.grey.main}`
    },

    indeterminateIcon: {
      position: 'relative',
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.primary.main,
      border: `${sizes.borderWidth} solid ${palette.primary.main}`,
      color: palette.common.white,

      '&:before': {
        content: '""',
        position: 'absolute',
        background: 'white',
        width: '0.5em',
        height: '0.125em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.1em'
      }
    },
    label: {
      marginLeft: labelMargin,
      // 1px is needed for safari
      maxWidth: `calc(100% - ${controlWidth} - ${labelMargin} + 1px)`
    },
    labelWithRightSpacing: {},
    checkboxWrapper: {
      alignSelf: 'flex-start',
      verticalAlign: 'middle'
    },
    disabledCheckboxWrapper: {
      cursor: 'not-allowed'
    }
  })
