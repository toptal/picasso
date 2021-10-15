import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      color: palette.grey[400],
      display: 'block',
      marginBottom: '0.5em',
      lineHeight: '1em'
    },

    disabled: {
      color: alpha(palette.grey[400], 0.48)
    },

    textMedium: {
      fontSize: '0.875rem'
    },

    textLarge: {
      fontSize: '1rem'
    },

    asterisk: {
      marginRight: '0.3125em',
      color: palette.error.main,
      fontSize: '0.875em'
    },

    inline: {
      display: 'inline-block',
      marginBottom: 0,

      '& $text': {
        verticalAlign: 'top'
      },

      '& $asterisk': {
        fontSize: '0.8125em',
        verticalAlign: 'top'
      }
    }
  })
