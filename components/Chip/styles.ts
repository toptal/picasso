import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiChip: {
    root: {
      fontSize: '16px',
      backgroundColor: palette.blue.light,
      color: palette.primary.main,
      height: '1.5em'
    },
    label: {
      fontSize: '.75em',
      fontWeight: 600
    },
    deletable: {
      '&:focus': {
        backgroundColor: palette.blue.light
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {}
  })
