import { createStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core'

import { createStylesForHorizontalLayout } from '../FormField/styles'

export default (theme: Theme) =>
  createStyles({
    horizontalLayout: createStylesForHorizontalLayout(theme),
  })
