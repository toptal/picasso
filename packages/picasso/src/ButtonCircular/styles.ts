import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 'initial',
      width: '1.5em'
    },

    primaryBlue: {},

    flat: {
      color: palette.grey.dark,
      backgroundColor: palette.common.white,

      '&:hover, &$hovered': {
        backgroundColor: palette.grey.lighter
      },

      '&:active, &$active': {
        backgroundColor: palette.grey.light
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
        boxShadow: `0 0 0 3px ${alpha(palette.common.white, 0.48)}`
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
