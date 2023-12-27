/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { alpha, outline } from '@toptal/picasso-shared'
import { screens } from '@toptal/picasso-provider'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 'initial',
      width: '1.5em',
    },

    primary: {},

    responsive: {
      width: '2.5em',
      height: '2.5em',
      [screens('xl')]: {
        width: '1.5em',
        height: '1.5em',
      },
    },

    flat: {
      color: palette.grey.dark,
      backgroundColor: 'initial',

      '&:hover, &$hovered': {
        backgroundColor: palette.grey.lighter2,
      },

      '&:active, &$active': {
        backgroundColor: palette.grey.light2,
      },

      '&$disabled': {
        opacity: 0.48,
        color: palette.grey.dark,
        backgroundColor: 'initial',
      },

      border: 'none',
    },

    transparent: {
      border: 'none',
      color: palette.common.white,
      backgroundColor: 'initial',

      '&$focusVisible, &$focused': {
        ...outline(palette.common.white),
      },

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.08),
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16),
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.48),
        backgroundColor: 'initial',
      },
    },

    disabled: {},
    hovered: {},
    focused: {},
    active: {},
    focusVisible: {},
  })
