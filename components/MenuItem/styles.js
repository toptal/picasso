import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiMenuItem: {
    root: {
      borderTop: `1px solid ${palette.grey[50]}`,
      lineHeight: '1em',
      padding: '0.7em',
      height: 'auto',

      '&:first-child': {
        borderTop: 'none'
      },

      '&:hover': {
        backgroundColor: palette.blue.light,

        '&$selected': {
          backgroundColor: palette.blue.light,
          color: palette.primary.main
        }
      },

      '&$selected': {
        backgroundColor: palette.blue.light,
        color: palette.primary.main
      }
    },
    selected: {}
  }
}))

export default {
  MenuItem: {}
}
