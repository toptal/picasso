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

const SvgPerformance16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgPerformance16'

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
          d='M13 14h2v1H1v-1h2V8h1v6h2V6h1v8h2V4h1v10h2V2h1v12z'
          id='performance16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='performance16_svg__b'>
          <use xlinkHref='#performance16_svg__a' />
        </mask>
        <use xlinkHref='#performance16_svg__a' />
        <g mask='url(#performance16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPerformance16.displayName = 'SvgPerformance16'
export default withStyles(styles)(SvgPerformance16)
