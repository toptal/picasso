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

const SvgPerformance24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgPerformance24'

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
          d='M20 21h2v1H2v-1h2v-6h1v6h4V11h1v10h4V7h1v14h4V3h1v18z'
          id='performance24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='performance24_svg__b'>
          <use xlinkHref='#performance24_svg__a' />
        </mask>
        <use xlinkHref='#performance24_svg__a' />
        <g mask='url(#performance24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPerformance24.displayName = 'SvgPerformance24'
export default withStyles(styles)(SvgPerformance24)
