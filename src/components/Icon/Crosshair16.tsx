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

const SvgCrosshair16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgCrosshair16'

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
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit={1.414}
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M8 14.88A6.88 6.88 0 1 0 8 1.12a6.88 6.88 0 1 0 0 13.76zm0-.8A6.08 6.08 0 1 1 8 1.92a6.08 6.08 0 0 1 0 12.16z' />
        <path d='M8 10.32a2.32 2.32 0 1 0 0-4.64 2.32 2.32 0 0 0 0 4.64zm0-.8a1.52 1.52 0 1 1 .001-3.041A1.52 1.52 0 0 1 8 9.52zM7.6 0h.8v1.52h-.8V0zm0 14.48h.8V16h-.8v-1.52zM16 7.6v.8h-1.52v-.8H16zm-14.48 0v.8H0v-.8h1.52z' />
      </g>
    </svg>
  )
}

SvgCrosshair16.displayName = 'SvgCrosshair16'
export default withStyles(styles)(SvgCrosshair16)
