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

const SvgChevron24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgChevron24'

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
          d='M16.5 10.793l.707.707L7.5 21.207l-.707-.707 9-9-9-9 .707-.707 9 9z'
          id='chevron24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='chevron24_svg__b'>
          <use xlinkHref='#chevron24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#chevron24_svg__a' />
        <g mask='url(#chevron24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgChevron24.displayName = 'SvgChevron24'
export default withStyles(styles)(SvgChevron24)
