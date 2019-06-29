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

const SvgCloseMinor24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgCloseMinor24'

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
        <path
          d='M12.707 12l5.5 5.5-.707.707-5.5-5.5-5.5 5.5-.707-.707 5.5-5.5-5.5-5.5.707-.707 5.5 5.5 5.5-5.5.707.707-5.5 5.5z'
          id='closeMinor24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='closeMinor24_svg__b'>
          <use xlinkHref='#closeMinor24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#closeMinor24_svg__a' />
        <g mask='url(#closeMinor24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCloseMinor24.displayName = 'SvgCloseMinor24'
export default withStyles(styles)(SvgCloseMinor24)
