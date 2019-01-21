import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
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

export default {
  root: {}
}
