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

const SvgArrowDropDown16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgArrowDropDown16'

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
          d='M7.357 10.228L3.643 5.772C3.283 5.34 3.446 5 3.995 5h8.01c.54 0 .707.346.352.772l-3.714 4.456c-.36.432-.931.426-1.286 0z'
          id='arrowDropDown16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowDropDown16_svg__b'>
          <use xlinkHref='#arrowDropDown16_svg__a' />
        </mask>
        <use xlinkHref='#arrowDropDown16_svg__a' />
        <g mask='url(#arrowDropDown16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgArrowDropDown16.displayName = 'SvgArrowDropDown16'
export default withStyles(styles)(SvgArrowDropDown16)
