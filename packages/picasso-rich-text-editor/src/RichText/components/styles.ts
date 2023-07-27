import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export const codeStyles = ({ palette, typography }: Theme) => ({
  color: palette.red.main,
  backgroundColor: palette.grey.lighter,
  border: `1px solid ${palette.grey.light}`,
  borderRadius: '2px',
  padding: '1px 0.25rem',
  fontSize: typography.fontSizes.xsmall,
  fontFamily: 'monospace',
})

export default (theme: Theme) =>
  createStyles({
    code: codeStyles(theme),
  })
