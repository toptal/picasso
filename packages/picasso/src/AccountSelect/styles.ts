/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      padding: '0',
    },
    accountItem: {
      height: 'auto',

      '&+&': {
        borderTop: `1px solid ${palette.grey.light2}`,
      },
    },
    accountLink: {
      flex: 1,
    },
  })
