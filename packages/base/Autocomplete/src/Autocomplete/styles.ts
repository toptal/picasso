import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ sizes: { input, borderWidth }, palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: input.width,
    },
    rootFull: {
      width: '100%',
    },
    rootShrink: {
      width: 'auto',
    },
    rootAuto: {},
    stringContent: {
      fontSize: '0.8125em',
    },
    poweredByGoogle: {
      padding: '0.75rem 1rem',
      borderTop: `${borderWidth} solid ${palette.grey.light}`,
    },
    horizontalLayout: {
      width: '100%',
    },
  })
