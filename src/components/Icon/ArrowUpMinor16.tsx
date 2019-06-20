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

const SvgArrowUpMinor16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgArrowUpMinor16'

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
          d='M8.207 5.5l4 4-.707.707-4-4-4 4-.707-.707L7.5 4.793l.707.707z'
          id='arrowUpMinor16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowUpMinor16_svg__b'>
          <use xlinkHref='#arrowUpMinor16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowUpMinor16_svg__a' />
        <g mask='url(#arrowUpMinor16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgArrowUpMinor16.displayName = 'SvgArrowUpMinor16'
export default withStyles(styles)(SvgArrowUpMinor16)
