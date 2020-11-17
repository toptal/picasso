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
    background: backgroundColor,
    pointerEvents: 'none',
    transition: 'border-color',
    transitionDuration: 'inherit',
    transitionTimingFunction: 'inherit'
  })

interface IconStylesProps {
  backgroundColor: string
  borderWidth: string
  borderColor: string
  dotColor: string
  dotOpacity: number
  transition: string
}

const iconStyles = ({
  backgroundColor,
  borderColor,
  borderWidth,
  dotColor,
  dotOpacity,
  transition
}: IconStylesProps) => ({
  color: dotColor,
  transition,
  '&:before': iconBeforeStyles({
    borderWidth,
    borderColor,
    backgroundColor
  }),
  '&:after': {
    ...centeredCircle(dotColor),
    width: 'initial',
    height: 'initial',
    borderWidth: rem('2px'),
    borderStyle: 'solid',
    opacity: dotOpacity,
    transition
  }
})

const iconBeforeStyles = ({
  borderWidth,
  borderColor,
  backgroundColor
}: Pick<
  IconStylesProps,
  'borderWidth' | 'borderColor' | 'backgroundColor'
>) => ({
  ...centeredCircle(backgroundColor),
  border: `${borderWidth} solid ${borderColor}`
})

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',

      '&:hover $uncheckedIcon:before': iconBeforeStyles({
        borderWidth: sizes.borderWidth,
        borderColor: palette.grey.main2!,
        backgroundColor: palette.common.white
      }),

      '&:hover $checkedIcon:before': iconBeforeStyles({
        borderWidth: sizes.borderWidth,
        borderColor: palette.primary.dark,
        backgroundColor: palette.primary.dark
      })
    },
    focused: {
      '& $checkedIcon:before, & $uncheckedIcon:before': {
        ...outline(palette.primary.main)
      }
    },
    disabled: {
      '$uncheckedIcon:before': {
        boxShadow: 'none !important'
      }
    },
    withLabel: {
      marginRight: controlMarginRight
    },
    uncheckedIcon: iconStyles({
      backgroundColor: palette.common.white,
      borderColor: palette.grey.main!,
      borderWidth: sizes.borderWidth,
      dotColor: palette.grey.main!,
      dotOpacity: 0,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
    }),
    checkedIcon: iconStyles({
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.main,
      borderWidth: sizes.borderWidth,
      dotColor: palette.common.white,
      dotOpacity: 1,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`
    }),
    label: {
      // 1px is needed for safari
      maxWidth: `calc(100% - ${controlWidth} - ${controlMarginRight} + 1px)`
    },
    labelWithRightSpacing: {}
  })
