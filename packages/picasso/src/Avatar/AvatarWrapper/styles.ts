import type { SizeType } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import type { CSSProperties } from '@material-ui/core/styles/withStyles'

const SETTINGS = {
  xxsmall: {
    dimensions: 2,
    cornerSize: '0.5em',
  },
  xsmall: {
    dimensions: 2.5,
    cornerSize: '0.5em',
  },
  small: {
    dimensions: 5,
    cornerSize: '1em',
  },
  medium: {
    dimensions: 7.5,
    cornerSize: '1.5em',
  },
  large: {
    dimensions: 10,
    cornerSize: '1.5em',
  },
} as const

const VARIANTS = ['square', 'portrait', 'landscape']

const sizeClassNames = Object.entries(SETTINGS).reduce(
  (classNames, [size, { dimensions }]) => {
    VARIANTS.forEach(variant => {
      const className = `size${capitalize(size)}${capitalize(variant)}`

      const ratio = size === 'large' ? 3 / 4 : 2 / 3
      const widthRatio = variant === 'portrait' ? ratio : 1
      const heightRatio = variant === 'landscape' ? ratio : 1

      classNames[className] = {
        width: `${dimensions * widthRatio}em`,
        height: `${dimensions * heightRatio}em`,
      }
    })

    return classNames
  },
  {} as Record<string, CSSProperties>
)

const cornerClassNames = Object.entries(SETTINGS).reduce(
  (classNames, [size, { cornerSize }]) => {
    const className = `corner${capitalize(size)}`
    const clipPath = `polygon(0 0, 100% 0, 100% 100%, ${cornerSize} 100%, 0 calc(100% - ${cornerSize}))`

    classNames[className] = {
      clipPath,
      // we can remove this prefix as soon as this issue will
      // be resolved - https://github.com/cssinjs/css-vendor/issues/74
      '-webkit-clip-path': clipPath,
    }

    return classNames
  },
  {} as Record<string, CSSProperties>
)

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      backgroundColor: palette.grey.main,
      fontSize: '1rem',
      flexShrink: 0,
      flexGrow: 0,
    },

    ...sizeClassNames,
    ...cornerClassNames,
  })

export const getSizeClassName = (
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>,
  variant: 'square' | 'portrait' | 'landscape'
) => {
  return `size${capitalize(size)}${capitalize(variant)}`
}

export const getCornerClassName = (
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
) => {
  return `corner${capitalize(size)}`
}
