import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette, zIndex }: Theme) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hoverColor = alpha(palette.grey.darker!, 0.7)

  return createStyles({
    root: {
      border: 'none',
      cursor: 'pointer',
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      outline: 'none',
      background: 'transparent',
    },
    rootXxsmall: {
      width: '32px',
      height: '32px',
    },
    rootXsmall: {
      width: '40px',
      height: '40px',
    },
    rootSmall: {
      width: '80px',
      height: '80px',
    },
    rootMedium: {
      width: '120px',
      height: '120px',
    },
    rootLarge: {
      width: '160px',
      height: '160px',
    },

    svg: {
      margin: '-3px', // to center the svg
      position: 'absolute',
    },
    svgXxsmall: {
      width: '38px', // +6px for outline
      height: '38px', // +6px for outline
    },
    svgXsmall: {
      width: '46px', // +6px for outline
      height: '46px', // +6px for outline
    },
    svgSmall: {
      width: '86px', // +6px for outline
      height: '86px', // +6px for outline
    },
    svgMedium: {
      width: '126px', // +6px for outline
      height: '126px', // +6px for outline
    },
    svgLarge: {
      width: '166px', // +6px for outline
      height: '166px', // +6px for outline
    },

    background: {
      fill: hoverColor,
    },

    outline: {
      display: 'none',
      stroke: palette.blue.main,

      '&$focused': {
        display: 'initial',
      },
    },

    pencilIcon: {
      color: palette.common.white,
      zIndex: zIndex.tooltip,
    },

    focused: {},
  })
}
