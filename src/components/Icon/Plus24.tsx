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

const SvgPlus24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgPlus24'

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
    >
      <defs>
        <path d='M12 11h7v1h-7v7h-1v-7H4v-1h7V4h1v7z' id='plus24_svg__a' />
      </defs>
      <g fillRule='evenodd'>
        <mask id='plus24_svg__b'>
          <use xlinkHref='#plus24_svg__a' />
        </mask>
        <use xlinkHref='#plus24_svg__a' />
        <g mask='url(#plus24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPlus24.displayName = 'SvgPlus24'
export default withStyles(styles)(SvgPlus24)
