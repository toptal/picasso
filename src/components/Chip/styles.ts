import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette, spacing }: Theme) => ({
  MuiChip: {
    root: {
      fontSize: 'inherit',
      backgroundColor: palette.common.white,
      borderRadius: '6.25em',
      border: `${spacing.borderWidth} solid ${palette.grey[200]}`,
      color: palette.primary.main,
      height: '1.5em'
    },
    label: {
      fontSize: '.75em',
      fontWeight: 600
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
