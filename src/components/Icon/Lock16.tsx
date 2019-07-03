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

const SvgLock16 = (props: Props) => {
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
    const name = 'SvgLock16'

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
      <defs>
        <path
          d='M4 7V4a4 4 0 1 1 8 0v3h2v9H2V7h2zm1 0h6V4a3 3 0 1 0-6 0v3zM4 8H3v7h10V8H4z'
          id='lock16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='lock16_svg__b'>
          <use xlinkHref='#lock16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#lock16_svg__a' />
        <g mask='url(#lock16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLock16.displayName = 'SvgLock16'
export default withStyles(styles)(SvgLock16)
