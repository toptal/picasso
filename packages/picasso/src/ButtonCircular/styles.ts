import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha, outline } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 'initial',
      width: '1.5em'
    },

    primary: {},

    flat: {
      color: palette.grey.dark,
      backgroundColor: palette.common.white,

      '&:hover, &$hovered': {
        backgroundColor: palette.grey.lighter2
      },

      '&:active, &$active': {
        backgroundColor: palette.grey.light2
      },

      '&$disabled': {
        opacity: 0.48,
        color: palette.grey.dark,
        backgroundColor: palette.common.white
      },

      border: 'none'
    },

    transparent: {
      border: 'none',
      color: palette.common.white,
      backgroundColor: 'initial',

      '&$focusVisible, &$focused': {
        ...outline(palette.common.white)
      },

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.08)
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16)
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.48),
        backgroundColor: 'initial'
      }
    },

    disabled: {},
    hovered: {},
    focused: {},
    active: {},
    focusVisible: {}
  })
