import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '80px',
      height: '80px',
      background: 'transparent',
    },

    svg: {
      width: '86px', // 6px for the outline stroke
      height: '86px', // 6px for the outline stroke
      margin: '-3px', // to center the svg
    },

    background: {
      fill: palette.blue.lighter,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'fill',
    },
    border: {
      stroke: palette.blue.main,
      transition: `stroke ${transitions.duration.short}`,
    },
    outline: {
      display: 'none',
      stroke: palette.blue.main,
    },
  })
