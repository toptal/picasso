import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const getCellStyles = (compact = false) => ({
  fontSize: rem('12px'),
  padding: compact ? '0.25rem 0.5rem' : '0.5rem 1rem',
  height: compact ? '1.25rem' : '2.5rem',
  lineHeight: compact ? '0.625rem' : '1.25rem',
  borderBottom: 'none',

  '&:last-child': {
    paddingRight: compact ? '0.75rem' : '1.5rem'
  }
})

export default ({ palette, typography }: Theme) =>
  createStyles({
    root: getCellStyles(),
    compact: getCellStyles(true),
    header: {
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },
    body: {
      fontSize: rem('13px'),
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
    },
    footer: {
      fontSize: rem('13px'),
      fontWeight: typography.fontWeights.semibold,
      color: palette.common.black
    }
  })
