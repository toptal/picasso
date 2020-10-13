import { Theme, createStyles } from '@material-ui/core/styles'
import {
  PicassoProvider,
  createPropertiesStyles,
  rem,
  outline
} from '@toptal/picasso-shared'

const controlWidth = '1em'
const controlMarginRight = '0.5em'

PicassoProvider.override(({ palette, transitions }) => ({
  MuiRadio: {
    root: {
      color: palette.common.white,
      fontSize: '1rem',
      position: 'relative',
      width: '1em',
      height: '1em',
      padding: '0',
      margin: '0.25em 0',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,

      '&$disabled': {
        opacity: 0.48,
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    },
    checked: {
      color: palette.primary.main
    }
  }
}))

const centeredCircle = (backgroundColor: string) =>
  createPropertiesStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    content: '""',
    borderColor: 'inherit',
    background: backgroundColor,
    pointerEvents: 'none',
    transition: 'border-color',
    transitionDuration: 'inherit',
    transitionTimingFunction: 'inherit'
  })

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      '&:hover $checkedIcon:before, &:hover $uncheckedIcon:before': {
        ...outline(palette.primary.main)
      }
    },
    focused: {
      '$checkedIcon:before, & $uncheckedIcon:before': {
        ...outline(palette.primary.main)
      }
    },
    disabled: {
      '&:hover $checkedIcon:before, &:hover $uncheckedIcon:before': {
        boxShadow: 'none'
      }
    },
    withLabel: {
      marginRight: controlMarginRight
    },
    uncheckedIcon: {
      color: palette.grey.main,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      '&:before': {
        ...centeredCircle(palette.common.white),
        border: `${sizes.borderWidth} solid ${palette.grey.main}`
      },
      '&:after': {
        ...centeredCircle(palette.common.white),
        width: 'initial',
        height: 'initial',
        borderWidth: rem('3px'),
        borderStyle: 'solid',
        opacity: 0,
        color: palette.common.white,
        transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
      }
    },
    checkedIcon: {
      color: palette.primary.main,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
      '&:before': {
        ...centeredCircle(palette.common.white),
        border: `${sizes.borderWidth} solid ${palette.grey.main}`
      },
      '&:after': {
        ...centeredCircle(palette.common.white),
        width: 'initial',
        height: 'initial',
        borderWidth: rem('3px'),
        borderStyle: 'solid',
        opacity: 1,
        transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
      }
    },
    label: {
      // 1px is needed for safari
      maxWidth: `calc(100% - ${controlWidth} - ${controlMarginRight} + 1px)`
    },
    labelWithRightSpacing: {}
  })
