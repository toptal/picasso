import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgDropdownArrows16 = (props: Props) => {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    size,
    base,
    elementSelector
  } = props

  if (size) {
    const name = 'SvgDropdownArrows16'

    window.console.warn(
      `${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`
    )
  }

  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      data-qa={elementSelector}
    >
      <g>
        <path d='M8.429 2.715l2.117 3.528a.5.5 0 0 1-.43.757H5.884a.5.5 0 0 1-.429-.757l2.117-3.528a.5.5 0 0 1 .858 0zM8.429 13.285l2.117-3.528a.5.5 0 0 0-.43-.757H5.884a.5.5 0 0 0-.429.757l2.117 3.528a.5.5 0 0 0 .858 0z' />
      </g>
    </svg>
  )
}

SvgDropdownArrows16.displayName = 'SvgDropdownArrows16'
export default withStyles(styles)(SvgDropdownArrows16)
