import { createStyles } from '@material-ui/core/styles'

import { MENU_CSS_VARS } from './../../Menu/styles'

export default () =>
  createStyles({
    root: {
      marginBottom: `calc(-1 * var(${MENU_CSS_VARS.verticalPadding}))`,
      padding: `var(${MENU_CSS_VARS.verticalPadding})`
    }
  })
