import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderColor: pallete.grey[50],
        borderRadius: 0
      },

      '&$focused': {
        '& $notchedOutline': {
          borderWidth: '1px'
        }
      },

      '&:hover': {
        '&:not($disabled)&:not($focused)&:not($error)': {
          '& $notchedOutline': {
            borderColor: pallete.primary.main
          }
        }
      }
    },
    input: {
      padding: '1.2em .7em .2em',
      border: 'solid 1px transparent'
    },
    multiline: {
      fontSize: '18px',
      padding: '1.2em .7em .2em'
    },
    error: {},
    notchedOutline: {},
    adornedEnd: {
      paddingRight: 0
    }
  }
}))

export default {
  OutlinedInput: {}
}
