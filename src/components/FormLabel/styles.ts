import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '14px',
      color: palette.grey[400]
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48)
    },

    asterisk: {
      marginRight: '5px',
      color: palette.error.main
    },

    field: {
      display: 'block',
      marginBottom: '8px'
    },

    control: {
      display: 'inline-block',
      fontSize: '13px'
    }
  })
