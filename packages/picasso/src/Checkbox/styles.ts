import { Theme, createStyles } from '@material-ui/core/styles'
import { mix, outline, PicassoProvider } from '@toptal/picasso-shared'

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
        border: `${sizes.borderWidth} solid ${palette.grey.main2}`
      },
      '&:hover $checkedIcon': {
        background: mix(palette.primary.dark, palette.common.white, 0.152),
        border: `${sizes.borderWidth} solid ${mix(
          palette.primary.dark,
          palette.common.white,
          0.152
        )}`
      },
      '&:hover $indeterminateIcon': {
        background: mix(palette.primary.dark, palette.common.white, 0.152),
        border: `${sizes.borderWidth} solid ${mix(
          palette.primary.dark,
          palette.common.white,
          0.152
        )}`
      }
    },
    withLabel: {
      alignSelf: 'flex-start'
    },
    disabled: {
      '&:hover $uncheckedIcon': {
        border: `${sizes.borderWidth} solid ${palette.grey.main}`
      },
      '& $label': {
        color: palette.grey.main
      }
    },
    focused: {
      '& $uncheckedIcon': {
        ...outline(palette.primary.main)
      },
      '& $checkedIcon': {
        ...outline(palette.primary.main)
      },
      '& $indeterminateIcon': {
        ...outline(palette.primary.main)
      }
    },
    checkedIcon: {
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.primary.main,
      border: `${sizes.borderWidth} solid ${palette.primary.main}`,
      borderRadius: sizes.borderRadius.small,
      color: palette.common.white,
      '&:before': {
        top: '0.5em',
        left: '0.1875em',
        width: '0.1875em',
        height: '0.125em',
        content: '""',
        position: 'absolute',
        transform: 'rotate(45deg)',
        background: 'white'
      },
      '&:after': {
        top: '0.4375em',
        left: '0.25em',
        width: '0.5625em',
        height: '0.125em',
        content: '""',
        position: 'absolute',
        transform: 'rotate(-45deg)',
        background: 'white'
      }
    },
    uncheckedIcon: {
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.common.white,
      border: `${sizes.borderWidth} solid ${palette.grey.main}`,
      borderRadius: sizes.borderRadius.small
    },

    indeterminateIcon: {
      position: 'relative',
      height: '1em',
      width: '1em',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      background: palette.primary.main,
      border: `${sizes.borderWidth} solid ${palette.primary.main}`,
      borderRadius: sizes.borderRadius.small,
      color: palette.common.white,

      '&:before': {
        content: '""',
        position: 'absolute',
        background: 'white',
        width: '0.625em',
        height: '0.125em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
