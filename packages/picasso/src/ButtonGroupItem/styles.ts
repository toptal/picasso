import { createStyles, Theme } from '@material-ui/core/styles'

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
    hover: {},
    focused: {},
    group: {}
  })
