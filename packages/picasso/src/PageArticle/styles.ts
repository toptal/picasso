import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ screens, layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      margin: `0 ${layout.contentPaddingHorizontal}`,

      [screens('xs', 'sm')]: {
        margin: `0 ${layout.contentMobilePaddingHorizontal}`,
      },
    },
  })
