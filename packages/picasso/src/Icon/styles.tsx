import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fill: 'currentColor',
      display: 'inline-block',
      fontSize: 'inherit',
      height: '1em',
      verticalAlign: '-.125em'
    },

    // colors
    green: {
      color: palette.green.main
    },
    red: {
      color: palette.red.main
    },
    lightBlue: {
      color: palette.blue.light
    },
    blue: {
      color: palette.primary.main
    },
    yellow: {
      color: palette.yellow.main
    },
    white: {
      color: palette.common.white
    },
    lightGrey: {
      color: palette.grey.light2
    },
    grey: {
      color: palette.grey.main
    },
    darkGrey: {
      color: palette.text.primary
    },
    black: {
      color: palette.common.black
    },
    invert: {
      color: palette.common.white
    },
    inherit: {
      color: 'inherit'
    }
  })
