import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiSelect: {
    outlined: {
      border: `solid 1px ${pallete.grey[50]}`,
      borderRadius: 0,
      padding: '0.7em 1.5em 0.7em 0.7em',

      '&:focus, &:hover': {
        borderColor: pallete.primary.main,
        backgroundColor: 'transparent'
      }
    },
    selectMenu: {
      minHeight: 'auto',
      lineHeight: '1em',
      fontSize: '16px'
    }
  }
}))

export default {}
