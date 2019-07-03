import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgLength24 = (props: Props) => {
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
    const name = 'SvgLength24'

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
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M3.207 12.5l5 5-.707.707-5-5-.707-.707L7.5 6.793l.707.707-5 5zm18.293-.707l.707.707-5.707 5.707-.707-.707 5-5-5-5 .707-.707 5 5zM0 3h1v19H0V3zm23 0h1v19h-1V3z'
          id='length24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='length24_svg__b'>
          <use xlinkHref='#length24_svg__a' />
        </mask>
        <use xlinkHref='#length24_svg__a' />
        <g mask='url(#length24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLength24.displayName = 'SvgLength24'
export default withStyles(styles)(SvgLength24)
