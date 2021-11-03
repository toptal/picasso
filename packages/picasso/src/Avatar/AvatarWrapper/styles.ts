import { createStyles, Theme } from '@material-ui/core/styles'

import { Props } from './AvatarWrapper'

const SETTINGS = {
  xxsmall: {
    dimensions: 2,
    cornerSize: '0.5em'
  },
  xsmall: {
    dimensions: 2.5,
    cornerSize: '0.5em'
  },
  small: {
    dimensions: 5,
    cornerSize: '1em'
  },
  medium: {
    dimensions: 7.5,
    cornerSize: '1.5em'
  },
  large: {
    dimensions: 10,
    cornerSize: '1.5em'
  }
} as const

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      backgroundColor: palette.grey.main,
      fontSize: '1rem',
      flexShrink: 0,
      flexGrow: 0
    },
    size: ({ size, variant }: Props) => {
      const { dimensions } = SETTINGS[size]
      const ratio = size === 'large' ? 3 / 4 : 2 / 3
      const widthRatio = variant === 'portrait' ? ratio : 1
      const heightRatio = variant === 'landscape' ? ratio : 1

      return {
        width: `${dimensions * widthRatio}em`,
        height: `${dimensions * heightRatio}em`
      }
    },

    corner: ({ size }: Props) => {
      const { cornerSize } = SETTINGS[size]
      const clipPath = `polygon(0 0, 100% 0, 100% 100%, ${cornerSize} 100%, 0 calc(100% - ${cornerSize}))`

      return {
        clipPath,
        // we can remove this prefix as soon as this issue will
        // be resolved - https://github.com/cssinjs/css-vendor/issues/74
        '-webkit-clip-path': clipPath
      }
    }
  })
