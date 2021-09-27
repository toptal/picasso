import { createStyles, Theme } from '@material-ui/core/styles'

import { createOutlineCommons, activeGroup } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
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
