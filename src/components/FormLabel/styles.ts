import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha, rem } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey[400]
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48)
    },

    asterisk: {
      marginRight: rem('5px'),
      color: palette.error.main
    },

    block: {
      fontSize: '0.875em',
      display: 'block',
      marginBottom: rem('8px')
    },

    inline: {
      display: 'inline-block'
    }
  })
