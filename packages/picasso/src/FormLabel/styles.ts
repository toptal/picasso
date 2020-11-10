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

    text: {
      fontSize: '0.875em'
    },

    inline: {
      display: 'inline-block',
      marginBottom: 0,

      '& $text': {
        fontSize: '0.8125rem',
        verticalAlign: 'top'
      }
    }
  })
