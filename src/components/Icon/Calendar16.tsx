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

const SvgCalendar16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgCalendar16'

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
          d='M3 2V1h1v1h8V1h1v1h3v13H0V2h3zm0 1H1v2h14V3h-2v1h-1V3H4v1H3V3zm12 3H1v8h14V6z'
          id='calendar16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='calendar16_svg__b'>
          <use xlinkHref='#calendar16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#calendar16_svg__a' />
        <g mask='url(#calendar16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCalendar16.displayName = 'SvgCalendar16'
export default withStyles(styles)(SvgCalendar16)
