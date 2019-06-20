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

const SvgBankWire16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgBankWire16'

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
          d='M0 13h16v3H0v-3zm1 1v1h14v-1H1zM0 3l8-3 8 3v2H0V3zm1 .66V4h14v-.34L8 1.087 1 3.659zM3 6h1v6H3V6zm3 0h1v6H6V6zm3 0h1v6H9V6zm3 0h1v6h-1V6z'
          id='bankWire16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='bankWire16_svg__b'>
          <use xlinkHref='#bankWire16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#bankWire16_svg__a' />
        <g mask='url(#bankWire16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgBankWire16.displayName = 'SvgBankWire16'
export default withStyles(styles)(SvgBankWire16)
