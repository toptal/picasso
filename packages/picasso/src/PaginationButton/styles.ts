import { createStyles, Theme } from '@material-ui/core/styles'

import { createOutlineCommons, activeGroupStyles } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      minWidth: '1.5em',
      padding: '0 0.3em',

      ...createOutlineCommons(theme),
      '&:active, &$active': activeGroupStyles(theme)
    },
    active: {}
  })
