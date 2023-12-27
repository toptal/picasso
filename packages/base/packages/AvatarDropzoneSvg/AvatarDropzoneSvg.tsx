/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import type { Theme } from '@material-ui/core'
import { capitalize, makeStyles } from '@material-ui/core'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import { getShapes } from './utils'

/**
 * For measuring, pixel values are used because SVG's "d" attribute works with percentages and pixels only
 */
const BASE_FONT_SIZE = 16

const SETTINGS = {
  xxsmall: {
    dimensions: 2 * BASE_FONT_SIZE,
    cornerSize: 0.5 * BASE_FONT_SIZE,
  },
  xsmall: {
    dimensions: 2.5 * BASE_FONT_SIZE,
    cornerSize: 0.5 * BASE_FONT_SIZE,
  },
  small: {
    dimensions: 5 * BASE_FONT_SIZE,
    cornerSize: 1 * BASE_FONT_SIZE,
  },
  medium: {
    dimensions: 7.5 * BASE_FONT_SIZE,
    cornerSize: 1.5 * BASE_FONT_SIZE,
  },
  large: {
    dimensions: 10 * BASE_FONT_SIZE,
    cornerSize: 1.5 * BASE_FONT_SIZE,
  },
} as const

export const AVATAR_DROPZONE_SVG_SHAPES = {
  xxsmall: getShapes(SETTINGS.xxsmall),
  xsmall: getShapes(SETTINGS.xsmall),
  small: getShapes(SETTINGS.small),
  medium: getShapes(SETTINGS.medium),
  large: getShapes(SETTINGS.large),
} as const

export interface Props extends BaseProps {
  size?: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
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
  const shapes = AVATAR_DROPZONE_SVG_SHAPES[size!]

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
          d={shapes.background}
        />
        <path
          className={cx(classes.outline, {
            [classes.focused]: focused,
            [classes.error]: error,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.outline}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
        <path
          className={cx(classes.border, {
            [classes.error]: error,
            [classes.focused]: focused,
            [classes.hovered]: hovered,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.borders}
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
