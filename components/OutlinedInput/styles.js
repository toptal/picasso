import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderColor: palette.grey[50],
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
            borderColor: palette.primary.main
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
