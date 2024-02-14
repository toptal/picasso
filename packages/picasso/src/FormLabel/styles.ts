import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey[400],
      display: 'block',
      marginBottom: '0.5em',
      lineHeight: '1em',
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48),
    },

    medium: {
      fontSize: '0.875rem',
    },

    large: {
      fontSize: '1rem',
    },

    asterisk: {
      marginRight: '0.3125em',
      color: palette.error.main,
    },

    inline: {
      display: 'inline-block',
      marginBottom: 0,

      '& $medium': {
        fontSize: '0.8125rem',
        verticalAlign: 'top',
      },

      '& $asterisk': {
        fontSize: '0.8125rem',
        verticalAlign: 'top',
      },
    },

    horizontalLayout: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 0,
    },
    horizontalLayoutAlignedToTop: {
      alignItems: 'start',
      paddingTop: '0.5rem',
    },
  })
