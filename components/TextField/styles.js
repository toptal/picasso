import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiInputBase: {
    input: {
      fontSize: '18px',
      lineHeight: '1.2em'
    }
  }
}))

PicassoProvider.override(({ pallete }) => ({
  MuiInputLabel: {
    filled: {
      transform: 'translate(0.75em, 1em) scale(1)',

      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },

    shrink: {},

    error: {
      color: pallete.error.text
    }
  }
}))

PicassoProvider.override(({ pallete }) => ({
  MuiInputLabel: {
    filled: {
      transform: 'translate(0.75em, 1em) scale(1)',
      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },
    shrink: {},
    error: {
      borderColor: pallete.error.text,
      color: pallete.error.main,
      backgroundColor: pallete.error.background
    }
  }
}))

PicassoProvider.override(({ pallete }) => ({
  MuiInputLabel: {
    filled: {
      transform: 'translate(0.75em, 1em) scale(1)',

      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },

    shrink: {},

    error: {
      color: pallete.error.text
    }
  }
}))

PicassoProvider.override(({ pallete }) => ({
  MuiInputLabel: {
    filled: {
      transform: 'translate(0.75em, 1em) scale(1)',
      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },
    shrink: {},
    error: {
      color: pallete.error.text
    }
  }
}))

PicassoProvider.override(({ pallete }) => ({
  MuiFilledInput: {
    root: {
      border: 'solid 1px #dfe3e9',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: 'transparent',
      transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) border-color',
      '&$focused': {
        borderColor: pallete.primary.main
      },
      '&$focused, &:hover': {
        backgroundColor: 'transparent'
      },
      '&$error': {
        borderColor: pallete.error.text,
        color: pallete.error.main,
        backgroundColor: pallete.error.background
      }
    },
    input: {
      padding: '1.2em .7em .2em'
    },
    underline: {
      '&:after, &:before': {
        content: 'none'
      }
    },
    focused: {},
    error: {}
  }
}))

PicassoProvider.override(() => ({
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    }
  }
}))

export default {
  TextField: {
    iconStart: {
      transform: 'translate(2.8em, 1em) scale(1)',
      '&$shrink': {
        transform: 'translate(2.8em, 0.6em) scale(.75)'
      }
    },

    shrink: {}
  }
}
