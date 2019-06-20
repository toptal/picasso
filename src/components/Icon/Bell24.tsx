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

const SvgBell24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgBell24'

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
          d='M12 2.014a8.5 8.5 0 0 1 8 8.486V18a1 1 0 0 0 1 1v1H2v-1a1 1 0 0 0 1-1v-7.5a8.5 8.5 0 0 1 8-8.486V0h1v2.014zM19 18v-7.5a7.5 7.5 0 0 0-15 0V18c0 .364-.097.706-.268 1h15.536A1.99 1.99 0 0 1 19 18zM9 21.5V21h1v.5a1.5 1.5 0 0 0 3 0V21h1v.5a2.5 2.5 0 1 1-5 0z'
          id='bell24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='bell24_svg__b'>
          <use xlinkHref='#bell24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#bell24_svg__a' />
        <g mask='url(#bell24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgBell24.displayName = 'SvgBell24'
export default withStyles(styles)(SvgBell24)
