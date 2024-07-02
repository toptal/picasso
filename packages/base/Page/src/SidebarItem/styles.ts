import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
    },
    collapsibleWrapper: {
      padding: '0 0 0 1rem',
      margin: '0 1rem',
    },
    content: {
      // to cover text overflow in the sub-menu header item
      maxWidth: '100%',
    },
    expandIcon: {
      fontSize: '1em',
    },
    compactDropdown: {
      marginLeft: '0.5em',
    },
    lightExpandIcon: {
      color: palette.grey.dark,
    },
    darkExpandIcon: {
      color: palette.grey.main,
    },
    expandIconDisabled: {
      color: palette.grey.main,
    },
  })
