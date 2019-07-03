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

const SvgLength16 = (props: Props) => {
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
    const name = 'SvgLength16'

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
          d='M3.207 8.5l3 3-.707.707-3-3-.707-.707L5.5 4.793l.707.707-3 3zM13.5 7.793l.707.707-3.707 3.707-.707-.707 3-3-3-3 .707-.707 3 3zM0 2h1v13H0V2zm15 0h1v13h-1V2z'
          id='length16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='length16_svg__b'>
          <use xlinkHref='#length16_svg__a' />
        </mask>
        <use xlinkHref='#length16_svg__a' />
        <g mask='url(#length16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLength16.displayName = 'SvgLength16'
export default withStyles(styles)(SvgLength16)
