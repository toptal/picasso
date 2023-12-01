/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    progressBar: {
      width: '100%',
      minWidth: rem('80px'),
      height: '0.5rem',
      background: palette.grey.light,
      borderRadius: sizes.borderRadius.small,
    },
    progressIndicator: {
      height: '0.5rem',
      borderRadius: sizes.borderRadius.small,
      background: palette.blue.light,
      transition: 'width 0.3s ease-in-out',
    },
    percentageValue: {
      minWidth: rem('29px'),
      lineHeight: rem('18px'),
    },
  })
