/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ screens, layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      margin: `0 ${layout.contentMobilePaddingHorizontal}`,

      [screens('md', 'lg', 'xl')]: {
        margin: `0 ${layout.contentPaddingHorizontal}`,
      },
    },
  })
