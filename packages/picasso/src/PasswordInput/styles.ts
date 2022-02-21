import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ spacing }: Theme) =>
  createStyles({
    root: {
      paddingRight: 0,
      cursor: 'text'
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield'
    },

    toggle: {
      marginRight: spacing(1)
    }
  })
