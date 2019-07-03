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

const SvgUpdate16 = (props: Props) => {
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
    const name = 'SvgUpdate16'

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
          d='M3.5 12.753V14.5h-1v-4h4v1H3.816A5.435 5.435 0 0 0 8 13.455 5.455 5.455 0 0 0 13.455 8h1.09A6.545 6.545 0 0 1 3.5 12.753zm9-9.506V1.5h1v4h-4v-1h2.684A5.435 5.435 0 0 0 8 2.545 5.455 5.455 0 0 0 2.545 8h-1.09A6.545 6.545 0 0 1 12.5 3.247z'
          id='update16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='update16_svg__b'>
          <use xlinkHref='#update16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#update16_svg__a' />
        <g mask='url(#update16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgUpdate16.displayName = 'SvgUpdate16'
export default withStyles(styles)(SvgUpdate16)
