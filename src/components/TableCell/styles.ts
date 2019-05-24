import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { rem } from '../styles'

PicassoProvider.override(() => ({}))

export default ({ palette, typography }: Theme) =>
  createStyles({
    root: {
      padding: '0.5rem 1rem',
      height: '2.5rem',
      lineHeight: '1.5rem',
      borderBottom: 'none'
    },
    head: {
      fontSize: rem('12px'),
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },
    body: {
      fontSize: rem('13px'),
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
    }
  })
