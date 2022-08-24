import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'

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

export interface Props extends BaseProps {
  size?: SizeType<'small' | 'large'>
  isDragActive?: boolean
  disabled?: boolean
  error?: boolean
  focused?: boolean
  hovered?: boolean
}

const useStyles = makeStyles<Theme, { dimensions: number }>(styles, {
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
  const { dimensions, cornerSize } = SETTINGS[size!]

  const classes = useStyles({ dimensions })

  return (
    <div className={classes.root} data-testid={dataTestId}>
      <svg
        className={classes.svg}
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
          d={getBackgroundShape(dimensions, cornerSize)}
        />
        <path
          className={cx(classes.outline, {
            [classes.focused]: focused,
          })}
          fillRule='evenodd'
          clipRule='evenodd'
          d={getOutlineShape(dimensions, cornerSize)}
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
          d={getBordersShape(dimensions, cornerSize)}
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

/**
 * Returns the shape of the background of the avatar.
 * For small variant, it should be 80x80(px), for large - 160x160(px).
 */
const getBackgroundShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 3 // shift for the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + centerShift} 
    V ${dimensions + centerShift} 
    H ${cornerSize + centerShift} 
    L ${centerShift} ${dimensions - cornerSize + centerShift}
  `
}

/**
 * Returns the shape of the outline when field is focused.
 * For small variant, it should be 82x82(px), for large - 162x162(px).
 * it is 2px bigger than the background because of the outline stroke width.
 */
const getOutlineShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 2 // shift for the outline stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + centerShift + outlineStrokeWidth} 
    V ${dimensions + centerShift + outlineStrokeWidth} 
    H ${cornerSize + 1} 
    L ${centerShift} ${dimensions - cornerSize + centerShift} Z
  `
}

/**
 * Returns the shape of the borders.
 * For small variant, it should be 78x78(px), for large - 158x158(px).
 * it is 1px smaller than the background because of the border stroke width.
 */
const getBordersShape = (dimensions: number, cornerSize: number) => {
  const centerShift = 4 // shift for the outline stroke and border stroke
  const outlineStrokeWidth = 2 // width of the outline stroke

  return `
    M ${centerShift} ${centerShift}
    H ${dimensions + outlineStrokeWidth} 
    V ${dimensions + outlineStrokeWidth} 
    H ${cornerSize + outlineStrokeWidth} 
    L ${centerShift} ${dimensions - cornerSize + outlineStrokeWidth} Z
  `
}
