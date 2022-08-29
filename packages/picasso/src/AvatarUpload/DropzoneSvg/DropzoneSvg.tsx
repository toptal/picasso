import React from 'react'
import { capitalize, makeStyles, Theme } from '@material-ui/core'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import { getBackgroundShape, getBordersShape, getOutlineShape } from './utils'

/**
 * For measuring, pixel values are used because SVG's "d" attribute works with percentages and pixels only
 */
const BASE_FONT_SIZE = 16
const SETTINGS = {
  small: {
    dimensions: 5 * BASE_FONT_SIZE,
    cornerSize: 1 * BASE_FONT_SIZE,
  },
  large: {
    dimensions: 10 * BASE_FONT_SIZE,
    cornerSize: 1.5 * BASE_FONT_SIZE,
  },
} as const

const SHAPES = {
  small: {
    backgroundShape: getBackgroundShape(SETTINGS.small),
    outlineShape: getOutlineShape(SETTINGS.small),
    bordersShape: getBordersShape(SETTINGS.small),
  },
  large: {
    backgroundShape: getBackgroundShape(SETTINGS.large),
    outlineShape: getOutlineShape(SETTINGS.large),
    bordersShape: getBordersShape(SETTINGS.large),
  },
} as const

export interface Props extends BaseProps {
  size?: SizeType<'small' | 'large'>
  isDragActive?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  hovered?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDropzoneSvg',
})

export const DropzoneSvg = (props: Props) => {
  const {
    size = 'small',
    disabled,
    error,
    focused,
    hovered,
    isDragActive,
    'data-testid': dataTestId,
  } = props

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shapes = SHAPES[size!]

  const classes = useStyles()

  return (
    <div
      className={cx(classes.root, classes[`root${capitalize(size)}`])}
      data-testid={dataTestId}
    >
      <svg
        className={cx(classes.svg, classes[`svg${capitalize(size)}`])}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={cx(classes.background, {
            [classes.dragActive]: isDragActive,
            [classes.disabled]: disabled,
            [classes.error]: error,
            [classes.focused]: focused,
            [classes.hovered]: hovered,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.backgroundShape}
        />
        <path
          className={cx(classes.outline, {
            [classes.focused]: focused,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.outlineShape}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
        <path
          className={cx(classes.border, {
            [classes.error]: error,
            [classes.focused]: focused,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.bordersShape}
          strokeDasharray='3 3'
        />
      </svg>
    </div>
  )
}

DropzoneSvg.displayName = 'DropzoneSvg'

DropzoneSvg.defaultProps = {
  size: 'small',
}

export default DropzoneSvg
