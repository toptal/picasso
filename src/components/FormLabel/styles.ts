import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey[400]
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48)
    },

    asterisk: {
      marginRight: '0.3125em',
      color: palette.error.main,
      verticalAlign: 'middle'
    },

    block: {
      display: 'block',
      marginBottom: '0.5em'
    },

    inline: {
      display: 'inline-block'
    },

    inlineText: {
      fontSize: '0.8125em'
    },

    blockText: {
      fontSize: '0.875em'
    }
  })
