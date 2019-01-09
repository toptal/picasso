import colors from '../Picasso/colors'

export default {
  MuiInputBase: {
    root: {
      border: 'solid 1px #dfe3e9',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: 'transparent',
      transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) border-color',

      '&$focused': {
        borderColor: colors.primary.main
      },

      '&$focused, &:hover': {
        backgroundColor: 'transparent'
      },

      '&$error': {
        borderColor: colors.error.text,
        color: colors.error.main,
        backgroundColor: colors.error.background
      }
    },
    input: {
      fontSize: '18px',
      lineHeight: '1.2em'
    }
  },
  MuiInputLabel: {
    filled: {
      transform: 'translate(0.75em, 1em) scale(1)',

      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },

    shrink: {},

    error: {
      color: colors.error.text
    }
  },
  MuiFilledInput: {
    root: {
      border: 'solid 1px #dfe3e9',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: 'transparent',
      transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) border-color',

      '&$focused': {
        borderColor: colors.primary.main
      },

      '&$focused, &:hover': {
        backgroundColor: 'transparent'
      },

      '&$error': {
        borderColor: colors.error.text,
        color: colors.error.main,
        backgroundColor: colors.error.background
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
  },
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    }
  },
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
