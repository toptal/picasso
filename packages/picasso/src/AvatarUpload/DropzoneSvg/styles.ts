import { createStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

interface Props {
  dimensions: number
}

export default ({ palette, transitions }: Theme) => {
  const dragActiveColor = alpha(palette.blue.main, 0.24)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hoverColor = alpha(palette.blue.lighter!, 0.84)

  return createStyles({
    root: {
      position: 'relative',
      width: ({ dimensions }: Props) => `${dimensions}px`,
      height: ({ dimensions }: Props) => `${dimensions}px`,
      background: 'transparent',

      '&$focused': {
        border: 0,
        outline: 0,
      },
    },

    svg: ({ dimensions }: Props) => {
      return {
        width: `${dimensions + 6}px`, // 6px for the outline stroke
        height: `${dimensions + 6}px`, // 6px for the outline stroke
        margin: '-3px', // to center the svg
      }
    },

    background: {
      fill: palette.blue.lighter,
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'fill',

      '&$hovered': {
        cursor: 'pointer',
        fill: hoverColor,
      },

      '&$dragActive,&:active': {
        fill: dragActiveColor,
      },

      '&$disabled': {
        fill: palette.grey.lighter,
        '&$hovered': {
          cursor: 'no-drop',
          fill: palette.grey.light2,
        },
      },
    },
    border: {
      stroke: palette.blue.main,
      transition: `stroke ${transitions.duration.short}`,

      '&$error': {
        stroke: palette.red.main,

        '&$focused': {
          stroke: palette.blue.main,
        },
      },
    },
    outline: {
      display: 'none',
      stroke: palette.blue.main,

      '&$focused:not($dragActive)': {
        display: 'initial',
      },
    },

    dragActive: {},
    disabled: {},
    error: {},
    focused: {},
    hovered: {},
  })
}
