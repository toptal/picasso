import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
}

const SvgAmex32 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size } = props

  if (size) {
    window.console.warn(
      `'size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`
    )
  }

  const scaledSize = `${BASE_SIZE * Math.ceil(scale || 1)}px`
  const svgStyle = {
    minWidth: scaledSize,
    minHeight: scaledSize,
    ...style
  }

  return (
    <svg
      viewBox='0 0 32 32'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='evenodd'>
        <rect y={6} rx={2} />
        <path d='M10.22 19H8.97l-.498-1.363H6.19L5.722 19H4.5l2.22-6h1.218l2.283 6zm-2.119-2.374L7.316 14.4l-.77 2.226H8.1zM10.816 19v-6h1.723l1.034 4.093L14.596 13h1.727v6h-1.07v-4.723L14.122 19h-1.109l-1.128-4.723V19h-1.07zm6.65 0v-6h4.228v1.015h-3.077v1.33h2.863v1.011h-2.863v1.633h3.186V19h-4.337zm4.733 0l1.949-3.131L22.382 13h1.346l1.143 1.928L25.991 13h1.334l-1.773 2.914L27.5 19h-1.388l-1.264-2.075L23.58 19H22.2z' />
      </g>
    </svg>
  )
}

SvgAmex32.displayName = 'SvgAmex32'
export default withStyles(styles)(SvgAmex32)
