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

const SvgParticipants16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgParticipants16'

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
          d='M10.875 10.4a2.5 2.5 0 1 1 3.25 0A3.5 3.5 0 0 1 16 13.5v.5h-1v-.5a2.5 2.5 0 0 0-4.268-1.768l-.707-.707c.252-.252.539-.462.85-.625zm-7.922-.963a4 4 0 1 1 4.095 0A5.001 5.001 0 0 1 10 14H9a4 4 0 1 0-8 0H0a5.001 5.001 0 0 1 2.953-4.563zM5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
          id='participants16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='participants16_svg__b'>
          <use xlinkHref='#participants16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#participants16_svg__a' />
        <g mask='url(#participants16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgParticipants16.displayName = 'SvgParticipants16'
export default withStyles(styles)(SvgParticipants16)
