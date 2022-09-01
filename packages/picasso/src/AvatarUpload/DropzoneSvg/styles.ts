import { createStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette, transitions }: Theme) => {
  const dragActiveColor = alpha(palette.blue.main, 0.24)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hoverBackgroundColor = alpha(palette.blue.lighter!, 0.84)
  const hoverBorderColor = alpha(palette.blue.main, 0.84)

  return createStyles({
    root: {
      pointerEvents: 'unset',
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

      '&$hovered': {
        fill: hoverBackgroundColor,
      },

      '&$dragActive,&:active': {
        fill: dragActiveColor,
      },

      '&$disabled': {
        fill: palette.grey.lighter,
        '&$hovered': {
          fill: palette.grey.light2,
        },
      },
    },
    border: {
      stroke: palette.blue.main,
      transition: `stroke ${transitions.duration.short}`,

      '&$hovered': {
        stroke: hoverBorderColor,
      },

      '&$error': {
        stroke: palette.red.main,
      },
    },
    outline: {
      display: 'none',
      stroke: palette.blue.main,

      '&$focused:not($dragActive)': {
        display: 'initial',
      },

      '&$error': {
        stroke: palette.red.main,
      },
    },

    dragActive: {},
    disabled: {},
    error: {},
    focused: {},
    hovered: {},
  })
}
