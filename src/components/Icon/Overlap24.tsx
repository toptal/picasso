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

const SvgOverlap24 = (props: Props) => {
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
    const name = 'SvgOverlap24'

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
          d='M18 2H2v16H1V1h17v1zm4 4h1v17H6v-1h16V6zM6 6h12v12H6V6zm1 1v10h10V7H7z'
          id='overlap24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='overlap24_svg__b'>
          <use xlinkHref='#overlap24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#overlap24_svg__a' />
        <g mask='url(#overlap24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgOverlap24.displayName = 'SvgOverlap24'
export default withStyles(styles)(SvgOverlap24)
