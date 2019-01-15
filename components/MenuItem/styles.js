import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiMenuItem: {
    root: {
      borderTop: `1px solid ${pallete.grey[50]}`,
      lineHeight: '1em',
      padding: '0.7em',
      height: 'auto',

      '&:first-child': {
        borderTop: 'none'
      },

      '&:hover': {
        backgroundColor: pallete.blue.light,

        '&$selected': {
          backgroundColor: pallete.blue.light,
          color: pallete.primary.main
        }
      },

      '&$selected': {
        backgroundColor: pallete.blue.light,
        color: pallete.primary.main
      }
    },
    selected: {}
  }
}))

export default {
  MenuItem: {}
}
