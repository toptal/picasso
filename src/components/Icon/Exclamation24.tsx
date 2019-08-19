import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgExclamation24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, base } = props
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
          d='M11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zM11 6h1v8h-1V6zm0 10h1v1h-1v-1z'
          id='exclamation24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='exclamation24_svg__b'>
          <use xlinkHref='#exclamation24_svg__a' />
        </mask>
        <use xlinkHref='#exclamation24_svg__a' />
        <g mask='url(#exclamation24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgExclamation24.displayName = 'SvgExclamation24'
export default withStyles(styles)(SvgExclamation24)
