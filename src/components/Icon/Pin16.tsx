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

const SvgPin16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgPin16'

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
    >
      <defs>
        <path
          d='M8 16C4 11.542 2 8.21 2 6a6 6 0 1 1 12 0c0 2.21-2 5.542-6 10zM3 6c0 1.754 1.657 4.633 5 8.489 3.343-3.856 5-6.735 5-8.489A5 5 0 0 0 3 6zm5 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z'
          id='pin16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='pin16_svg__b'>
          <use xlinkHref='#pin16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#pin16_svg__a' />
        <g mask='url(#pin16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPin16.displayName = 'SvgPin16'
export default withStyles(styles)(SvgPin16)
