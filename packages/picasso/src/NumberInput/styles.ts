import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      paddingRight: 0
    },
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield'
    },
    control: {
      height: '1.125rem',
      width: '1.625rem',
      borderLeft: `1px solid ${palette.grey.light}`,
      borderBottom: `1px solid ${palette.grey.light}`,
      borderRight: '1px solid transparent',

      '& + &': {
        borderBottom: '1px solid transparent'
      }
    },

    controlDisabled: {
      opacity: 0.48
    },

    arrowUp: {
      width: 0,
      height: 0,
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',
      borderBottom: `5px solid ${palette.grey.dark}`
    },

    arrowDown: {
      width: 0,
      height: 0,
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',
      borderTop: `5px solid ${palette.grey.dark}`
    }
  })
