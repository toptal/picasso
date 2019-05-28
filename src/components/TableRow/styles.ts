import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({}))

export default ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      height: 'auto',

      '&:nth-of-type(even)': {
        background: '#f8f9f9'
      }
    },
    head: {
      borderBottom: `${spacing.borderWidth} solid ${palette.grey[200]}`
    }
  })
