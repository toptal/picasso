/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import {
  createOutlineCommons,
  activeGroup,
  disabledGroup,
} from '@toptal/picasso-button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      '&:active, &$active, &:hover, &$hovered, &:focus, &$focused, &:disabled, &$disabled':
        {
          // border overlap to keep proper border width, but on state change
          // we need to move up overlapped border
          zIndex: 1,
        },
      '&$group': {
        ...createOutlineCommons(theme),
        '&:active, &$active': activeGroup(theme),
        '&:disabled, &$disabled': disabledGroup(theme),
      },
    },
    active: {},
    hovered: {},
    focused: {},
    disabled: {},
    group: {},
  })
