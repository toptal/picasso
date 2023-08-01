import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export const codeStyles = ({ palette, typography }: Theme) => ({
  color: palette.red.main,
  backgroundColor: palette.grey.lighter,
  border: `1px solid ${palette.grey.light}`,
  borderRadius: '2px',
  padding: '1px 0.25rem',
  fontSize: typography.fontSizes.xsmall,
  fontFamily: 'monospace',
})

export const codeBlockStyles = ({ palette, sizes, typography }: Theme) => ({
  backgroundColor: palette.grey.lighter,
  borderRadius: sizes.borderRadius.small,
  padding: '0.25rem 0.5rem',
  display: 'block',
  fontFamily: 'monospace',
  fontSize: typography.fontSizes.xxsmall,
  lineHeight: rem('18px'),
  color: palette.common.black,
})

export default (theme: Theme) =>
  createStyles({
    code: codeStyles(theme),
    codeBlock: codeBlockStyles(theme),
  })
