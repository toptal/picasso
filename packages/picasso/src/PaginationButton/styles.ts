import { createStyles, Theme } from '@material-ui/core/styles'

import { createVariant } from '../Button/styles'

export default (theme: Theme) =>
  createStyles({
    root: {
      minWidth: '1.5em',
      padding: '0 0.3em',

      '&$active': createVariant(theme.palette.grey.dark!, theme)
    },
    active: {}
  })
