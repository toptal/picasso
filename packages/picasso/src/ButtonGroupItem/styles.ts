import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'

import { createOutlineCommons, activeGroup } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      '&:active, &$active, &:hover, &$hovered, &:focus, &$focused': {
        // border overlap to keep proper border width, but on state change
        // we need to move up overlapped border
        zIndex: 1
      },
      '&$group': {
        ...createOutlineCommons(theme),
        '&:active, &$active': activeGroup(theme)
      }
    },
    active: {},
    hovered: {},
    focused: {},
    disabled: {},
    group: {}
  })
