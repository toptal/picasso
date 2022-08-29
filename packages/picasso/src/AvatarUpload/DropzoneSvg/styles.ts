import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      background: 'transparent',
    },
    rootSmall: {
      width: '80px',
      height: '80px',
    },
    rootLarge: {
      width: '160px',
      height: '160px',
    },

    svg: {
      margin: '-3px', // to center the svg
    },
    svgSmall: {
      width: '86px', // 6px for the outline stroke
      height: '86px', // 6px for the outline stroke
    },
    svgLarge: {
      width: '166px', // 6px for the outline stroke
      height: '166px', // 6px for the outline stroke
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
