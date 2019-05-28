import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey[400],
      display: 'flex',
      marginBottom: '0.5em',
      lineHeight: '1em'
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48)
    },

    text: {
      fontSize: '0.875em'
    },

    inline: {
      display: 'inline-flex',
      marginBottom: 0
    },

    inlineText: {
      fontSize: '0.8125em'
    },

    asterisk: {
      marginRight: '0.3125em',
      color: palette.error.main
    }
  })
