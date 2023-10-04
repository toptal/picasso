import { createStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    visitedLinkChild: {
      '&:visited > strong, &:visited > em': {
        color: palette.purple.main,
      },
    },
  })
