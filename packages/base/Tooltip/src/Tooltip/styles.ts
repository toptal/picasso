import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

// copied and manually changed from packages/picasso-provider/src/Picasso/config/shadows.ts
const ARROW_SHADOW = '0 0 2px 0 rgb(0 0 0 / 24%), 0 0 4px 0 rgb(0 0 0 / 12%)'

export default ({ palette, shadows, sizes: { borderRadius } }: Theme) =>
  createStyles({
    tooltip: {
      backgroundColor: palette.grey.darker,
      color: palette.common.white,
      boxShadow: shadows[4],
      padding: '1rem',
      borderRadius: borderRadius.small,
      position: 'relative',
    },
    arrow: {
      color: palette.common.white,
      boxSizing: 'border-box',
      fontSize: '1rem',
      '&::before': {
        boxShadow: ARROW_SHADOW,
      },
    },
    light: {
      color: palette.grey.darker,
      backgroundColor: palette.common.white,
    },
    compact: {
      lineHeight: '1em',
      padding: `${rem('2px')} 0.5rem`,
      margin: '0.25rem',
    },
    noMaxWidth: {
      maxWidth: 'none',
    },
  })
