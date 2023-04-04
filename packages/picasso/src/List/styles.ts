import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ typography }: Theme) =>
  createStyles({
    root: {
      fontSize: typography.fontSizes.medium,
      marginTop: '4px',
      paddingLeft: '16px',
    },
    unordered: {
      paddingLeft: '24px',
    },
    circle: {
      listStyleType: 'circle',
    },
    disc: {
      listStyleType: 'disc',
    },
    firstLevel: {
      paddingLeft: '16px',
    },
  })
