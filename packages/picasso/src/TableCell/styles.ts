import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

const baseCellStyles = {
  fontSize: rem('12px'),
  borderBottom: 'none'
}

const regularCellStyles = {
  ...baseCellStyles,
  padding: '0.5rem 1rem',
  height: '2.5rem',
  lineHeight: '1.25rem',

  '&:last-child': {
    paddingRight: '1.5rem'
  }
}

const compactCellStyles = {
  ...baseCellStyles,
  padding: '0.25rem 0.5rem',
  height: '1.5rem',
  lineHeight: '0.625rem',

  '&:last-child': {
    paddingRight: '0.75rem'
  }
}

const narrowCellStyles = {
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem'
}

export default ({ palette, typography }: Theme) =>
  createStyles({
    root: regularCellStyles,
    compact: compactCellStyles,
    narrow: narrowCellStyles,
    header: {
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary,
      lineHeight: '1.125rem'
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
